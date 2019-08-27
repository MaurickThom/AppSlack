import { Router } from 'express';
import { isNotLoggedIn, isLoggedIn } from '../lib/auth';
import { login, register } from '../controllers/user.controller';
const router = Router()

router.get('/',(req:any,res)=>{
    res.render('index.html')
})


router.post('/login',isNotLoggedIn,login)
router.post('/register',isNotLoggedIn,register)
router.get('/logout',isLoggedIn,(req,res)=>{
    req.logOut()
    res.redirect('/')
})
router.get('/info',isLoggedIn,(req,res)=>{
    res.json(req.user)
})
export default router