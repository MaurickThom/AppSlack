export const createMessage = (name:String,message:string):object=>({
    name,
    message,
    date:new Date().getTime()
})