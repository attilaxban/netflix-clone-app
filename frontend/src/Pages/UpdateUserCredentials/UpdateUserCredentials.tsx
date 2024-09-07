import React, { useState } from 'react'

export const UpdateUserCredentials = () => {
    const[password,setPassword] = useState('');
    const [email,setEmail] = useState('');

    const updateUserCredentials = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        try {
            const response = await fetch('/api/v1/users/credentials/update',{
                method:'PATCH',
                credentials: 'include',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({password:password,email:email})
            })

            if(response.ok){
                console.log('success')
            }
        } catch (error) {
            console.error(error);
            
        }
    }
  return (
    <div>
        <form
        onSubmit={updateUserCredentials}>
            <div>
                <label htmlFor="">
                    Password
                    <input type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                </label>
            </div>
            <div>
                <label htmlFor="">
                    Email
                    <input type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
                </label>
            </div>
            <button type="submit">Change</button>
        </form>
    </div>
  )
}
