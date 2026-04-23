import { registerUser,loginUser } from "../services/auth.service.js";

export const register= async (c)=>{
    try {
        const body = await c.req.json()
        const {name, password, role}= body

        if(!name || !password ){
            return c.json({message: 'Name and password are required'},  400)
        }
        const user= await registerUser(name, password, role)
        return c.json(user, 201)
    } catch (error) {
        return c.text(error.message, 500)
    }
}

export const login= async (c)=>{
    try {
        const body = await c.req.json()
        const {name, password}= body

        if(!name || !password ){
            return c.json({message: 'Name and password are required'},  400)
        }
        const result= await loginUser(name, password)
        return c.json(result, 200)
    } catch (error) {
        return c.text(error.message, 500)
    }   
}