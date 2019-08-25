import passport from 'passport';
import {encryptPassword,matchPassword} from './helpers';
import User from '../models/User.model';
import { Strategy } from 'passport-local';

passport.use('local.signin',new Strategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},async (req,email,password,done)=>{
    const user = await User.findOne({email})
    if(!user) return done(null,false,{
        message:`El email ${email} no existe`
    })
    const validPassword = await matchPassword(password,user.password)
    if(!validPassword) return done(null,false,{
        message:`La contraseña ${password} es incorrecta`
    })
    return done(null,user,{
        message:'Logeado correctamente'
    })
}))


passport.use('local.signup',new Strategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},async(req,email,password,done)=>{
    const {nickname,name} = req.body
    const userEmail = await User.findOne({email})
    if(userEmail) return done(null,false,{
        message:`El email ${userEmail.email} ya existe`
    })
    const userNickname = await User.findOne({nickname})
    if(userNickname) return done(null,false,{
        message:`El nickname ${nickname} ya existe`
    })
    
    const newUser = new User({
        email,
        nickname,
        name,
        password:await encryptPassword(password)
    })
    await newUser.save()
    return done(null,newUser,{
        message:'Registrado correctamente'
    })
    
}))

passport.serializeUser((user:any,done)=>{
    done(null,user._id)
})
passport.deserializeUser(async(id,done)=>{ 
    const user = await User.findById(id)
    done(null,user)
})