import React from 'react'

export default function Footer() {
    return (
        <div className="flex-none flex justify-evenly h-12 items-center bg-mutedblue">
            <div className="flex flex-col items-center justify-center">
                <button className="text-xs text-white">Apply for a job</button>
                <button className="text-xs text-white">Report a problem</button>
            </div>
            <h5 className="text-xs text-white">Website's content distribution without author's permission is not allowed. All rights reserved &copy; 2021.</h5>
            <div className="flex flex-col items-center justify-center">
                <h5 className="text-xs text-white ml-2">Customer support: </h5>
                <h5 className="text-xs text-white ml-2">shop@gmail.com</h5>
            </div>
        </div>
    )
}
