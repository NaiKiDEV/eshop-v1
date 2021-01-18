import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../store/product/actions';
import ShopItem from '../components/shopitem'
// import ScrollArea from 'react-scrollbar'
import Scrollbar from 'react-scrollbars-custom'
function Home() {

    const products = useSelector(state => state.product.products)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllProducts())
    }, [dispatch])

    // console.log(products)

    return (
        <div className="grid grid-cols-12 grid-flow-col h-full gap-4">
            <div className="col-span-2 bg-darkblue p-4">
                <h4 className="text-blue mb-3">Filter items</h4>
                <h6 className="text-blue">Search:</h6>
                <input className="form-control mb-2 py-1 px-1" type="text"></input>
                <h6 className="text-blue">Tags:</h6>
                <div className="flex flex-row space-x-2">
                    <div className="w-min px-2 py-1 text-xs flex items-center text-center rounded-xl badge-blue">New</div>
                    <div className="w-min px-2 py-1 text-xs flex items-center text-center rounded-xl badge-red">Discount</div>
                    <div className="w-min px-2 py-1 text-xs flex items-center text-center rounded-xl badge-green">PROMO</div>
                </div>

                <h6 className="text-blue mt-2">Price:</h6>
            </div>
            <Scrollbar
                contentProps={{
                    renderer: props => {
                        const { elementRef, ...restProps } = props;
                        return <span {...restProps} ref={elementRef} style={{ "padding-right": "1rem" }} className="grid grid-cols-5 grid-flow-row mt-3 gap-4" />;
                    }
                }}

                className="col-span-10 mb-5">
                {products?.map(product => <ShopItem product={product}></ShopItem>)}
            </Scrollbar>
        </div>
    );
}

export default Home;
