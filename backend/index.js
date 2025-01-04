import express from 'express';
import {routes} from './service/routes.js'
import dotenv from 'dotenv'
import { db } from './config/config.js';


const app = express()
dotenv.config()
db(process.env.MONGODB_URI)


const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})

app.use(routes)




