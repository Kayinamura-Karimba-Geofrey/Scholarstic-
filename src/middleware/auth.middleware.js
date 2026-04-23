import {verifyToken} from '../utils/jwt.js'
export const authMiddleware= async (c, next)=>{
    const header= c.req.header('Authorization')

    if(!header || !header.startsWith('Bearer ')){
        return c.text('Unauthorized', 401)
    }
    const token= header.split(' ')[1]
    
    try {
        const payload= await verifyToken(token)
        c.set('user', payload)
        await next()
    } catch (error) {
        return c.text('Unauthorized', 401)
    }
}