const {ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');
const processEnv = require('dotenv');
const typeDefs = require('./graphql/TypeDefs/typeDefs');
const resolvers = require('./graphql/Resolvers/resolvers');  
processEnv.config({path:'./process.env'});


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req}) 
});

mongoose.connect(`${process.env.DATABASE_URL}`,{useNewUrlParser: true})
.then(() => {
    console.log('Database Connected successfully');
    return server.listen({port: process.env.PORT || 5000}); 
}).then((res) => console.log(`Server running at ${res.url}`));  