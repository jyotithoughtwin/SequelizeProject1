import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';
export const hasPassword = async (Password: string) => {
    const password = await bcrypt.hash(Password, 10)
    return password
}

export const comparePassword = async (Password: string, hasPassword: string) => {
    const passwordComapre = await bcrypt.compare(Password, hasPassword)
    return passwordComapre
}

export const CreateJwtToken = async (Data: string | Object | Buffer) => {
    const jwtSecretKey: jwt.Secret = "MY_SECRET"
    const TOKEN = await jwt.sign(Data, jwtSecretKey)
    return TOKEN
}

export const DecodejwtToken = async (req: any, res: Response, next: NextFunction) =>{
    const header = req.headers
    if(!req.headers){
        return res.json({message: "Header is required"})
    }
    if (!header.authorization){
        return res.json({message: "Token is required"})
    }
    const jwtSecretKey: jwt.Secret = "MY_SECRET"

    const decode = await jwt.verify(header.authorization, jwtSecretKey)
    req.query = decode
    next()
}