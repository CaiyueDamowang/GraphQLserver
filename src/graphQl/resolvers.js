import { getPosts } from './resolver/Post'
import { register } from './resolver/Register'
import { login } from "./resolver/Login";
export default {
    Query: {
       getPosts
    },
    Mutation: {
        register,
        login
    }
}
