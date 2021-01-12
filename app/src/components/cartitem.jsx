import React from 'react';

function CartItem({ product }) {

    return (
        <div className="text-blue py-2 px-2">
            <div className="container">
                <div className="row">
                    <div className="col-3 pe-0 ps-2">
                        <img src={product.images[0]} className="img-fluid" alt="" />
                    </div>
                    <div className="col-7">
                        {product.name}
                    </div>
                    <div className="col-2 justify-content-end text-lightblue">
                        {product.price}€
                    </div>
                </div>
            </div>

        </div>
    );
}

export default CartItem;
