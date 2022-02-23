const {ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');
const processEnv = require('dotenv');
const typeDefs = require('./graphql/TypeDefs/typeDefs');
const resolvers = require('./graphql/Resolvers/resolvers'); 
const config = require("./config"); 
processEnv.config();


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req}) 
});

mongoose.connect(config.DATABASE_URL,{useNewUrlParser: true})
.then(() => {
    console.log('Database Connected successfully');
    return server.listen({port: config.PORT}); 
}).then((res) => console.log(`Server running at ${res.url}`));  