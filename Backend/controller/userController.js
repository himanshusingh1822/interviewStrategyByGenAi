const userModel = require('../models/userModel');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');
const parser = require('cookie-parser');

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) {
            return res.status(401).json({
                message: "All fields are required"
            })
        }

        const userAlreadyExits = await userModel.findOne({
            $or: [{ username }, { email }]
        })

        if (userAlreadyExits) {
            // FIX: Added 'return' here to stop code execution
            return res.status(401).json({
                message: "User already exists with this username or email" 
            })
        }

        const hash = await bcryptjs.hash(password, 10);

        const user = await userModel.create({
            username: username,
            email: email,
            password: hash
        })

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )

        res.cookie('token', token)

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        // SAFETY FIX: Added 'return' here just in case of future code additions
        return res.status(500).json({
            message: "Error while registering the user",
            error: error.message
        })
    }
}




const logInUser = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(401).json({
                message: "All fields are required"
            })
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Envalid email or password"
            })
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Envalid email or password"
            })
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )

        res.cookie("token", token)

        return res.status(201).json({
            message: "User loggedIn Successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })


    } catch (error) {
        return res.status(500).json({
            message: "Error while register the user",
            error: error.message
        })
    }
}

const logoutUser = (req, res) => {
    try {
        res.clearCookie('token');
        return res.status(200).json({
            message: "User logged out successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error during logout",
            error: error.message
        });
    }
};

const getMeUser = async (req, res) => {

    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "User profile fetched successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error fetching user details",
            error: error.message
        });
    }
}

module.exports = {
    registerUser,
    logInUser,
    logoutUser, getMeUser
}