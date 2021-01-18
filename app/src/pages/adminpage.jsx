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
        <div className="grid grid-cols-12">
            <div className="col-span-2 border-radius px-0">
                <div className="bg-darkblue flex flex-col space-y-1 px-3 pt-1 pb-4">
                    <h5 className="mt-3 text-blue admin-panel-text pb-2 text-2xl">Admin panel</h5>
                    <button className="btn btn-admin p-1" onClick={() => setMenu('addproduct')}>Add products <RiAddCircleFill /></button>
                    <button className="btn btn-admin p-1" onClick={() => setMenu('viewproducts')}>View products <BsEyeFill /></button>
                    <button className="btn btn-admin p-1" onClick={() => setMenu('vieworders')}>View orders <BsEyeFill /></button>
                </div>

            </div>
            <div className="col-start-4 col-end-12">
                {currentMenu.addproduct === true ? <AdminAddProduct /> : ""}
                {currentMenu.viewproducts === true ? <AdminViewProducts /> : ""}
                {currentMenu.vieworders === true ? "OPENED VIEW ORDERS PAGE" : ""}
            </div>
        </div>
    );
}

export default AdminPage;
