import React, { useEffect, useState } from 'react';
import { IUser } from './ICredentials';
import { useNavigate } from 'react-router-dom';



const Credentials: React.FC = () => {
    const [userData, setUserData] = useState<IUser | null>(null);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate()

    const handleLogOut = async () => {

        try {
            const response = await fetch('/api/v1/users/logout',{
                method: 'POST',
                credentials: 'include'
            })

            if(response.ok){
                navigate('/login');
            }else{
                return (console.log('Logout failed'))
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('/api/v1/users/credentials', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                } else {
                    const data = await response.json();
                    setError(data.error || 'Failed to fetch user data');
                }
            } catch (err) {
                setError(`Something went wrong \n ${err}`);
            }
        };

        fetchUserData();
    }, []);

    if (error) {
        return <div>
            <p style={{ color: 'red' }}>{error}</p>
            <button onClick={() => {navigate('/login')}}>Login</button>
        </div>;
    }

    if (!userData) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>User Credentials</h2>
            <p><strong>First Name:</strong> {userData.first_name}</p>
            <p><strong>Last Name:</strong> {userData.last_name}</p>
            <p><strong>Username:</strong> {userData.username}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Promotion:</strong> {userData.promotion}</p>

            <button onClick={() => handleLogOut()}>Logout</button>
        </div>
    );
};

export default Credentials;