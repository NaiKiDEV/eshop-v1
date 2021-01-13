import React from 'react';
import { BiPlus as PlusIcon, BiMinus as MinusIcon } from 'react-icons/bi'
import { useDispatch } from 'react-redux';
import { updateCart } from '../store/product/actions';

function CartItem({ product }) {

    const dispatch = useDispatch();

    function handleCartUpdateAdd(e) {
        e.stopPropagation()
        dispatch(updateCart({ _id: product._id, quantity: product.quantity + 1 }))
    }
    function handleCartUpdateSubract(e) {
        e.stopPropagation()
        dispatch(updateCart({ _id: product._id, quantity: product.quantity - 1 }))
    }

    return (
        <div className="text-blue py-2 px-2">
            <div className="container">
                <div className="row">
                    <div className="col-3 pe-0 ps-2">
                        <img src={product.images[0]} className="cart-image" alt="" />
                    </div>
                    <div className="col-7">
                        <div className="row h-100">
                            <div className="col-12 letter-shadow-sm lh-1">
                                {product.name}
                            </div>
                            <div className="col-12 d-flex align-items-end text-lightblue">
                                Qty: {product.quantity}
                            </div>
                        </div>
                    </div>
                    <div className="col-2 justify-content-end text-lightblue">
                        <div className="row h-100">
                            <div className="col-12 d-flex justify-content-end lh-1 letter-shadow-sm">
                                {product.discount && product.discount > 0 ? product.discount : product.price}€
                            </div>
                            <div className="col-12 d-flex align-items-center justify-content-between">
                                <MinusIcon onClick={(e) => handleCartUpdateSubract(e)} />
                                <PlusIcon onClick={(e) => handleCartUpdateAdd(e)} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default CartItem;
