import bcrypt from 'bcryptjs'
import { User } from "../../models/index";
import { validateLoginInput } from "../../util/validators";
import { UserInputError } from "apollo-server";
import { generateToken } from '../../util/generateToken';

export async function login(_, { username, password }) {
    const { valid, errorInfo } = validateLoginInput(username, password)
    if(!valid) {
        throw new UserInputError('Errors validate', { errorInfo })
    }
    
    // db has the user
    const theUser = await User.findOne({
        username
    })
    if(!theUser) { 
        errorInfo.general = 'User not found'
        throw new UserInputError('User not found', { errorInfo })
     }
    
     // match user username and password
    const encryptedPassword = await dcrypt.hash(password)
    const match = await bcrypt.compare(password, theUser.password)
    if(!match) {
        errorInfo.general = 'Wrong credentials'
        throw new UserInputError('Password or Username is wrong', { errorInfo })
    }

    const token = generateToken(theUser)

    return {
        id: theUser._id,
        token,
        username: theUser.username
    }
}
