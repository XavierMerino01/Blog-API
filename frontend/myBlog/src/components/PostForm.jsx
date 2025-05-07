function PostForm(){

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        const token = localStorage.getItem('token');
    
        fetch('http://localhost:3000/post', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json()
            .then(()=> {
                window.location.href = '/posts'; // Redirect to posts page after creating a post
            })
        )
            .catch(err => console.error(err));
    }

  return (
    <div>
      <h2>New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" required />
        </div>
        <div>
          <input type="text" id="content" name="content" required />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default PostForm;