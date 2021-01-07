import React from 'react';
import { Link } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../store/user/actions';

function Navbar() {

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    return (
        <div>
            <nav class="navbar shadow-sm">
                <div class="container">
                    <span class="navbar-brand text-lightblue mb-0 h1">Shoppy</span>
                    <span>
                        {user.isLoggedIn ?
                            <div><button class="btn btn-blueinverted mx-2" onClick={() => dispatch(logoutUser())}>Logout</button></div> :
                            <div>
                                <Link to="/register" class="btn btn-blueinverted mx-2">Register</Link>
                                <Link to="/login" class="btn btn-redinverted">Login </Link>
                            </div>
                        }

                    </span>

                </div>
            </nav>
            <div className="container">
                <div className="row">
                    <div className="col-3 offset-9">
                        <div className="important-messages mt-2">
                            {(user.requestcode === 1 && user.isLoggedIn == true) ?
                                <div className="alert alert-blue py-2 shadow">{user.message}</div> :
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
