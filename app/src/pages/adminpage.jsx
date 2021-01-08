import React, { useState } from 'react';
import AdminAddProduct from '../components/adminaddproduct'
import { RiAddCircleFill } from 'react-icons/ri'
import { BsEyeFill } from 'react-icons/bs'

function AdminPage() {

    const [currentMenu, setCurrentMenu] =
        useState(
            {
                addproduct: false,
                vieworders: false
            })

    function setMenu(menuname) {
        var tempstate = currentMenu;
        for (var key in currentMenu) {
            tempstate = { ...tempstate, [key]: false }
        }
        if (menuname === "addproduct") {
            tempstate = { ...tempstate, addproduct: true }
        } else if (menuname === "vieworders") {
            tempstate = { ...tempstate, vieworders: true }
        }
        setCurrentMenu(tempstate)
    }

    console.log(currentMenu)

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-2 bg-darkblue border-radius">
                    <h5 className="mt-3 text-blue admin-panel-text pb-2">Admin panel</h5>
                    <button className="btn btn-admin" onClick={() => setMenu('addproduct')}>Add products <RiAddCircleFill /></button>
                    <button className="btn btn-admin" onClick={() => setMenu('vieworders')}>View orders <BsEyeFill /></button>
                </div>
                <div className="col-10">
                    {currentMenu.addproduct === true ? <AdminAddProduct /> : ""}
                    {currentMenu.vieworders === true ? "OPENED VIEW ORDERS PAGE" : ""}
                </div>
            </div>
        </div>
    );
}

export default AdminPage;
