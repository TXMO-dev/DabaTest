const {AuthenticationError} = require('apollo-server');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (context) => {
    const authHeader = context.req.headers.authorization;
    if(authHeader){
        const token = authHeader.split('Bearer ')[1];
        if(token){
            try{
            const user = jwt.verify(token,process.env.TOKEN_SECRET);
            const real_user = await User.findById(user.id);
            return real_user;
            } catch(err){
                throw new AuthenticationError('Invalid/Expired Token');
            }
        }
        throw new Error('Authentication Token must be a Bearer Token');
    }
    throw new Error('Authentication Header must be provided');
    
}