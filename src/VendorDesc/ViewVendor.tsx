import React from "react";
import "./ViewVendor.css";
import { useLocation } from 'react-router-dom';

function VendorPage(state: any) {

    const location = useLocation();
    const Vdata = location.state
    console.log(Vdata);

    return (
        <div className="item-description">
            <div className="image-desc" >
                <div className="item-image">
                    <img src={Vdata.images[0].url} alt="Item Image" />
                </div>
                <div className="item-details">
                    <h1>{Vdata.storeName}</h1>
                    <p>{Vdata.description}  </p>
                </div>
            </div>
            <button className="edit-btn">Edit Vendor Details</button>
        </div>
    );
}

export default VendorPage;
