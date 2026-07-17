import React from 'react'
import { Link, useNavigate } from 'react-router';
import Login from '../pages/Login';
import { register } from '../services/auth.api';
import {useAuth} from '../hooks/useAuth'
import { useState } from 'react';

const Register = () => {

    const{loading,authError,handleRegister} = useAuth();

    const[username,setUsername] = useState('');
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');

    const navigate = useNavigate();

    const handleRegisterSubmit = async(e)=>{
        e.preventDefault();
        const registerUser = await handleRegister({username,email,password});
        if (registerUser) {
            console.log('Register successful:', registerUser);
            navigate('/'); 
        }
    }

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
            <h1>Register</h1>
            {authError && (
                    <div style={{ 
                        color: 'red', 
                        backgroundColor: '#ffe6e6', 
                        padding: '0.75rem', 
                        borderRadius: '0.5rem', 
                        marginBottom: '1rem',
                        border: '1px solid #ffcccc',
                        fontSize: '0.95rem'
                    }}>
                        {authError}
                    </div>
                )}

            <form onSubmit={handleRegisterSubmit}>
                <div className="input-container">
                    <label htmlFor='username'>username</label>
                    <input
                    name='username'
                    onChange={(e)=>setUsername(e.target.value)}
                    placeholder='enter username'
                    />
                </div>
                <div className="input-container">
                    <label htmlFor='email'>Email</label>
                    <input
                    name='email'
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder='enter email ID'
                    />
                </div>
                <div className="input-container">
                    <label htmlFor='password'>Password</label>
                    <input
                    name='password'
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder='enter password'
                    />
                </div>
                <button className='button primary-button'>Register</button>
            </form>
            <p>Already have an account ? <Link to={'/login'}>Login</Link> </p>
        </div>
    </main>
  )
}

export default Register
