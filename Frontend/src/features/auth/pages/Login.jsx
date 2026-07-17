import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
    const { loading, authError, handleLogin } = useAuth(); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        
        const loggedInUser = await handleLogin({ email, password });
        
        if (loggedInUser) {
            console.log('Login successful:', loggedInUser);
            navigate('/'); 
        }
    };

    if (loading) {
        return (
            <main style={{ padding: "2rem", textAlign: "center" }}>
                <h1>Loading.....</h1>
            </main>
        );
    }

    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                
                {authError && (
                    <div style={{ color: 'red', backgroundColor: '#ffe6e6', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                        {authError}
                    </div>
                )}

                <form onSubmit={handleLoginSubmit}>
                    <div className="input-container">
                        <label htmlFor='email'>Email</label>
                        <input
                            type="email"
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='enter email ID'
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor='password'>Password</label>
                        <input
                            type="password"
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='enter password'
                            required
                        />
                    </div>
                    <button type="submit" className='button primary-button'>Login</button>
                </form>
                <p>Don't have an account? <Link to={'/register'}>Register</Link> </p>
            </div>
        </main>
    );
};

export default Login;
