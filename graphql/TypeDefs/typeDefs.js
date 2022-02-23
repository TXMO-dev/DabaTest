const gql = require('graphql-tag');
module.exports = gql`
    type Query{
        getUser: UserInfo
    }
    input RegisterInput{
        name: String!
        email: String!
        password: String!
        confirmPassword: String!
        phone: String!   

    }
    input LoginInput{
        email: String!
        password: String!
    }

    type UserInfo {
        id:ID!
        name:String!
        email:String!
        photo:String
        bio: String
        phone: String!
        createdAt: String!
    }

    input UserInput{
        name:String
        email:String
        bio:String
        phone:String
    }

    type User {
        id:ID!
        email:String!
        token:String!
        recentlySignedIn: String 
    }

    input PasswordInput{
        oldPassword: String!
        newPassword: String!
        confirmPassword: String!
    }

    type UpdateResponse{
        result: String!
    }

    type Mutation{
        register(registerUser:RegisterInput) : User!
        login(loginUser:LoginInput): User!
        userupdate(updateUserInput:UserInput):UserInfo!
        updatepassword(updatePassInput:PasswordInput): UpdateResponse!
    }
`;