import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../store/product/actions';
import AdminShopItem from '../components/adminshopitem'
function Home() {

    const products = useSelector(state => state.product.products)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllProducts())
    }, [dispatch])

    console.log(products)

    return (
        <div className="grid grid-cols-12 grid-flow-row gap-4 self-start">
            {products?.map(product => <AdminShopItem product={product}></AdminShopItem>)}
        </div>
    );
}

export default Home;
