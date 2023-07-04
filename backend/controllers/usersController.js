const asyncHandler = require('express-async-handler');
const User = require('../models/usermodel');
const generateToken = require('../utils/generateToken');

const getUsers = asyncHandler(async (req, res) =>{
    const users = await User.find();
    res.json(users);
})

const getUserByEmail = asyncHandler(async (req, res) =>{
    const {email} = req.params;

    const userExists = await User.findOne({email});

    if (userExists){
        res.json(userExists);
    }else {
        res.status(400).json({message: 'User not found'})
    }
});

const updateUser = asyncHandler(async (req, res) =>{
    const {id} = req.params;
    const userExists = await User.findOne({_id: id});

    const {firstname, lastname, email, role, password} = req.body;
    

    if (userExists){
        userExists.firstname = firstname;
        userExists.lastname = lastname;
        userExists.email = email;
        userExists.role = role;
        userExists.password = password

        const updatedUser = await userExists.save();
        res.json(updatedUser);

    } else {
        res.status(400).json({message: 'User not found'})
    }
})

const addUser = asyncHandler(async (req, res) => {
    //take the info being passed on
    const {_id, firstname, lastname, email, role, password} = req.body;
    //check if the user already exists based on the email
    const userExists = await User.findOne({email});

    const idExists = await User.findOne({_id});

    //If ususer already exists, throw error
    if (userExists){
        res.status(400);
        throw new Error('User already exists');
    } else if (idExists){
        res.status(400);
        throw new Error('Id already exists');
    }


    //If user doesn't exist, the user will be created in the database
    const user = await User.create({
        _id,
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
            token:generateToken(user._id),
        });
    } else {
        res.status(400)
        throw new Error('Unable to create user')
    }
    });

const authUser =  asyncHandler(async (req, res, ) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({email});

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid Email or Password')
    }
});

const deleteUser = asyncHandler(async (req,res) =>{
    const {id} = req.params;
    const userExists = await User.findOne({_id: id});

    if (userExists){
        await userExists.deleteOne({_id: id});
        res.json({message: "User Removed"})
    } else {
        res.status(400);
        throw new Error("User not found");
    }
});

module.exports={addUser, authUser, getUsers, getUserByEmail, updateUser, deleteUser};