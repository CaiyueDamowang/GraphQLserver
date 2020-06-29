import  { ApolloServer }  from 'apollo-server'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

// models
import typeDefs from './graphQl/typeDefs'
import resolvers from './graphQl/resolvers'
import { checkAuth } from './util/check-auth'

const config = dotenv.config()

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => {
        return { req }
    }
})

mongoose
    .connect(process.env.mongodb,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{ console.log('mongodb connected successfully!') })

server
    .listen({ port: 5000 })
    .then(res => { console.log(`Server running at ${res.url}`) })
