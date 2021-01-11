import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../store/product/actions';
import AdminShopItem from '../components/adminshopitem'
function Home() {

    const products = useSelector(state => state.product.products)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllProducts())
    }, [])

    console.log(products)

    return (
        <div>
            <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col-12 ">
                        <div className="row">
                            {products?.map(product => <AdminShopItem product={product}></AdminShopItem>)}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Home;
