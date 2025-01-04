const express = require('express');
const {verifyToken} = require("./verifyToken/jwtToken");
const {db} = require('./config/config')
const {sendEmail} = require('./email/emailSender')
const {routes} = require('./service/routes')
const {register , login, forgotPassword, resetPassword, emailVerification, deleted, allData, proteceted, updated} = require('./middleware/auth')
const dotenv = require('dotenv')


const app = express()
dotenv.config()






const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})

app.use(routes)

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


