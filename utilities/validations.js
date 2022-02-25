module.exports.validateRegisterInput = (
    email,
    password
) => {
    const errors = {};
    if(email.trim() === ""){
        errors.email = "Email must not be empty";
    } else {
        const regEx = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        if(!email.match(regEx)){
            errors.email = "This is not a valid email";
        }
    }
    if(password === ""){
        errors.password = "Password must not be empty";
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validateLoginInput = (email,password) => {
    const errors = {};
    if(email.trim() === ""){
        errors.email = "Email must not be empty";
    } else {
        const regEx = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        if(!email.match(regEx)){
            errors.email = "This is not a valid email";
        }
    }

    if(password === ""){
        errors.password = "Password must not be empty";
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}