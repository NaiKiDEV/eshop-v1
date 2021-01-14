import React from 'react';
import { FaPencilAlt as Pencil } from 'react-icons/fa'
import { MdRemoveCircle as IconRemove } from 'react-icons/md'
import { ImPriceTags } from 'react-icons/im'

function ShopItem(props) {
    const product = props.product
    return (
        <div className="col-6 mb-4 card-holder">
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
                <div className="card-footer item-price bg-lightblue d-flex align-items-center py-0">
                    <div className="container-fluid px-0">
                        <div className="row">
                            <div className="col-6 py-1 animate">
                                <h5 className="text-darkblue  mb-0"><IconRemove className="item-icon me-3" /><Pencil className="item-icon me-3" /><ImPriceTags className="item-icon" /></h5>
                            </div>
                            <div className="col-6 py-1 d-flex justify-content-end ">
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
