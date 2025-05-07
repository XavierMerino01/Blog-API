import { useNavigate } from 'react-router-dom';

function Home({ isLoggedIn, user }) {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div>
      <h1>My Blog</h1>
      {isLoggedIn ? (
        <>
          <p>Welcome, {user?.name || 'User'}! You are logged in.</p>
          <button onClick={() => navigate('/posts')}>See Posts</button>
          <button onClick={handleLogOut}>Log Out</button>
          {user.id === 1 ? (
            <button onClick={() => navigate('/post-form')}>Create Post</button>
          ) : (<p></p>)}
        </>
      ) : (
        <>
          <p>You are not logged in.</p>
          <button onClick={() => navigate('/login')}>Log In</button>
        </>
      )}
    </div>
  );
}

export default Home;