import React, { useEffect, useState } from 'react';
import { FaPencilAlt as Pencil } from 'react-icons/fa'
import { MdRemoveCircle as IconRemove } from 'react-icons/md'
import { ImPriceTags } from 'react-icons/im'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { getAllProducts, removeProduct, updateProduct } from '../store/product/actions';

function ShopItem(props) {
    const product = props.product

    const [discountEdit, setDiscountEdit] = useState(product.discount || 0)
    const [discountMenu, setDiscountMenu] = useState(false)

    const dispatch = useDispatch()

    const removeDays = function (days) {
        var date = new Date();
        date.setDate(date.getDate() - days);
        return date;
    }

    function handleProductRemove(id) {
        dispatch(removeProduct(id))
    }
    function handleProductDiscount(id, value) {
        dispatch(updateProduct({ _id: id, discount: value }))
        setDiscountEdit(value)
        setDiscountMenu(false)
    }

    return (
        <div className="col-span-6 lg:col-span-4 xl:col-span-3 card-holder rounded shadow-sm bg-darkblue">
            <div className="p-4">
                <div className="relative">
                    <div className="item-specials flex flex-row space-x-2">
                        {new Date(product.created) > removeDays(7) ? <span className="w-min px-2 text-xs flex items-center text-center rounded-xl badge-blue">New</span> : ""}
                        {product?.discount > 0 ? <span className="w-min px-2 text-xs flex items-center text-center rounded-xl badge-red ms-2">Discount</span> : ""}
                    </div>
                </div>
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
            </div>
            <div className="card-footer rounded-bl rounded-br item-price bg-lightblue flex flex-row justify-between items-center py-0 px-4">
                <div className="flex items-center animate">
                    <h5 className="text-darkblue flex items-center mb-0 space-x-2">
                        <IconRemove className="item-icon" onClick={() => handleProductRemove(product._id)} />
                        <Pencil className="item-icon" />
                        <ImPriceTags className={"item-icon " + (discountMenu ? "active" : "")} onClick={() => setDiscountMenu(!discountMenu)} />
                        <div className={"flex items-center bg-darkblue rounded " + (discountMenu ? " " : "hidden")}>
                            <input type="text" className="form-control-small w-16 py-0 px-1" onChange={(e) => setDiscountEdit(e.target.value)} value={discountEdit}></input>
                            <button class="btn btn-blueinverted" onClick={() => handleProductDiscount(product._id, discountEdit)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <button class="btn btn-redinverted" onClick={() => handleProductDiscount(product._id, 0)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </h5>
                </div>
                <div className="flex justify-content-end ">
                    <h5 className="text-darkblue item-pricetag mb-0">
                        {product?.discount > 0 ? <span>{product.discount}€ <small className="text-strikethrough text-red">{product.price}€</small></span> : product.price + " €"}
                    </h5>
                </div>
            </div>
        </div>
    );
}

export default ShopItem;
