const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {

    // request s body fetch kro
    const {username, email, password} = req.body;

    // koi field blank to nhi h

    if (!username || !email || !password){
        return res.status(400).json({
            status: "Failed",
            message: "All the fields are required"
        })
    }

    // Email check kro phle s registered to nhi h

    const existingUser = await User.findOne({email});
    if (existingUser){
        return res.status(400).json({
            status: "Failed",
            message: "Email already registred h"
        })
    }

    // password ko hash kr lenge
    const hashedPassword = await bcrypt.hash(password, 10);

    // User model m save kro
    const newUser = new User({
        username, email, hashedPassword
    })

    await newUser.save();

    // response bhejo

    res.status(201).json({
        status: "Success",
        message: "User register ho gya h"
    })

}

const login = async (req, res) => {

    const {email, password} = req.body;

    const user = await User.findOne({email});

    if (!user) {
        return res.status(404).json({
            message: "Email is not registered"
        })
    }

    // Password check krna
    const is_matched = bcrypt.compare(password, user.password);
    if (!is_matched){
        return res.status(400).json({
            message: "Password is invalid"
        })
    }

    // JWT token generate krna
    const token = jwt.sign(
        {id: user._id, username: user.username},
        "70e481632c9eecf614b7f388737f3adc3b35fbe3300d8195ac65038780ea1ef6",
        {expiresIn: "15m"}
    )

    res.status(200).json({
        message: "Login successful",
        token,
        user: {username: user.username, email: user.email}
    })
}


module.exports = { register, login };