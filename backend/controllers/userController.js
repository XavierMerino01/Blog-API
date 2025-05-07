const prisma = require('../config/prisma');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: { email: email }
    });

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

    if (passwordMatch) {
        const payload = {
            sub: user.id,
            name: user.name,
        };

        const secretKey = process.env.JWT_SECRET;
        const options = {
            expiresIn: '1h'
        };

        jwt.sign(payload, secretKey, options, (err, token) => {
            if (err) {
                console.error('JWT signing error:', err);
                return res.status(500).json({ message: 'Failed to create token' });
            }

            res.send({ token: token });
        });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const existingUser = await prisma.user.findUnique({
        where: { email: email }
    });

    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashPword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            name: name,
            email: email,
            hashedPassword: hashPword
        }
    });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
});

const getUserInfo = asyncHandler(async (req, res) => {

    if (req.user) {
        const user = await prisma.user.findUnique({
          where: { id: req.user.id }
        });
        res.send("Your user info: ", { user: user });
      } else {
        res.send("Unauthenticated, you need to login.", { user: null }); // Or handle unauthenticated state
      }
});


module.exports = {
    userLogin,
    registerUser,
    getUserInfo,
};