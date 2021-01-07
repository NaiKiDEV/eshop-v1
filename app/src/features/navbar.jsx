import React from 'react';
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <div>
            <nav class="navbar shadow-sm">
                <div class="container">
                    <span class="navbar-brand text-lightblue mb-0 h1">Shoppy</span>
                    <span>
                        <Link to="/register" class="btn btn-greeninverted mx-2">Register</Link>
                        <Link to="/login" class="btn btn-redinverted">Login</Link>
                    </span>

                </div>
            </nav>
        </div>
    );
}

export default Navbar;
