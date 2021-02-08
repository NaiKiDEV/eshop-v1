import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleProduct } from '../store/product/actions'
import { Link } from 'react-router-dom'

function SingleItem(props) {

    const item = useSelector(state => state.product.singleproduct)

    const [currentImage, setCurrentImage] = useState(item?.images[0])

    const productId = props.match.params.id

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSingleProduct(productId))
    }, [dispatch])

    useEffect(() => {
        setCurrentImage(item?.images[0])
    }, [item])

    console.log(item)
    return (
        <div className="flex-grow flex items-center justify-center">
            <div className="flex flex-col h-4/6 w-4/6 bg-darkblue rounded shadow-lg px-4">
                <div className="flex-none h-16 flex items-center justify-end">
                    <Link to="/">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 text-blue">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg> */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 text-blue">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </Link>

                </div>
                <div className="flex-grow">
                    <div className="grid grid-cols-12">
                        <div className="col-span-5">
                            <div className="px-6">
                                <img src={currentImage} alt="" className="image-adapt h-64 rounded" />
                            </div>
                            <div className="grid grid-cols-12 gap-4 px-12 py-4">
                                {item?.images.map(image =>
                                    <div class="col-span-3 cursor-pointer" onClick={() => setCurrentImage(image)}>
                                        <img src={image} className="image-display rounded"></img>
                                    </div>)}
                            </div>
                        </div>
                        <div className="col-span-6">
                            <h2 class="text-blue letter-shadow-sm text-3xl">{item?.name}</h2>
                            <h5 className="text-lightblue item-pricetag mb-0 text-xl">
                                <div className="flex justify-between">
                                    <div className="">
                                        {item?.discount > 0 ? <span>{item?.discount}€ <small className="text-strikethrough text-red">{item?.price}€</small></span> : item?.price + " €"}
                                    </div>
                                    <div className="pr-6">
                                        <span className="text-mutedblue letter-shadow-sm text-lg">STOCK:</span> <span className="">{item?.stock}</span>
                                    </div>
                                </div>
                            </h5>
                            {/* <h5 className="text-blue letter-shadow-sm text-lg mt-2">Categories:</h5> */}
                            <div className="flex mt-2 gap-2">
                                <span className="bg-lightblue text-lightblack px-3 py-1 rounded uppercase text-xs">Tags:</span>
                                {item?.categories.map(category => <span className="bg-mutedblue px-3 py-1 rounded uppercase text-white text-xs">{category}</span>)}
                            </div>
                            <h5 className="text-blue letter-shadow-sm text-lg mt-2">Description:</h5>
                            <h5 className="text-lightblue">{item?.fulldescription}</h5>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SingleItem
