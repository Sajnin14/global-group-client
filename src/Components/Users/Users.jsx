import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Users.css';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Users = () => {
    const [usersCollection, setUsersCollection] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [count, setCount] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`http://localhost:5000/api/login?page=${currentPage}&size=${itemsPerPage}`)
            .then(res => {
                console.log(res.data);
                setUsersCollection(res.data);
            })
    }, [currentPage, itemsPerPage])

    useEffect(() => {
        axios.get(`http://localhost:5000/api/login`)
            .then(res => {
                const data = res.data;
                setCount(data.length);
            })
    }, [])

    const numberOfPages = Math.ceil(count / itemsPerPage);
    // const numberOfPages = Math.ceil(anotherCount/itemsPerPage);

    const pages = [...Array(numberOfPages).keys()];

    const handlePagination = e => {
        e.preventDefault();
        const value = parseInt(e.target.value);
        setItemsPerPage(value);
        setCurrentPage(0);
    }

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }

    }

    const handleNext = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    }

    const handleDelete = (users) => {
        console.log(users);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/api/users/${users._id}`)
                .then(res => {
                    console.log(res.data);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    navigate('/login');
                })
                
            }
        });
    }

    return (
        <div className="overflow-x-auto my-10">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {
                        usersCollection.map((users, idx) => <tr key={idx}>

                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src="https://i.ibb.co.com/Jt01xvq/girl2.jpg" alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{users.firstName}</div>
                                    </div>
                                </div>
                            </td>
                            <td>{users.lastName}</td>
                            <td>{users.email}</td>

                            <td className='flex gap-3'>
                                <Link to={`/users/${users._id}`}><button className=' underline text-green-600'>Edit</button></Link>
                                <button onClick={() => handleDelete(users)} className=' underline text-red-600'>Delete</button>
                            </td>

                        </tr>)
                    }

                </tbody>

                <div className="pagination my-7">
                    <button onClick={handlePrevious}>Previous</button>
                    {
                        pages.map((page, idx) => <button className={currentPage === page && 'selected'} onClick={() => setCurrentPage(page)} key={idx}>{page}</button>)
                    }
                    <button onClick={handleNext}>Next</button>
                    <select value={itemsPerPage} onChange={handlePagination}>
                        <option value="3">3</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                </div>

            </table>
        </div>
    );
};

export default Users;