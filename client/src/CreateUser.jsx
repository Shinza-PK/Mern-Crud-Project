import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();
    console.log('Form submitted with values:', { name, email, age });
    axios.post("http://localhost:3001/createUser", { name, email, age })
      .then(result => {
        console.log(result);
        navigate('/'); // Redirect to the users list or another appropriate page
      })
      .catch(err => {
        console.log(err);
        setError('Error creating user');
      });
  };

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={Submit}>
          <h2>Add User</h2>
          {error && <p className="text-danger">{error}</p>}
          <div className='mb-2'>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder='Enter Name'
              className='form-control'
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </div>
          <div className='mb-2'>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder='Enter Email'
              className='form-control'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className='mb-2'>
            <label htmlFor="age">Age</label>
            <input
              type="text"
              id="age"
              placeholder='Enter Age'
              className='form-control'
              value={age}
              onChange={(e) => setAge(e.target.value)}
              autoComplete="bday"
            />
          </div>
          <button className='btn btn-success' type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
