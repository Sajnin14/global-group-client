import axios from 'axios';
import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateUsers = () => {
    const loader = useLoaderData();
    console.log(loader);
    const navigate = useNavigate();
    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const email = form.email.value;

        const userInfo = {
            firstName, lastName, email
        }

        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios.put(`http://localhost:5000/api/users/${loader._id}`, userInfo)
                .then(res => {
                    console.log(res.data);
                    Swal.fire("Saved!", "", "success");
                    navigate('/');
                })
              
            } else if (result.isDenied) {
              Swal.fire("Changes are not saved", "", "info");
            }
          });

    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="card-body w-3/4 mx-auto">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">First Name</span>
                    </label>
                    <input type='text' name='firstName' placeholder={loader.firstName} className="input input-bordered" required />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Last Name</span>
                    </label>
                    <input type='text' name='lastName' placeholder={loader.lastName} className="input input-bordered" required />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name='email' placeholder={loader.email} className="input input-bordered" required />
                </div>

                <div className="form-control mt-6">
                    <button className="btn btn-primary">Update</button>
                </div>

            </form>
        </div>
    );
};

export default UpdateUsers;