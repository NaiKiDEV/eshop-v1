import React from 'react';
import { FaCartPlus } from 'react-icons/fa'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { IoCartOutline } from 'react-icons/io5'

function ShopItem(props) {
    const product = props.product
    return (
        <div className="col-6 col-lg-4 col-xxl-3 mb-4 card-holder">
            <div className="card shadow-sm">
                <div className="card-body shadow">
                    <img src={product?.images[0]} className="image-fit" alt="" />
                    <div className="container-fluid mt-2 px-0">
                        <div className="row">
                            <div className="col-12">
                                <h6 className="text-blue item-name letter-shadow-sm">{product.name}</h6>
                            </div>
                            <div className="col-12">
                                <p className="text-lightblue item-description lh-sm">{product.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-footer item-price bg-lightblue d-flex align-items-center py-0 ">
                    <div className="container-fluid px-0">
                        <div className="row">
                            <div className="col-6 animate">
                                <h5 className="text-darkblue  mb-0"><IoCartOutline className="item-icon" /></h5>
                            </div>
                            <div className="col-6 d-flex justify-content-end ">
                                <h5 className="text-darkblue item-pricetag mb-0">{product.price} €</h5>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default ShopItem;
