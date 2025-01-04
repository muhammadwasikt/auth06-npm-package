import mongoose from 'mongoose';

const db = (MONGODB_URI)=>{
    mongoose.connect(MONGODB_URI)
.then((response)=>{
    console.log('db connected successfully')
})
.catch((error)=>{
    console.error('error connecting to db', error)
})
}

export {db};