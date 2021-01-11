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
        console.log(index)
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
        <div className="">
            <div className="d-flex justify-content-center align-items-center">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="card shadow-lg">
                                <div className="card-body">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-12 text-center mt-2 mb-3">
                                                <h2 class="letter-shadow-green text-uppercase">Add new product</h2>
                                            </div>
                                            <div className="col-12">
                                                {/* {user.requestcode != null ? (user.requestcode === 1 ?
                                                    <div className="alert alert-blue py-2 shadow">{user.message}</div> :
                                                    <div className="alert alert-red py-2 shadow">{user.message}</div>) : ""} */}
                                            </div>
                                            <div className="col-12 mb-4">
                                                <label htmlFor="name" className="letter-shadow-green"><h5>Name</h5></label>
                                                <input className="form-control shadow-sm mb-3" type="text" name="name" id="name"
                                                    autoComplete="off"
                                                    onChange={(e) => handleChange(e)}
                                                    value={data.name}
                                                />
                                                <label htmlFor="price" className="letter-shadow-green"><h5>Price</h5></label>
                                                <input className="form-control shadow-sm mb-3" type="text" name="price" id="price"
                                                    autoComplete="off"
                                                    onChange={(e) => handleChange(e)}
                                                    value={data.price}
                                                />
                                                <label htmlFor="description" className="letter-shadow-green"><h5>Description</h5></label>
                                                <textarea className="form-control shadow-sm mb-3" type="text" name="description" id="description"
                                                    onChange={(e) => handleChange(e)}
                                                    value={data.description}
                                                />
                                                <label htmlFor="fulldescription" className="letter-shadow-green"><h5>Full Description</h5></label>
                                                <textarea className="form-control shadow-sm mb-3" type="text" name="fulldescription" id="fulldescription"
                                                    onChange={(e) => handleChange(e)}
                                                    value={data.fulldescription}
                                                />
                                                <label htmlFor="images" className="letter-shadow-green"><h5>Images</h5></label>
                                                <div className="d-flex">
                                                    <input className="form-control shadow-sm me-2" type="text" name="images" id="images"
                                                        onChange={(e) => setCurrentImage(e.target.value)}
                                                        value={currentImage}
                                                    />
                                                    <button className="btn btn-blue w-10" onClick={() => handleImageAddClick()}>+</button>
                                                </div>

                                                <div className="container-fluid">
                                                    <div className="row mt-3">
                                                        {data?.images.map((image, index) =>
                                                            <div className="col-3 admin-image-remove-container ps-0 pe-2 mb-2">
                                                                <img src={image} className="image-fit " ></img>
                                                                <div className="admin-image-remove d-flex justify-content-center align-items-center" onClick={() => handleRemoveImage(index)}>
                                                                    <IoClose className="admin-image-close" />
                                                                </div>
                                                            </div>)}
                                                    </div>
                                                </div>

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

                                                <label htmlFor="stock" className="letter-shadow-green"><h5>Stock</h5></label>
                                                <input className="form-control shadow-sm mb-1" type="number" name="stock" id="stock"
                                                    onChange={(e) => handleChange(e)}
                                                    value={data.stock}
                                                />
                                            </div>
                                            <div className="col-6 offset-6 mb-4 d-flex justify-content-center">
                                                <button className="btn btn-blue btn-register text-uppercase letter-shadow-sm shadow me-3" onClick={() => onSubmit()}>Add new product</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default AdminAddProduct;
