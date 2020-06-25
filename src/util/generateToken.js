
import jwt from "jsonwebtoken";

const key = process.env.SECRET_KEY || 'network'

export const generateToken = user => jwt.sign({
    id: user.id,
    email: user.email,
    username: user.username
}, key, { expiresIn: '1h' })
