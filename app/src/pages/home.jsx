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
                    <div className="col-2 h-100 bg-darkblue">
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />

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
