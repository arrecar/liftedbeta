const asyncHandler = require('express-async-handler');
const User = require('../models/usermodel');

const addUser = asyncHandler(async (req, res) => {
    //take the info being passed on
    const {firstname, lastname, email, role, password} = req.body;
    //check if the user already exists based on the email
    const userExists = await User.findOne({email});

    //If ususer already exists, throw error
    if (userExists){
        res.status(400);
        throw new Error('User already exists');
    }


    //If user doesn't exist, the user will be created in the database
    const user = await User.create({
        firstname,
        lastname,
        email,
        role,
        password,
    });

    //If user is created we will send a response
    if (user) {
        res.status(201).json({
            _id:user._id,
            firstname:user.firstname,
            lastname:user.lastname,
            email:user.email,
            role:user.role,
        });
    } else {
        res.status(400)
        throw new Error('Unable to create user')
    }
    });

module.exports={addUser};

