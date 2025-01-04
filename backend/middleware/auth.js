import {User} from "../models/user.js";
import bcrypt from "bcrypt";
import {sendEmail} from "../email/emailSender.js"
import jwt from "jsonwebtoken";
import crypto from "crypto"


const secret = process.env.JWT_SECRET_KEY

const allData = async (req, res) => {
    try {
        const Users = await User.find()
        res.status(200).send({ status: 200, message: "success", data: Users })
    } catch (error) {
        res.status(400).send({ status: 400, message: "something went wrong" })
    }
}

const register = async (req, res) => {
    try {
        const data = req.body;
        const {name , email , password} = data
        const otpId = Date.now().toString();
        const otp = otpId.slice(3, 9)
        const otpExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

        if (otp < 6) {
            return otp + 1
        }
        data.emailOtp = otp
        data.emailOtpExpiresAt = otpExpiresAt;

        // check unique user name
        const existingUserName = await User.findOne({name});

        if (existingUserName) {
            return res.status(404).send({ status: 404, message: "User name already exists" });
        }

        // check unique email
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(404).send({ status: 404, message: "Email already exists" });
        }

        // hash password
        const encryptPSW = await bcrypt.hash(password, 10);
        data.password = encryptPSW;


        const token = crypto.randomBytes(20).toString("hex");


        data.verificationToken = token

        sendEmail(email, 'Email Verification', `<p style = 'margin: 10px auto'>Hi, <br> your email verification code is:</p>
            <h1 style = 'margin: 10px auto'>${otp}</h1>
            <p style ='margin: 10px auto'>Click the link below to verify your email.<a href=http://localhost:5173/email-verification/${token}>verify email</a></p>
            ` )

        // create new user
        const response = await User.create(data)
        res.status(201).send({ status: 201, message: "User registered successfully", data: response })
    } catch (error) {
        res.status(400).send({ status: 400, message: error.message })
    }
}

const login =  async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        
        if (!existingUser) {
            return res.status(404).send({ status: 404, message: "User not found" })
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);
        
        if (!isMatch) {
            return res.status(401).send({ status: 401, message: "Invalid credentials" })
        };
        
        if (existingUser.emailVerified === false) {
            return res.status(404).send({ status: 404, message: "Email not verified" });
        }
        const token = jwt.sign({ id: existingUser._id }, secret, { expiresIn: '1h' });

        res.status(200).send({ status: 200, message: "Login Successfully", token: token });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).send({ status: 500, message: "Internal Server Error" });
    }
}

const forgotPassword =  async (req, res ) => {
    try {
        const { email } = req.body;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).send({ status: 404, message: "User not found" })
        }

        const token = crypto.randomBytes(20).toString("hex");
        const tokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

        existingUser.resetPasswordToken = token
        existingUser.resetPasswordTokenExpiresAt = tokenExpiresAt;

        await existingUser.save();

        sendEmail(email, "reset password" , `http://localhost:5173/reset-password/${token}`)

        res.status(200).send({ status: 200, message: "Email sent successfully", data: existingUser })

    }
    catch (error) {
        res.status(500).send({ status: 500, message: error.message });
    }
}

const resetPassword = async (req, res) => {

    const { password } = req.body;
    const { token } = req.params;
    try {
        const user = await User.findOne({ resetPasswordToken: token })

        if (!user) {
            return res.status(404).send({ status: 404, message: "Invalid token or expired" })
        }

        const hasPassword = await bcrypt.hash(password, 10);
        user.password = hasPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiresAt = undefined;
        await user.save();
        res.status(200).send({ message: "Password updated successfully" })
    }
    catch (error) {
        res.status(400).send({ message: error.message })
    }

}

const emailVerification = async (req, res) => {

    const data = req.body;
    const { token } = req.params;
    try {
        const user = await User.findOne({ verificationToken: token })

        if (!user) {
            return res.status(404).send({ status: 404, message: "Invalid token or expired" })
        }

        if (!user.emailOtp === data) {
            return res.status(404).send({ status: 404, message: "Invalid otp or expired" })
        }
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        user.emailVerified = true;
        user.emailOtp = undefined;
        user.emailOtpExpiresAt = undefined;
        await user.save();
        res.status(200).send({status:200, message: "Email verified successfully" ,data: user.emailVerified})
    }
    catch (error) {
        res.status(400).send({ message: error })
    }

}

const deleted = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).send({ status: 404, message: "User not found" })
        };
        res.status(200).send({ status: 200, message: "User deleted successfully", data: user })
    } catch (error) {
        res.status(400).send({ status: 400, message: error.message })
    }
}

const updated = async (req , res)=>{
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);
    console.log(updatedUser)
    if (!updatedUser) {
        return res.status(404).send({ status: 404, message: "User not found" })
    }
    res.status(200).send({ status: 200, message: "User updated successfully", data: updatedUser })
}

const proteceted = (req, res) => {
    try {
        res.status(200).send({status:200 , message: 'Access granted', data: req.user });
    } catch (error) {
        res.status(400).send();
    }
}
export {register , updated ,proteceted , login , deleted , allData , emailVerification , forgotPassword , resetPassword}