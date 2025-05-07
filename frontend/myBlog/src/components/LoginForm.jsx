function LoginForm() {
  
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
    
        fetch('http://localhost:3000/user/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                window.location.href = '/'; // Redirect to home page after login
            } else {
                alert('Login failed!');
            }
            })
            .catch(err => console.error(err));
    }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;