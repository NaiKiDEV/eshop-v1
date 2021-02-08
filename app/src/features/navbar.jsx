import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { IoCartOutline as CartLogo } from 'react-icons/io5'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../store/user/actions';
import CartItem from '../components/cartitem'
import { usePopper } from 'react-popper';

function Navbar() {

    const user = useSelector(state => state.user)
    const products = useSelector(state => state.product)
    const cart = useSelector(state => state.product.cart)
    const dispatch = useDispatch()

    const [cartOpen, setCartOpen] = useState(false);
    const [cartSum, setCartSum] = useState(0);

    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);

    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        modifiers: [
            {
                name: "placement",
                options: {
                    offset: [20, 0],
                    mainAxis: false,
                }
            }
        ]
    });

    useEffect(() => {
        setCartSum(0)
        var sum = 0;
        cart.forEach(x => {
            if (x.discount && x.discount > 0) {
                sum += x.discount * x.quantity
            } else {
                sum += x.price * x.quantity
            }
        })
        setCartSum(sum)
    }, [cart]);

    function handleCartOpen() {
        setCartOpen(true)
    }
    function handleCartClose() {
        setCartOpen(false)
    }

    return (
        <nav className="navbar shadow sticky h-14 flex-none" >
            <div className="grid grid-cols-12 flex-row justify-between items-center h-full">
                <div className="col-start-2 col-end-6 flex flex-row ">
                    <span className="navbar-brand text-lightblue mb-0"><Link to="/">SHOP</Link></span>
                    <div className="flex-grow-1 justify-content-start">
                        <Link to="/" className="btn btn-blueinverted float-left text-lightblue mb-0">All items</Link>
                    </div>
                </div>
                <div className="col-start-6 col-end-12 flex flex-row items-center justify-end space-x-3">
                    <div className="relative me-2 navbar-cart-container" ref={setReferenceElement}>
                        <CartLogo className="navbar-cart" onMouseEnter={() => handleCartOpen()} onMouseLeave={handleCartClose}></CartLogo>
                        <div className="px-1 rounded badge-blue navbar-cart-count">{cart.length > 0 ? cart.length : ""}</div>
                        <div className="relative">
                            <div ref={setPopperElement} style={styles.popper} onMouseEnter={() => handleCartOpen()} onMouseLeave={handleCartClose} className={"navbar-cart-popover bg-darkblue shadow-lg " + (cartOpen ? "show" : "hide")}>
                                <div className="pt-3 px-3">
                                    <h5 className="text-blue letter-shadow-sm text-xl">CART:</h5>
                                </div>
                                <div className="border-top-white mx-auto mt-2 mb-2"></div>
                                {cart.length > 0 ?
                                    cart.map(item => <CartItem product={item}></CartItem>) :
                                    <div className="py-2 px-3 text-lightblue">
                                        Cart is empty...
                                    </div>
                                }
                                <div className="border-top-white mx-auto mt-2"></div>
                                <div className="flex justify-between px-4 py-3">
                                    <div className="col-6 flex justify-start items-center">
                                        <button className="btn ps-0 btn-redinverted">View order</button>
                                    </div>
                                    <div className="col-6 pr-0 flex justify-end items-center">
                                        <h5 className="text-blue mb-0 letter-shadow-sm text-xl">Total: <span className="text-lightblue">{cartSum} €</span></h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {user.isLoggedIn ?
                        <div className="flex flex-row space-x-3">
                            {user.userData.isAdmin === true ? <Link to="/admin" className="btn btn-redinverted mx-2">Admin</Link> : ""}
                            <button className="btn btn-blueinverted mx-2" onClick={() => dispatch(logoutUser())}>Logout</button>
                        </div> :
                        <div className="flex flex-row space-x-3">
                            <Link to="/register" className="btn btn-blueinverted mx-2">Register</Link>
                            <Link to="/login" className="btn btn-redinverted">Login </Link>
                        </div>
                    }
                </div>
            </div>
            <div className="grid grid-cols-12">
                <div className="mt-1 col-start-10 col-end-12">
                    {(user.isLoggedIn === true) ?
                        (user.requestcode === 1 ?
                            <div className="alert rounded px-2 text-center alert-blue py-2 shadow-lg">{user.message}</div> :
                            ""
                        )
                        :
                        ""
                    }
                    {(user.isLoggedIn === false) ?
                        (user.requestcode === 99 ? // Logout code with message
                            <div className="alert rounded px-2 text-center alert-red py-2 shadow-lg">{user.message}</div> :
                            ""
                        )
                        :
                        ""
                    }
                    {(user.isLoggedIn === true) ?
                        (products.requestcode === 1 ? // Logout code with message
                            <div className="alert rounded px-2 text-center alert-blue py-2 shadow-lg">{user.message}</div> :
                            products.requestcode === 0 ?
                                <div className="alert rounded px-2 text-center alert-red py-2 shadow-lg">{user.message}</div> :
                                ""
                        )
                        :
                        ""
                    }
                </div>
            </div>

        </nav>
    );
}

export default Navbar;
