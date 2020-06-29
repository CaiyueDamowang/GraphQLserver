import { Post } from '../../models/Post'
import { checkAuth } from '../../util/check-auth'
import { AuthenticationError } from 'apollo-server'

export async function getPosts() {
    try {
        const posts = await Post.find()
        return posts
    }catch(e) { throw new Error(err) }
};

export async function getPost(_, { postId }) {
    try{
        const post = await Post.findById(postId)
        if(!post) { throw new Error('Post not found') }
        return post
    } catch(err) { throw new Error(err); }
}

export async function createPost(_, { body }, context) {
    const user = checkAuth(context)
    if(!user) throw new Error('has not login')

    // if has login
    const newPost = new Post({
        body,
        username: user.username,
        createAt: new Date().toISOString(),
    })
    await newPost.save()
    return newPost
}

export async function deletePost(_, { postId }, context) {
    const user = checkAuth(context)
    if(!user) throw new Error('has not login')
    const post = Post.findOne({
        id: postId
    })
    try{
        if(user.name === post.username) {
            await post.delete()
            return "Post deleted successfully"
        } else {
            throw new AuthenticationError("Action not allowed")
        }
    } catch(err) {
        throw new Error(err)
    }
}