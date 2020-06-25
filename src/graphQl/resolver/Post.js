import { Post } from '../../models/Post'

export async function getPosts() {
    try {
        const posts = await Post.find()
        return posts
    }catch(e) {
        throw new Error(err)
    }
};
