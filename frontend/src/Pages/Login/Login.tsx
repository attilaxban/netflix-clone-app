import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'


const Login: React.FC = () => {
    const [username,setUsername] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [error,setError] = useState<string>('');
    const navigate = useNavigate();


    const handleLogin = async (e:React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('/api/v1/users/login',{
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                credentials: 'include',
                body: JSON.stringify({username,password}),
            });

            if(response.ok){
                navigate('/credentials')
            }else{
                const data = await response.json();
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            setError("Something went wrong")
            console.error(err)
        }
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }


    return (
        <div id="login-box">
            
            <form id="login-form" onSubmit={handleLogin}>
            <label htmlFor="login">Login</label>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;