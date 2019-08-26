import passport from 'passport';
import {encryptPassword,matchPassword} from './helpers';
import User from '../models/User.model';
import { Strategy } from 'passport-local';
import { Request } from 'express';

passport.use('local.signin',new Strategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},async (req:Request,email:string,password:string,done)=>{
    const user = await User.findOne({email})
    if(!user)  return done({
        message: `El usuario ${email} no existe`
    })
    const validPassword = await matchPassword(password,user.password)
    if(!validPassword)return done({
        message:`Contraseña ${password} incorrecta`
    })
    return done(null,user)
}))

passport.use('local.signup',new Strategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},async(req:Request,email:string,password:string,done)=>{
    const {nickname,name} = req.body
    const userEmail = await User.findOne({email})
    if(userEmail) return done({
        message:`El usuario ${email} ya existe`
    })

    const userNickname = await User.findOne({nickname})
    if(userNickname) return done({
        message: `El usuario ${nickname} ya existe`
    })

    const newUser = new User({
        email,
        nickname,
        name,
        password:await encryptPassword(password)
    })
    await newUser.save()
    return done(null,newUser)
    
}))

passport.serializeUser((user:any,done)=>{
    done(null,user._id)
})
passport.deserializeUser(async(id,done)=>{ 
    const user = await User.findById(id)
    done(null,user)
})