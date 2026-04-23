import  {prisma} from  '../prisma/client.js'
import { hashPassword, comparePassword } from '../utils/password.js';   
import { generateToken } from '../utils/jwt.js';

export const registerUser= async (name, password, role)=>{
    const hashed= await hashPassword(password)
    const user= await prisma.user.create({
        data:{
            name,
            password: hashed,
            role
        },
        select:{
            id: true,
            name: true,
            role: true
        }

    })
    return user;
}

export const loginUser= async (name, password)=>{
    const user= await prisma.user.findUnique({
        where:{
            name
        }
    })
    if(!user){
        throw new Error('User not found')
    }
    const isMatch= await comparePassword(password, user.password)
    if(!isMatch){
        throw new Error('Invalid password')
    }
    const token= await generateToken({id: user.id, role: user.role})
    return {user, token}
}

