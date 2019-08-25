import {Schema,model,Document} from 'mongoose'

interface User extends Document{
    email:string,
    name:string,
    password:string,
    nickname:string
}

const UserSchema:Schema = new Schema({
    nickname:{
        type:String,
        required:[true,'El nickname es necesario'],
        unique:true
    },
    name:{
        type:String,
        required:[true,'El nombre es necesario']
    },
    email:{
        type:String,
        required:[true,'El email es necesario'],
        unique: true
    },
    password:{
        type:String,
        required:[true,'El password es necesario']
    }
},{
    timestamps:true 
})


export default model<User>('User', UserSchema);