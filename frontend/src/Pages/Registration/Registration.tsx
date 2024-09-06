import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "./IRegistration";
import './Registration.css'


const Registration: React.FC = () => {
    const [user, setUser] = useState<IUser>({
        first_name: '',
        last_name: '',
        username: '',
        password: '',
        email: '',
        promotion: false,
    });
    const [confirmPassword,setConfirmPassword] = useState('')
    const [error,setError] = useState('')
    const navigate = useNavigate();


    const handleRegistration = async (e:React.FormEvent) => {
        e.preventDefault();
        setError('');

        if(user.password !== confirmPassword){
            setError(`Passwords don't match`)
            return;
        }

        try {
            const response = await fetch('/api/v1/users/register',{
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                credentials: 'include',
                body: JSON.stringify(user),
            });

            if(response.ok){
                navigate('/login')
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
        <div>
            <form onSubmit={handleRegistration}>
            <div>
            <label htmlFor="firstname">First name:</label>
            <input
                type="text"
                id="firstname"
                value={user?.first_name}
                onChange={(e) => 
                    setUser((prevUser) => ({
                        ...prevUser,
                        first_name: e.target.value,
                    }))
                }
                required
            />
        </div>
        <div>
            <label htmlFor="lastname">Last name:</label>
            <input
                type="text"
                id="lastname"
                value={user?.last_name}
                onChange={(e) => 
                    setUser((prevUser) => ({
                        ...prevUser,
                        last_name: e.target.value,
                    }))
                }
                required
            />
        </div>
        <div>
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                id="username"
                value={user?.username}
                onChange={(e) => 
                    setUser((prevUser) => ({
                        ...prevUser,
                        username: e.target.value,
                    }))
                }
                required
            />
        </div>
        <div>
            <label htmlFor="email">Email:</label>
            <input
                type="text"
                id="email"
                value={user?.email}
                onChange={(e) => 
                    setUser((prevUser) => ({
                        ...prevUser,
                        email: e.target.value,
                    }))
                }
                required
            />
        </div>
        <div>
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                value={user?.password}
                onChange={(e) => 
                    setUser((prevUser) => ({
                        ...prevUser,
                        password: e.target.value,
                    }))
                }
                required
            />
        </div>
        <div>
        <label htmlFor="confirm_password">Confirm password:</label>
            <input
                type="password"
                id="confirm_password"
                value={confirmPassword}
                onChange={(e) => {setConfirmPassword(e.target.value)}}
                required
            />
        </div>
        <div>
        <label htmlFor="promotion">Promotion</label>
            <input type="checkbox"
                id="promotion"
                checked={user?.promotion}
                onChange={(e) => 
                    setUser((prevUser) => ({
                        ...prevUser,
                        promotion: e.target.checked,
                    }))
                }
             />
        </div>
        
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Registration;