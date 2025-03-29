import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../AuthProvider/AuthProvider';
import axios from 'axios';

const Registration = () => {
   const {createUser} = useContext(AuthContext);
   const navigate = useNavigate();
  const handleSubmit = e =>{
    e.preventDefault();
    const form = e.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const password = form.password.value;

    const formValue = {firstName, lastName, email, password};
    console.log(formValue);
    
    createUser(email, password)
        .then(res => {
          console.log(res.user);
            // updateUser({displayName: name, photoURL : photo})
            // .then(() => {})
            // .catch(err => {
            // })
            const userInfo = {
              firstName, lastName, email
            }

            axios.post('http://localhost:5000/api/login', userInfo)
            .then(res => {
              console.log(res.data);
            })
            navigate('/');

        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${err.message}`,
          });
        })

  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="card-body w-3/4 mx-auto">
      <div className="form-control">
          <label className="label">
            <span className="label-text">First Name</span>
          </label>
          <input type='text' name='firstName' placeholder="First Name" className="input input-bordered" required />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Last Name</span>
          </label>
          <input type='text' name='lastName' placeholder="Last Name" className="input input-bordered" required />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' placeholder="email" className="input input-bordered" required />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name='password' placeholder="password" className="input input-bordered" required />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Registration</button>
        </div>

        <p className="text-center text-sm">Already have an account? <Link to='/login' className="text-blue-700 underline font-semibold">Login</Link></p>
      </form>
    </div>
  );
};

export default Registration;