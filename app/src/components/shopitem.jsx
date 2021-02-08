import React from 'react';
import { FaRegPlusSquare as CartAdd, FaRegMinusSquare as CartRemove } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../store/product/actions';

function ShopItem(props) {
    const product = props.product

    const cart = useSelector(state => state.product.cart)
    const dispatch = useDispatch();

    const removeDays = function (days) {
        var date = new Date();
        date.setDate(date.getDate() - days);
        return date;
    }

    function handleAddToCart() {
        dispatch(addToCart({ ...product, quantity: 1 }))
    }
    function handleRemoveFromCart() {
        dispatch(removeFromCart(product._id))
    }

    // console.log(new Date(product.created), new Date().removeDays(7))
    console.log()
    return (
        <div className="bg-darkblue card-holder rounded shadow-sm">
            <div className="p-4">
                <div className="relative">
                    <div className="item-specials flex flex-row space-x-2">
                        {new Date(product.created) > removeDays(7) ? <span className="w-min px-2 text-xs flex items-center text-center rounded-xl badge-blue">New</span> : ""}
                        {product?.discount > 0 ? <span className="w-min px-2 text-xs flex items-center text-center rounded-xl badge-red ms-2">Discount</span> : ""}
                    </div>
                </div>
                <Link to={"/product/" + product._id}>
                    <img src={product?.images[0]} className="image-fit" alt="" />
                    <div className="container-fluid mt-2 px-0">
                        <div className="row">
                            <div className="col-12">
                                <h6 className="text-blue item-name letter-shadow-sm">{product.name}</h6>
                            </div>
                            <div className="col-12">
                                <p className="text-lightblue item-description leading-none">{product.description}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="card-footer rounded-bl rounded-br item-price bg-lightblue flex flex-row justify-between items-center py-0 px-3">
                <div className="col-2 flex items-center animate">
                    <h5 className="text-darkblue flex items-center mb-0">
                        {cart.filter(x => x._id === product._id).length > 0 ?
                            <CartRemove className="item-icon" onClick={() => handleRemoveFromCart()} /> :
                            <CartAdd className="item-icon" onClick={() => handleAddToCart()} />
                        }
                    </h5>
                </div>
                <div className="col-10 flex justify-content-end ">
                    <h5 className="text-darkblue item-pricetag mb-0">
                        {product?.discount > 0 ? <span>{product.discount}€ <small className="text-strikethrough text-red">{product.price}€</small></span> : product.price + " €"}
                    </h5>
                </div>
            </div>
        </div>
    );
}

export default ShopItem;
