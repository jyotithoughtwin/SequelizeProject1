import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

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
