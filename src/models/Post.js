import { model, Schema } from 'mongoose'

const postSchema = new Schema({
    body: String,
    username: String,
    createAt: String,
    comments: [
        {
            body: String,
            username: String,
            createAt: String
        }],
    likes: [
        {
            username: String,
            createAt: String
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
})

export const Post = model("Post", postSchema)
