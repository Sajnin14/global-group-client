import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';

const Login = () => {
    const { loginUser, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        loginUser(email, password)
            .then(res => {
                setUser(res.user);
                console.log(res.user);
                setTimeout(() => {
                    navigate('/');
                }, 1000);

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
            <form onSubmit={handleLogin} className="card-body w-3/4 mx-auto">
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
                    <button className="btn btn-primary">Login</button>
                </div>

                <p className="text-center text-sm">Do not have an account? <Link to='/registration' className="text-blue-700 underline font-semibold">Registration</Link></p>
            </form>
        </div>
    );
};

export default Login;