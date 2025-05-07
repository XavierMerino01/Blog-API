import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Posts({user}) {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch('http://localhost:3000/post', {
            method: 'GET',
            headers: {
            'Authorization': `bearer ${token}`
            }
        })
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch posts');
                return res.json();
            })
            .then((data) => {
                setPosts(data);
                console.error(data);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
            });
    }, [token]);

    const handlePublish = (id, newState) => { fetch(`http://localhost:3000/post/${id}/${newState}`, {
        method: 'PUT',
        headers: {
            'Authorization': `bearer ${token}`
        }
    }).then((res) => {
        if (!res.ok) throw new Error('Failed to publish post');
        return res.json();
    }).then(() => {window.location.href = '/posts';})
    .catch((error) => {
        console.error('Error publishing post:', error);
    });
    }


    const handleDelete = (id) => { fetch(`http://localhost:3000/post/${id}/delete`, {
        method: 'DELETE',
        headers: {
            'Authorization': `bearer ${token}`
        }
    }).then((res) => {
        if (!res.ok) throw new Error('Failed to delete post');
        return res.json();
    }).then(() => {window.location.href = '/posts';})
    .catch((error) => {
        console.error('Error deleting post:', error);
    });
    }


  return (
    <>
    <div className="posts">
                {posts.map((post) => (
                    <div key={post.id} className="card">
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <ul>
                            {post.comments.map((comment) => (
                                <li key={comment.id}>
                                    {comment.content}
                                </li>
                            ))}
                        </ul>
                        {user?.isAdmin && (
                            <div>
                                {!post.published ? (
                                    <button onClick={() => handlePublish(post.id, "publish")}>Publish</button>
                                ) : (
                                    <button onClick={() => handlePublish(post.id, "unpublish")}>Unpublish</button>
                                )}
                                <button onClick={() => handleDelete(post.id)}>Delete</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
    <div>
        <>
        <button onClick={() => navigate('/')}>Home</button>
        </>
    </div>
    </>
  );
}

export default Posts;