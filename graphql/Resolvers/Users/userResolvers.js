const User = require('../../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authContext = require('../../../utilities/authContext');
const {UserInputError} = require('apollo-server');
const {validateRegisterInput,validateLoginInput} = require('./../../../utilities/validations');
module.exports = {
    Mutation:{
        register: async (_,{registerUser:{email,password}}) => {
            const encrypted_password = await bcrypt.hash(password,12);
            const user = await User.findOne({email});
            if(user){
                throw new UserInputError("A user with this email already exists",{
                    errors:{
                        email:"The user with this email has already been taken"
                    }
                })
            }
            const {valid,errors} = validateRegisterInput(email,password);
            if(!valid){
                throw new UserInputError("Errors",{errors});
            }
            const newUser = new User({
                email,
                name:"Please assign a name by clicking on the edit tab",
                phone: "Please assign a new phone number by clicking on the edit tab",
                bio:"Please update bio by clicking the edit tab",
                password: encrypted_password,
                createdAt: new Date().toISOString()
            });

            const result = await newUser.save();
            const token = jwt.sign({
                id: result.id,
                email: result.email,
                phone: result.phone
            },process.env.TOKEN_SECRET,{
                expiresIn: '1h'  
            });
            return {
                ...result._doc,
                id:result._id,
                token
            };

        
        
        },
        login: async (_,{loginUser:{email,password}}) => {
            var user = await User.findOne({email});
            user.recentlySignedIn = new Date().toISOString();
            await user.save();
            const {valid,errors} = validateLoginInput(email,password);
            if(!valid){
                throw new UserInputError("Errors",{errors}); 
            }
            if(!user){
                throw new UserInputError("The credentials could not be validated");
            }
            const password_match = await bcrypt.compare(password,user.password);
            if(!password_match){
                throw new UserInputError("The credentials could not be validated");
            }
            const token = jwt.sign({
                id: user.id,
                email: user.email,
                phone: user.phone  
            },process.env.TOKEN_SECRET,{
                expiresIn: '1h'
            });
            return {
                ...user._doc,
                id:user._id,
                token
            };  
        },
        userupdate: async (_,{updateUserInput:{name,email,bio,phone,password}},context) =>{
            const user = await authContext(context);
            
            const updated_user = await User.findByIdAndUpdate(user._id,{
                name,
                email,
                bio,
                phone,
                password
                
            });
            if(updated_user){
                if(password != null){
                    updated_user.password = await bcrypt.hash(password,12);
                    updated_user.save();
                    return updated_user;
                }
                return updated_user;
            }
            throw new Error("User could not be able to be updated successfully");  
            
        },
        updatepassword: async (_,{updatePassInput:{oldPassword,newPassword,confirmPassword}},context) => {
            const user = await authContext(context);
            const old_password_match = await bcrypt.compare(oldPassword,user._doc.password); 
            if(!old_password_match){
                throw new UserInputError("Old password does not match with what we have.");
            }
            const encrypted_new_password = await bcrypt.hash(newPassword,12);
            const password_match = await bcrypt.compare(confirmPassword,encrypted_new_password);
            if(!password_match){
                throw new UserInputError("Password does not match!");
            }
            user.password = encrypted_new_password;
            await user.save();
            return {
                result:"The user has been updated successfully"
            };
        }
    },
    Query:{
        getUser: async (_,args,context) => {
            const user = await authContext(context);  
            if(!user){
                throw new UserInputError("the user does not exist");
            }
            return {
                ...user._doc,  
                id:user._id 
            }
        }
    }  
}