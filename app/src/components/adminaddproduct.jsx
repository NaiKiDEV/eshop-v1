import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { IoClose } from 'react-icons/io5'
import CreatableSelect from 'react-select/creatable'
import makeAnimated from 'react-select/animated';
import { addProduct } from '../store/product/actions';

function AdminAddProduct() {

    const dispatch = useDispatch()
    const [currentImage, setCurrentImage] = useState("")

    const [data, setData] = useState({

        name: "Product name",
        price: 0,
        description: "Placeholder small description",
        fulldescription: "Here goes full description",
        categories: [],
        images: [
            "https://i.imgur.com/OSrvmi9.png"
        ],
        stock: 99
    });

    const options = [
        { value: 'keycaps', label: 'Keycaps' },
        { value: 'keyboards', label: 'Keyboards' },
        { value: 'accessories', label: 'Accessories' },
        { value: 'mice', label: 'Mice' },
        { value: 'webcams', label: 'Webcams' }
    ]

    const colourStyles = {
        control: styles => ({
            ...styles,
            backgroundColor: '#384967',
            margin: "0",
            padding: "0",
            border: "0",
            ':focus': {
                ...styles[':focus'],
                border: "0"
            },
        }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                border: "0",
                backgroundColor: "#384967",
                color: "#49C5B1",
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                ':active': {
                    ...styles[':active'],
                    backgroundColor: "#384967",
                    color: "#49C5B1"
                },
            };
        },
        input: styles => ({
            ...styles,
            backgroundColor: "#384967",
            color: ""
        }),
        placeholder: styles => ({ ...styles }),
        singleValue: (styles) => ({
            ...styles,
            backgroundColor: "#384967",
            ':active': {
                ...styles[':active'],
                backgroundColor: "#384967",
                color: "#49C5B1"
            },
        }),
    };

    function handleChange(e) {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    function handleImageAddClick() {
        setData({ ...data, images: [...data.images, currentImage] })
        setCurrentImage("")
    }

    function handleRemoveImage(index) {
        // console.log(index)
        var removedImage = data.images
        removedImage.splice(index, 1)
        console.log(removedImage)
        // console.log(removedImage)
        setData({ ...data, images: removedImage })
    }

    function handleSelectedItems(selected) {
        var items
        if (selected) {
            items = selected?.map(item => item.value)
        } else {
            items = []
        }

        setData({ ...data, categories: items })
    }

    function onSubmit() {
        dispatch(addProduct(data));
        setData({
            name: "Product name",
            price: 0,
            description: "Placeholder small description",
            fulldescription: "Here goes full description",
            categories: [],
            images: [
                "https://i.imgur.com/OSrvmi9.png"
            ],
            stock: 99
        })
    }
    console.log(data)

    return (
        <div className="flex justify-center items-center px-48">
            <div className="flex flex-col bg-darkblue rounded text-blue px-8">
                <div className="text-center mt-2 mb-3">
                    <h2 class="letter-shadow-green text-uppercase text-3xl">Add new product</h2>
                </div>
                <div className="">
                    {/* {user.requestcode != null ? (user.requestcode === 1 ?
                                                    <div className="alert alert-blue py-2 shadow">{user.message}</div> :
                                                    <div className="alert alert-red py-2 shadow">{user.message}</div>) : ""} */}
                </div>
                <div className="mb-4">
                    <div className="flex">
                        <div className="flex-grow">
                            <label htmlFor="name" className="letter-shadow-green"><h5>Name</h5></label>
                            <input className="form-control w-full shadow-sm mb-3" type="text" name="name" id="name"
                                autoComplete="off"
                                onChange={(e) => handleChange(e)}
                                value={data.name}
                            />

                        </div>
                        <div className="flex-none w-1/6 ml-4">
                            <label htmlFor="price" className="letter-shadow-green"><h5>Price</h5></label>
                            <input className="form-control w-full shadow-sm mb-3" type="text" name="price" id="price"
                                autoComplete="off"
                                onChange={(e) => handleChange(e)}
                                value={data.price}
                            />
                        </div>
                    </div>

                    <div className="flex">
                        <div className="flex-none w-2/6">
                            <label htmlFor="description" className="letter-shadow-green"><h5>Description</h5></label>
                            <textarea className="form-control w-full h-32 shadow-sm mb-3" type="text" name="description" id="description"
                                onChange={(e) => handleChange(e)}
                                value={data.description}
                            />
                        </div>
                        <div className="flex-grow ml-4">
                            <label htmlFor="fulldescription" className="letter-shadow-green"><h5>Full Description</h5></label>
                            <textarea className="form-control w-full h-32 shadow-sm mb-3" type="text" name="fulldescription" id="fulldescription"
                                onChange={(e) => handleChange(e)}
                                value={data.fulldescription}
                            />
                        </div>
                    </div>

                    <label htmlFor="images" className="letter-shadow-green"><h5>Images (Currently only links are supported)</h5></label>
                    <div className="flex">
                        <input className="form-control flex-grow shadow-sm me-2" placeholder="Paste link here..." type="text" name="images" id="images"
                            onChange={(e) => setCurrentImage(e.target.value)}
                            value={currentImage}
                        />
                        <button className="btn btn-transparent-blue text-blue flex-none w-10 flex justify-center items-center" onClick={() => handleImageAddClick()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    </div>

                    <div className="grid grid-cols-12 gap-4 my-3">
                        {data?.images.map((image, index) =>
                            <div className="col-span-3 admin-image-remove-container ">
                                <img src={image} alt="admin item" className="image-fit" ></img>
                                <div className="admin-image-remove flex justify-center items-center " onClick={() => handleRemoveImage(index)}>
                                    <IoClose className="admin-image-close" />
                                </div>
                            </div>)}
                    </div>

                    <div className="flex">
                        <div className="flex-grow">
                            <label htmlFor="categories" className="letter-shadow-green"><h5>Categories</h5></label>
                            <CreatableSelect
                                name="categories"
                                components={makeAnimated()}
                                isMulti
                                options={options}
                                onChange={(selected) => handleSelectedItems(selected)}
                                className="mb-3"
                                styles={colourStyles}
                            ></CreatableSelect>
                        </div>
                        <div className="flex-none w-1/6 ml-4">
                            <label htmlFor="stock" className="letter-shadow-green"><h5>Stock</h5></label>
                            <input className="form-control w-full shadow-sm" type="number" name="stock" id="stock"
                                onChange={(e) => handleChange(e)}
                                value={data.stock}
                            />
                        </div>
                    </div>
                </div>
                <div className="mb-4 flex justify-start">
                    <button className="btn btn-blue btn-register w-2/6 text-uppercase letter-shadow-sm shadow px-3 py-1" onClick={() => onSubmit()}>Add new product</button>
                </div>
            </div>
        </div>
    );
}

export default AdminAddProduct;
