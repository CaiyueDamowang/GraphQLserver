import { AuthenticationError } from "apollo-server"
import jwt from 'jsonwebtoken'

const key = process.env.SECRET_KEY || 'network'
export const checkAuth = (context) => {
    const token = context.req.headers.authorization
    if(token) {
        try{
            const user = jwt.verify(token, key)
            return user
        } catch(err) {
            throw new AuthenticationError( err)
        }
        throw new Error('Authentication token must be `Bearer [token]`')
    }
    throw new Error("Authentication header must be provider")
}
