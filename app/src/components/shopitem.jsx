import React from 'react';
import { FaCartPlus } from 'react-icons/fa'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { FaRegPlusSquare as Cart } from 'react-icons/fa'

function ShopItem(props) {
    const product = props.product



    Date.prototype.removeDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() - days);
        return date;
    }

    // console.log(new Date(product.created), new Date().removeDays(7))

    return (
        <div className="col-6 col-lg-4 col-xxl-3 mb-4 card-holder">
            <div className="card shadow-sm">
                <div className="card-body shadow">
                    <img src={product?.images[0]} className="image-fit" alt="" />
                    <div className="item-specials">
                        {new Date(product.created) > new Date().removeDays(7) ? <span className="badge rounded-pill badge-blue">New</span> : ""}
                        {product?.discount > 0 ? <span className="badge rounded-pill badge-red ms-2">Discount</span> : ""}
                    </div>
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
                            <div className="col-2 d-flex align-items-center animate">
                                <h5 className="text-darkblue d-flex align-items-center mb-0"><Cart className="item-icon" /></h5>
                            </div>
                            <div className="col-10 d-flex justify-content-end ">
                                <h5 className="text-darkblue item-pricetag mb-0">
                                    {product?.discount > 0 ? <span>{product.discount}€ <small className="text-strikethrough text-red">{product.price}€</small></span> : product.price + " €"}

                                </h5>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default ShopItem;
