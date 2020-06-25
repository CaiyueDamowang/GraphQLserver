import { UserInputError } from 'apollo-server'

// validate
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { validateRegisterInput } from '../../util/validators'
import { generateToken } from '../../util/generateToken'
// model
import { User } from '../../models/User'

const key = process.env.SECRET_KEY || 'network'

export async function register(
    _, {
        registerInput: {
            username,
            email,
            password,
            confimPassword
        }
    },
    context,
    info) {
    // validate user data
    const {
        errorInfo,
        valid
    } = validateRegisterInput(username, email, password, confimPassword)
    if (!valid) {
        throw new UserInputError("Errors", {
            errorInfo
        })
    }

    const existErrInfo = "user is already exist, please change your email"

    // make sure user does not already exist
    const userAlreayExist = await User.findOne({
        email
    })
    if (userAlreayExist) {
        throw new UserInputError(existErrInfo, {
            errors: {
                email: existErrInfo
            }
        })
    }
    password = await bcrypt.hash(password, 12)
    const newUser = new User({
        email,
        username,
        password,
        createAt: new Date().toISOString()
    })
    const res = await newUser.save()
    // hash password and create an auth token
    const token = generateToken(newUser)

    return {
        id: res._id,
        email: res.email,
        token,
    }
}
