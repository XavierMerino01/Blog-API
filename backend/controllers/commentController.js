const prisma = require('../config/prisma');
const asyncHandler = require('express-async-handler');


const createComment = asyncHandler(async (req, res) => {
    const { postId, content } = req.body;
    const userId = req.user.id; 

    const newComment = await prisma.comment.create({
        data: {
            content: content,
            post: {
                connect: { id: parseInt(postId) } // Connect to the post by ID
            },
            author: {
                connect: { id: userId } // Connect to the user by ID
            }
        }
    });
    res.send(newComment);
});


module.exports = {
    createComment
};