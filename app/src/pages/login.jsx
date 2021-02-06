import React, { useState, useEffect } from 'react';
import { loginUser } from '../store/user/actions'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import history from '../core/history'

function Login() {

    const user = useSelector(state => state.user)
    console.log(user)
    const dispatch = useDispatch()

    const [data, setData] = useState({
        email: 'shop@gmail.com',
        password: 'qwerty'
    });

    useEffect(() => {
        if (user.isLoggedIn === true) {
            setTimeout(() => {
                history.push('/')
            }, 250)
        }
    }, [user])

    function handleChange(e) {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    function onSubmit() {
        dispatch(loginUser(data));
    }

    return (
        <div className="flex-grow">
            <div className="flex mt-5 justify-center items-center">
                <div className="card flex flex-col px-5 shadow-lg">
                    <div className="col-12 text-center mt-2 mb-3">
                        <h2 class="letter-shadow-green text-uppercase text-3xl">Login</h2>
                    </div>
                    <div className="col-12">
                        {user.requestcode != null ? (user.requestcode === 0 ?
                            <div className="alert alert-red shadow">{user.message}</div> :
                            "") : ""}
                        {/* <div className="alert alert-blue py-2 shadow">Successfully created user.</div>
                                                <div className="alert alert-red py-2 shadow">User already exists.</div> */}
                    </div>
                    <div className="col-12 mb-4">
                        <label htmlFor="email" className="letter-shadow-green"><h5 className="text-xl">Email</h5></label>
                        <input className="form-control w-full shadow-sm mb-3" type="text" name="email" id="email"
                            autoComplete="off"
                            onChange={(e) => handleChange(e)}
                            value={data.email}
                        />
                        <label htmlFor="password" className="letter-shadow-green"><h5 className="text-xl">Password</h5></label>
                        <input className="form-control w-full shadow-sm mb-2" type="password" name="password" id="password"
                            onChange={(e) => handleChange(e)}
                            value={data.password}
                        />
                        <small className="text-mutedblue"><Link className="text-mutedblue fst-italic" to="/forgotpassword">Forgot password?</Link></small>
                    </div>
                    <div className="w-full mb-4">
                        <button className="btn btn-red btn-register text-uppercase w-full letter-shadow-sm shadow py-1" onClick={() => onSubmit()}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
