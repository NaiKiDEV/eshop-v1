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
        <div className="text-blue py-2 px-4">
            <div className="grid grid-cols-12">
                <div className="col-span-3">
                    <img src={product.images[0]} className="cart-image" alt="" />
                </div>
                <div className="col-span-7 px-1">
                    <div className="flex flex-col justify-between h-full">
                        <div className="flex flex-grow letter-shadow-sm leading-none">
                            {product.name}
                        </div>
                        <div className="flex text-lightblue">
                            Qty: {product.quantity}
                        </div>
                    </div>
                </div>
                <div className="col-span-2 justify-content-end text-lightblue">
                    <div className="flex flex-col justify-between h-full">
                        <div className="flex justify-end leading-none letter-shadow-sm">
                            {product.discount && product.discount > 0 ? product.discount : product.price}€
                            </div>
                        <div className="flex items-center justify-end">
                            <MinusIcon onClick={(e) => handleCartUpdateSubract(e)} />
                            <PlusIcon onClick={(e) => handleCartUpdateAdd(e)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItem;
