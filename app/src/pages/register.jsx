import React, { useState } from 'react';
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
        <div className="flex-grow">
            <div className="flex mt-5 justify-center items-center">
                <div className="card flex flex-col px-5 shadow-lg">
                    <div className="text-center mt-2 mb-3">
                        <h2 class="letter-shadow-green text-uppercase text-3xl">Register an account</h2>
                    </div>
                    <div className="mb-2">
                        {user.requestcode != null ? (user.requestcode === 1 ?
                            <div className="alert alert-blue py-2 rounded px-2 shadow">{user.message}</div> :
                            <div className="alert alert-red py-2 rounded px-2 shadow">{user.message}</div>) : ""}
                    </div>
                    <div className="">
                        <label htmlFor="email" className="letter-shadow-green"><h5 className="text-xl">Email</h5></label>
                        <input className="form-control w-full shadow-sm mb-3" type="text" name="email" id="email"
                            autoComplete="off"
                            onChange={(e) => handleChange(e)}
                            value={data.email}
                        />
                        <label htmlFor="name" className="letter-shadow-green"><h5 className="text-xl">Name</h5></label>
                        <input className="form-control w-full shadow-sm mb-3" type="text" name="name" id="name"
                            autoComplete="off"
                            onChange={(e) => handleChange(e)}
                            value={data.name}
                        />
                        <label htmlFor="surname" className="letter-shadow-green"><h5 className="text-xl">Surname</h5></label>
                        <input className="form-control w-full shadow-sm mb-3" type="text" name="surname" id="surname"
                            autoComplete="off"
                            onChange={(e) => handleChange(e)}
                            value={data.surname}
                        />
                        <label htmlFor="password" className="letter-shadow-green"><h5 className="text-xl">Password</h5></label>
                        <input className="form-control w-full shadow-sm mb-3" type="password" name="password" id="password"
                            onChange={(e) => handleChange(e)}
                            value={data.password}
                        />
                        <label htmlFor="confirmedpassword" className="letter-shadow-green"><h5 className="text-xl">Confirm Password</h5></label>
                        <input className="form-control w-full shadow-sm mb-1" type="password" name="confirmedpassword" id="confirmedpassword"
                            onChange={(e) => handleChange(e)}
                            value={data.confirmedpassword}
                        />

                    </div>
                    <div className="mb-3 ">
                        <small className="text-mutedblue">By pressing Register, you are accepting to our Terms and conditions.</small>
                    </div>
                    <div className="mb-4 w-full">
                        <button className="btn btn-blue btn-register text-uppercase rounded w-full letter-shadow-sm shadow py-1" onClick={() => onSubmit()}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
