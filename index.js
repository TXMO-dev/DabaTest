const {ApolloServer} = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');
const processEnv = require('dotenv');
processEnv.config();
const typeDefs = gql`
    type Query{
        sayHi: String!
    }
`;
const resolvers = {
    Query:{
        sayHi: _ => "Say hello form timothy"
    }
}
const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(`${process.env.DATABASE_URL}`,{useNewUrlParser: true})
.then(() => {
    console.log('Database Connected successfully');
    return server.listen({port: process.env.PORT}); 
}).then((res) => console.log(`Server running at ${res.url}`));  