import { getPosts } from './resolver/Post'
import { register } from './resolver/Register'

export default {
    Query: {
       getPosts
    },
    Mutation: {
        register
    }
}
