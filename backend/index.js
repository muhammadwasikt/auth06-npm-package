const {verifyToken} = require("./verifyToken/jwtToken");
const {db} = require('./config/config')
const {sendEmail} = require('./email/emailSender')
const {routes} = require('./service/routes')
const {register , login, forgotPassword, resetPassword, emailVerification, deleted, allData, proteceted, updated} = require('./middleware/auth')
const dotenv = require('dotenv')



dotenv.config()



module.exports = {
    verifyToken,
    db,
    sendEmail,
    register,
    login,
    forgotPassword,
    resetPassword,
    emailVerification,
    deleted,
    allData,
    proteceted,
    updated,
    routes,
    
}


