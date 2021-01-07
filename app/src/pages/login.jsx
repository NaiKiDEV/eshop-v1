import React, { useState, useEffect } from 'react';
import { registerUser } from '../store/user/actions'
import { useDispatch, useSelector } from 'react-redux'

function Register() {

    const user = useSelector(state => state.user)
    console.log(user)
    const dispatch = useDispatch()

    const [data, setData] = useState({
        email: '',
        name: '',
        surname: '',
        password: '',
        confirmedpassword: ''
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    function onSubmit() {
        // TODO: Add some validation if passwords do not match
        console.log("Registering")
        if (data.password === data.confirmedpassword) {
            dispatch(registerUser(data));
        }
    }

    return (
        <div className="">
            <div className="d-flex mt-5 justify-content-center align-items-center">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
                            <div className="card shadow-lg">
                                <div className="card-body">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-12 text-center mt-2 mb-3">
                                                <h2 class="letter-shadow-green text-uppercase">Register an account</h2>
                                            </div>
                                            <div className="col-12">
                                                {user.requestcode != null ? (user.requestcode === 1 ?
                                                    <div className="alert alert-green shadow">Successfully created user.</div> :
                                                    <div className="alert alert-red shadow">User already exists.</div>) : ""}
                                                {/* <div className="alert alert-blue py-2 shadow">Successfully created user.</div>
                                                <div className="alert alert-red py-2 shadow">User already exists.</div> */}
                                            </div>
                                            <div className="col-12 mb-4">
                                                <label htmlFor="email" className="letter-shadow-green"><h5>Email</h5></label>
                                                <input className="form-control shadow-sm mb-3" type="text" name="email" id="email"
                                                    autoComplete="off"
                                                    onChange={(e) => handleChange(e)}
                                                    value={data.email}
                                                />
                                                <label htmlFor="password" className="letter-shadow-green"><h5>Password</h5></label>
                                                <input className="form-control shadow-sm mb-3" type="password" name="password" id="password"
                                                    onChange={(e) => handleChange(e)}
                                                    value={data.password}
                                                />
                                            </div>
                                            <div className="col-6 mb-4 d-flex justify-content-center">
                                                <button className="btn btn-green btn-register text-uppercase letter-shadow-sm shadow me-3">Register</button>
                                            </div>
                                            <div className="col-6 mb-4 d-flex justify-content-center">
                                                <button className="btn btn-red btn-register text-uppercase letter-shadow-sm shadow" onClick={() => onSubmit()}>Login</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Register;
