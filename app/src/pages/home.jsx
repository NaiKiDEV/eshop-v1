import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../store/product/actions';
import ShopItem from '../components/shopitem'
function Home() {

    const products = useSelector(state => state.product.products)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllProducts())
    }, [])

    console.log(products)

    return (
        <div>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-2 h-100 bg-darkblue rounded">
                        <div className="pt-2 pb-4">
                            <h4 className="text-blue mb-3">Filter items</h4>
                            <h6 className="text-blue">Tags:</h6>
                            <div className="badge rounded-pill badge-blue me-2">New</div>
                            <div className="badge rounded-pill badge-red me-2">Discount</div>
                            <div className="badge rounded-pill badge-green">PROMO</div>
                            <h6 className="text-blue mt-2">Price:</h6>

                        </div>
                    </div>
                    <div className="col-12 col-lg-10">
                        <div className="row">
                            {products?.map(product => <ShopItem product={product}></ShopItem>)}
                        </div>

                    </div>

                </div>
            </div>

        </div>
    );
}

export default Home;
