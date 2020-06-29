import { getPosts, getPost, createPost, deletePost } from './resolver/Post';
import { register } from './resolver/Register';
import { login } from "./resolver/Login";

export default {
    Query: {
       getPosts,
       getPost
    },
    Mutation: {
        register,
        login,

        createPost,
        deletePost
    }
}
