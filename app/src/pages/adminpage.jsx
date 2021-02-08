import React, { useState } from 'react';
import AdminAddProduct from '../components/adminaddproduct'
import AdminViewProducts from '../components/adminviewproducts'
import { RiAddCircleFill } from 'react-icons/ri'
import { BsEyeFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'

function AdminPage() {

    const productAdminAction = useSelector(state => state.product.productAdminAction)

    const [currentMenu, setCurrentMenu] =
        useState(
            {
                addproduct: false,
                viewproducts: false,
                vieworders: false,
            })

    function setMenu(menuname) {
        var tempstate = currentMenu;
        for (var key in currentMenu) {
            tempstate = { ...tempstate, [key]: false }
        }
        setCurrentMenu({ ...tempstate, [menuname]: true })
    }

    console.log(currentMenu)
    function showAdminMenu() {
        if (currentMenu.addproduct === true) {
            return <AdminAddProduct />
        } else if (currentMenu.viewproducts === true) {
            return <AdminViewProducts />
        } else if (currentMenu.vieworders === true) {
            return <h5 className="text-white text-5xl">OPENED VIEW ORDERS PAGE</h5>
        } else {
            return <h5 className="text-white text-5xl text-center">Select action from the admin panel!<br />{"<--"}</h5>
        }
    }
    return (
        <div className="grid grid-cols-12 flex-grow h-5/6 gap-4">
            <div className="col-span-2 border-radius px-0">
                <div className="bg-darkblue flex flex-col h-full space-y-1 px-3 pt-1 pb-4">
                    <h5 className="mt-3 text-blue admin-panel-text pb-2 text-2xl">Admin panel</h5>
                    {
                        productAdminAction?.productCode === 0 ?
                            <div className="alert alert-red p-2 text-center rounded shadow-sm">{productAdminAction.productMessage}</div> :
                            productAdminAction?.productCode === 1 ?
                                <div className="alert alert-blue p-2 text-center rounded shadow-sm">{productAdminAction.productMessage}</div> :
                                ""
                    }
                    <button className="btn btn-admin p-1" onClick={() => setMenu('addproduct')}>Add products
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button className="btn btn-admin p-1" onClick={() => setMenu('viewproducts')}>Manage products
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button className="btn btn-admin p-1" onClick={() => setMenu('vieworders')}>View orders
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>

            </div>
            <div className="col-span-10 overflow-y-scroll py-4 pr-4 flex items-center justify-center">
                {showAdminMenu()}
            </div>
        </div>
    );
}

export default AdminPage;
