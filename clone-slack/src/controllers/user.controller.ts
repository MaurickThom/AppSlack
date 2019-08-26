import {loginValidation,registerValidation} from '../util/schemaValidation'
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

export const login = async(req:Request,res:Response,next:NextFunction)=>{

    const {error} = loginValidation(req.body)
    if(error) return res.status(400).json({
        err:{
            message : error.details[0].message
        }
    })
    passport.authenticate('local.signin',{
        successRedirect:'/info',
        failureRedirect:'/'
    },(err, user)=>{
        if(err) return res.json({
            err
        })
        req.login(user, function(err){
            if(err)return res.json({
                err
            })
            return res.redirect('/info')      
        });
    })(req,res,next)
}

export const register = async(req:Request,res:Response,next:NextFunction)=>{
    const {error}  = registerValidation(req.body)
    if(error) return res.status(400).json({
        err:{
            message : error.details[0].message
        }
    })
    passport.authenticate('local.signup',{
        successRedirect:'/info',
        failureRedirect:'/'
    },(err, user)=>{
        if(err) return res.json({
            err
        })
        req.login(user, function(err){
            if(err)return res.json({
                err
            })
            return res.redirect('/info')      
        });
    })(req,res,next)
}