import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/')
      .then(result => setUsers(result.data))
      .catch(err => {
        console.log(err);
        setError('Error fetching users');
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/deleteUser/${id}`)
      .then(res => {
        console.log(res);
        setUsers(users.filter(user => user._id !== id));
      })
      .catch(err => {
        console.log(err);
        setError('Error deleting user');
      });
  };

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <Link to="/create" className="btn btn-primary mb-3">Add +</Link>
        {error && <p className="error text-danger">{error}</p>}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  <Link to={`/update/${user._id}`} className="btn btn-warning mr-2">Update</Link>
                  <button onClick={() => handleDelete(user._id)} className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
