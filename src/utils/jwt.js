import {sign,verify} from 'hono/jwt';
const JWT_SECRET='supersecretkey';

export const generateToken= (payload)=>{
    return sign(payload, JWT_SECRET) 
}

export const verifyToken= (token)=>{
    try {
        return verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}