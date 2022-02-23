const userResolvers = require('./Users/userResolvers');

module.exports = {
    Query:{
        ...userResolvers.Query
    },
    Mutation:{
        ...userResolvers.Mutation 
    }
}