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
        <div className="grid grid-cols-12 grid-flow-col h-5/6 gap-4 flex-grow">
            <div className="hidden lg:block col-span-2 bg-darkblue p-4">
                <h4 className="text-blue mb-3">Filter items</h4>
                <h6 className="text-blue">Search:</h6>
                <input className="w-full form-control mb-2 py-1 px-1" type="text"></input>
                <h6 className="text-blue">Tags:</h6>
                <div className="flex flex-row flex-wrap">
                    <div className="w-min mr-2 mt-2 px-2 py-1 text-xs flex items-center text-center rounded-xl badge-blue">New</div>
                    <div className="w-min mr-2 mt-2 px-2 py-1 text-xs flex items-center text-center rounded-xl badge-red">Discount</div>
                    <div className="w-min mr-2 mt-2 px-2 py-1 text-xs flex items-center text-center rounded-xl badge-green">PROMO</div>
                </div>

                <h6 className="text-blue mt-2">Price:</h6>
            </div>
            {/* <Scrollbar
                contentProps={{
                    renderer: props => {
                        const { elementRef, ...restProps } = props;
                        return <span {...restProps} ref={elementRef} style={{ "padding-right": "1rem" }} className="grid grid-cols-5 grid-flow-row mt-3 gap-4" />;
                    }
                }}

                className="col-span-10 mb-5">
                {products?.map(product => <ShopItem product={product}></ShopItem>)}
            </Scrollbar> */}
            <div className="col-span-10 col-start-2 lg:col-start-3 overflow-y-scroll">
                <div className="grid grid-cols-2 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 grid-flow-row gap-4 pr-4 mt-3 mb-5">
                    {products?.map(product => <ShopItem key={product._id} product={product}></ShopItem>)}
                </div>
            </div>
        </div>
    );
}

export default Home;
