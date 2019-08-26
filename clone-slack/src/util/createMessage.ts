export const createMessage = (name:string,message:string):object=>({
    name,
    message,
    date:new Date().getTime()
})