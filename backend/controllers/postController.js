const prisma = require('../config/prisma');
const asyncHandler = require('express-async-handler');

const getAllPosts = asyncHandler(async (req, res) => {
    const { user } = req;

    var posts = undefined;

    if (!user || user.id !== 1) {
        posts = await prisma.post.findMany({
            where: { published: true },
            include: { comments: true },
            orderBy: { createdAt: 'desc' },
        }
        );
    }
    else{
        posts = await prisma.post.findMany({
            include: { comments: true },
            orderBy: { createdAt: 'desc' },
        }
        );
    }
    
    res.send(posts);    
}
);

const createPost = asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    const userId = req.user.id; 

    if (userId !== 1){
        return res.status(403).json({ message: 'You are not authorized to create a post' });
    }

    const newPost = await prisma.post.create({
        data: {
            title: title,
            content: content,
            author: {
            connect: { id: userId } 
            },
        }
    });
    res.send(newPost);
}
);

const deletePost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id; 

    if (userId !== 1){
        return res.status(403).json({ message: 'You are not authorized to delete a post' });
    }

    const deletedPost = await prisma.post.delete({
        where: { id: parseInt(id) }
    });
    res.send(deletedPost);
}
);

const publishPost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const post = await prisma.post.update({
        where: { id: parseInt(id) },
        data: { published: true }
    });
    res.send(post);
}
);

const unpublishPost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const post = await prisma.post.update({
        where: { id: parseInt(id) },
        data: { published: false }
    });
    res.send(post);
});


module.exports = {
    getAllPosts,
    createPost,
    publishPost,
    unpublishPost,
    deletePost,
};