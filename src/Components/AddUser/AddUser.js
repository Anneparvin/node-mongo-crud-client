import React, { useState } from 'react';

const AddUser = () => {
    const [user,setUser] = useState({});
    const handleAddUser = event => {
        event.preventDefault();
        console.log(user);
        fetch('http://localhost:5000/users', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
        })
        .then((res) => res.json())
        .then((data) => {
            if(data.acknowledged){
                alert('user added successfully');
                event.target.reset();
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const handleInputBlur = event => {
        const value = event.target.value;
        const field = event.target.name;
        const newUser ={...user}
        newUser[field] = value;
        setUser(newUser);
        }
        
    return (
        <div>
            <h2>please add a new user</h2>
            <form onSubmit={handleAddUser}>
                <input onBlur={handleInputBlur} type='text' name='name' placeholder='name'/>
                <br />
                <input onBlur={handleInputBlur} type='email' name='email' placeholder='enter your email'/>
                <br />
                <input onBlur={handleInputBlur} type='text' name='address' placeholder='enter your address'/>
                <br />
                <button type='submit'>Add User</button>
            </form>
        </div>
    );
};

export default AddUser;