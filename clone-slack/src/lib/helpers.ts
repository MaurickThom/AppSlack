import bcryptjs from 'bcryptjs'

export const encryptPassword = async(password:string):Promise<string>=>{
        const salt = await bcryptjs.genSalt(10)
        const hash = await bcryptjs.hash(password,salt)
        return hash
}
export const matchPassword = async(password:string,savePassword:string):Promise<boolean>=>{
    try{
        const result = await bcryptjs.compare(password,savePassword)
        return result
    }catch(err){
        console.log((err as Error).message)
        return false
    }
}