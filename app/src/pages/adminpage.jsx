import React, { useState } from 'react';
import AdminAddProduct from '../components/adminaddproduct'
import AdminViewProducts from '../components/adminviewproducts'
import { RiAddCircleFill } from 'react-icons/ri'
import { BsEyeFill } from 'react-icons/bs'

function AdminPage() {

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

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-2 border-radius px-0">
                    <div className="bg-darkblue w-100 px-3 pt-1 pb-4">
                        <h5 className="mt-3 text-blue admin-panel-text pb-2">Admin panel</h5>
                        <button className="btn btn-admin" onClick={() => setMenu('addproduct')}>Add products <RiAddCircleFill /></button>
                        <button className="btn btn-admin" onClick={() => setMenu('viewproducts')}>View products <BsEyeFill /></button>
                        <button className="btn btn-admin" onClick={() => setMenu('vieworders')}>View orders <BsEyeFill /></button>
                    </div>

                </div>
                <div className="col-10">
                    {currentMenu.addproduct === true ? <AdminAddProduct /> : ""}
                    {currentMenu.viewproducts === true ? <AdminViewProducts /> : ""}
                    {currentMenu.vieworders === true ? "OPENED VIEW ORDERS PAGE" : ""}
                </div>
            </div>
        </div>
    );
}

export default AdminPage;
