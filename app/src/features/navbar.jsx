import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import { IoCartOutline as CartLogo } from 'react-icons/io5'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../store/user/actions';
import CartItem from '../components/cartitem'

function Navbar() {

    const user = useSelector(state => state.user)
    const products = useSelector(state => state.product)
    const cart = useSelector(state => state.product.cart)
    const dispatch = useDispatch()

    const [cartOpen, setCartOpen] = useState(false);
    const [cartSum, setCartSum] = useState(0);

    useEffect(() => {
        setCartSum(0)
        var sum = 0;
        cart.forEach(x => sum += x.price)
        setCartSum(sum)

    }, [cart]);

    function handleCartOpen() {
        setCartOpen(!cartOpen)
    }

    return (
        <div>
            <nav class="navbar shadow-sm">
                <div class="container">
                    <span className="navbar-brand text-lightblue mb-0"><Link to="/">Shoppy</Link></span>
                    <div className="flex-grow-1 justify-content-start">
                        <Link to="/" className="btn btn-blueinverted float-left text-lightblue mb-0">All items</Link>
                    </div>
                    <div className="position-relative me-2 navbar-cart-container">
                        <CartLogo className="navbar-cart" onClick={() => handleCartOpen()}></CartLogo>
                        <div className="badge rounded-pill bg-danger navbar-cart-count">{cart.length > 0 ? cart.length : ""}</div>
                        <div className={"navbar-cart-popover bg-darkblue shadow-lg " + (cartOpen ? "show" : "hide")}>
                            <div className="pt-3 px-3">
                                <h5 className="text-blue">CART:</h5>
                            </div>
                            {cart.length > 0 ?
                                cart.map(item => <CartItem product={item}></CartItem>) :
                                <div className="py-2 px-3 text-blue">
                                    Empty...
                                </div>
                            }
                            <div className="py-3 ps-1 pe-3">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-6 justify-content-start align-items-center">
                                            <button className="btn btn-blueinverted">Checkout</button>
                                        </div>
                                        <div className="col-6 d-flex justify-content-end align-items-center">
                                            <h5 className="text-blue mb-0">Total: {cartSum} €</h5>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
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
