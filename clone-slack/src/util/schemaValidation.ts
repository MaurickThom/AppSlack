import Joi from '@hapi/joi'

const schema = {
    name: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password:Joi.string().min(3).required()
}
export const registerValidation = (data:object) =>(
    Joi.validate(data,schema)
)

export const loginValidation = (data:object) =>{
    const { email,password} = schema
    return Joi.validate(data,{email,password})
}