import gql  from 'graphql-tag'

// Query -> GET
// Mutation -> POST

export default gql`
    type Post {
        id: ID!
        body: String!
        createAt: String!
        username: String!
    }

    type User {
        id: ID!
        email: String!
        username: String!
        createAt: String!
        token: String!
    }

    input RegisterInput {
        username: String!
        email: String!
        password: String!
        confirmPassword: String!
    }

    type Query {
        getPosts: [Post]
    }

    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
    }
`