import React from 'react';
import { Link } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../store/user/actions';

function Navbar() {

    const user = useSelector(state => state.user)
    const products = useSelector(state => state.product)
    const dispatch = useDispatch()

    return (
        <div>
            <nav class="navbar shadow-sm">
                <div class="container">
                    <span className="navbar-brand text-lightblue mb-0"><Link to="/">Shoppy</Link></span>
                    <div className="flex-grow-1 justify-content-start">
                        <Link to="/" className="btn btn-blueinverted float-left text-lightblue mb-0">All items</Link>
                    </div>

                    <span>
                        {user.isLoggedIn ?
                            <div>
                                {user.userData.isAdmin == true ? <Link to="/admin" class="btn btn-redinverted mx-2">Admin</Link> : ""}
                                <button className="btn btn-blueinverted mx-2" onClick={() => dispatch(logoutUser())}>Logout</button>
                            </div> :
                            <div>
                                <Link to="/register" className="btn btn-blueinverted mx-2">Register</Link>
                                <Link to="/login" className="btn btn-redinverted">Login </Link>
                            </div>
                        }

                    </span>

                </div>
            </nav>
            <div className="container">
                <div className="row">
                    <div className="col-2 offset-8 position-absolute " style={{ "zIndex": "1000" }}>
                        <div className="important-messages mt-2">
                            {(user.isLoggedIn == true) ?
                                (user.requestcode === 1 ?
                                    <div className="alert alert-blue py-2 shadow-sm">{user.message}</div> :
                                    ""
                                )
                                :
                                ""
                            }
                            {(user.isLoggedIn == false) ?
                                (user.requestcode === 99 ? // Logout code with message
                                    <div className="alert alert-red py-2 shadow-sm">{user.message}</div> :
                                    ""
                                )
                                :
                                ""
                            }
                            {(user.isLoggedIn == true) ?
                                (products.requestcode === 1 ? // Logout code with message
                                    <div className="alert alert-blue py-2 shadow-sm">{user.message}</div> :
                                    products.requestcode === 0 ?
                                        <div className="alert alert-red py-2 shadow-sm">{user.message}</div> :
                                        ""
                                )
                                :
                                ""
                            }
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Navbar;
