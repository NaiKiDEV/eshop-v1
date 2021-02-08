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

    const [wantToDelete, setWantToDelete] = useState(false)

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
                    <h5 className="text-darkblue flex items-center mb-0 gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="item-icon item-red" onClick={() => { setWantToDelete(!wantToDelete); setDiscountMenu(false) }}>
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                        <div className={"flex border-r border-darkblue items-center bg-darkblue rounded py-0.5 px-0 slide-right slide-admin " + (wantToDelete ? "slide px-1" : "")}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="item-icon btn btn-blueinverted" onClick={() => handleProductRemove(product._id)}>
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="item-icon btn btn-redinverted" onClick={() => setWantToDelete(false)}>
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        {/* <div className="border-r border-black h-5"></div> */}
                        <Pencil className="item-icon item-mutedblue" />
                        <Link to={"/product/" + product._id}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="item-icon item-mutedblue">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                        </Link>
                        <ImPriceTags className={"item-icon item-mutedblue " + (discountMenu ? "active" : "")} onClick={() => { setDiscountMenu(!discountMenu); setWantToDelete(false) }} />
                        <div className={"flex border-r border-darkblue items-center bg-darkblue rounded slide-right " + (discountMenu ? " slide" : "")}>
                            <input type="text" className={"form-control-small w-16 py-0 px-0 " + (discountMenu ? " px-1" : "")} onChange={(e) => setDiscountEdit(e.target.value)} value={discountEdit}></input>
                            <button className="btn btn-blueinverted">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6" onClick={() => handleProductDiscount(product._id, discountEdit)}>
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <button className="btn btn-redinverted">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6" onClick={() => handleProductDiscount(product._id, 0)}>
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
        </div >
    );
}

export default ShopItem;
