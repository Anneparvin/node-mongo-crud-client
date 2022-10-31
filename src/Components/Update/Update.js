import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const Update = () => {
    const storedUser = useLoaderData();

    const [user,setUser] = useState(storedUser);
    const handleUpdateUser = event => {
        event.preventDefault();
        console.log(user);
        fetch(`http://localhost:5000/users/${storedUser._id}`, {
        method:'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
        })
        .then(res => res.json())
        .then(data =>{
            if(data.modifiedCount >0){
                alert('user updated successfully')
                console.log(data)
            }
            
        })
        
    }
    const handleChangeBlur = event => {
        const value = event.target.value;
        const field = event.target.name;
        const newUser ={...user}
        newUser[field] = value;
        setUser(newUser);
        }
    return (
        <div>
            <h2>please update:{storedUser.name}</h2>
            <form onSubmit={handleUpdateUser}>
                <input onChange={handleChangeBlur} defaultValue={storedUser.name}   type='text' name='name' placeholder='name'/>
                <br />
                <input onChange={handleChangeBlur} defaultValue={storedUser.email}  type='email' name='email' placeholder='enter your email'/>
                <br />
                <input onChange={handleChangeBlur} defaultValue={storedUser.address}  type='text' name='address' placeholder='enter your address'/>
                <br />
                <button type='submit'>Update User</button>
            </form>
        </div>
    );
};

export default Update;