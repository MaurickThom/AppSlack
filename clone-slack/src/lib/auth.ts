import {Request,Response,NextFunction} from 'express'

export const isLoggedIn = (req:Request,res:Response,next:NextFunction)=>(
    req.isAuthenticated()?next():res.status(401).json({
        ok:false,
        message:'Necesitas logearte para acceder a este recurso'
    })
)

export const isNotLoggedIn = (req:Request,res:Response,next:NextFunction)=>(
    !req.isAuthenticated()?next():res.status(401).json({
        ok:false,
        message:'Necesita cerrar session para poder acceder a este recurso'
    })
)
