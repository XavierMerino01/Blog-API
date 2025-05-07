const prisma = require('../config/prisma');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');


const userLogin = asyncHandler(async (req, res) => {
    
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: { email: email }
    });

    if (user && user.hashedPassword === password) {
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
    
            // 3. Send the token to the client
            res.send({ token: token });
        });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    };
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
    getUserInfo,
};