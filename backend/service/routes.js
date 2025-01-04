const express = require('express');
const { allData, register, login, forgotPassword, resetPassword, emailVerification, deleted, proteceted, updated } = require('../middleware/auth');
const { verifyToken } = require('../verifyToken/jwtToken');


const routes = express.Router();


routes.get('/data',allData)
routes.post('/register',register)
routes.post('/login',login)
routes.post('/forgot',forgotPassword)
routes.post('/reset/:token',resetPassword)
routes.post('/email-verification/:token' , emailVerification)
routes.delete('/delete/:id',deleted)
routes.get('/protected',verifyToken , proteceted)
routes.put('/update/:id',updated)


module.exports = {routes}