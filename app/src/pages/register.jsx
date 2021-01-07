import React, { useState, useEffect } from 'react';
import { registerUser } from '../store/user/actions'
import { useDispatch, useSelector } from 'react-redux'

function Register() {

    const user = useSelector(state => state.user)
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
                                                    <div className="alert alert-blue py-2 shadow">{user.message}</div> :
                                                    <div className="alert alert-red py-2 shadow">{user.message}</div>) : ""}
                                            </div>
                                            <div className="col-12 mb-4">
                                                <label htmlFor="email" className="letter-shadow-green"><h5>Email</h5></label>
                                                <input className="form-control shadow-sm mb-3" type="text" name="email" id="email"
                                                    autoComplete="off"
                                                    onChange={(e) => handleChange(e)}
                                                    value={data.email}
                                                />
                                                <label htmlFor="name" className="letter-shadow-green"><h5>Name</h5></label>
                                                <input className="form-control shadow-sm mb-3" type="text" name="name" id="name"
                                                    autoComplete="off"
                                                    onChange={(e) => handleChange(e)}
                                                    value={data.name}
                                                />
                                                <label htmlFor="surname" className="letter-shadow-green"><h5>Surname</h5></label>
                                                <input className="form-control shadow-sm mb-3" type="text" name="surname" id="surname"
                                                    autoComplete="off"
                                                    onChange={(e) => handleChange(e)}
                                                    value={data.surname}
                                                />
                                                <label htmlFor="password" className="letter-shadow-green"><h5>Password</h5></label>
                                                <input className="form-control shadow-sm mb-3" type="password" name="password" id="password"
                                                    onChange={(e) => handleChange(e)}
                                                    value={data.password}
                                                />
                                                <label htmlFor="confirmedpassword" className="letter-shadow-green"><h5>Confirm Password</h5></label>
                                                <input className="form-control shadow-sm mb-1" type="password" name="confirmedpassword" id="confirmedpassword"
                                                    onChange={(e) => handleChange(e)}
                                                    value={data.confirmedpassword}
                                                />
                                                <small className="text-mutedblue">By pressing Register, you are accepting to our Terms and conditions.</small>
                                            </div>
                                            <div className="col-6 offset-6 mb-4 d-flex justify-content-center">
                                                <button className="btn btn-blue btn-register text-uppercase letter-shadow-sm shadow me-3" onClick={() => onSubmit()}>Register</button>
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
