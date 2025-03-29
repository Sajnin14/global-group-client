import React from 'react';
import { Link } from 'react-router-dom';

const Registration = () => {

  const handleSubmit = e =>{
    e.preventDefault();
    const form = e.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const password = form.password.value;

    const formValue = {firstName, lastName, email, password};
    console.log(formValue);
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

        <p className="text-center text-sm">Already have an account? <Link className="text-blue-700 underline font-semibold">Login</Link></p>
      </form>
    </div>
  );
};

export default Registration;