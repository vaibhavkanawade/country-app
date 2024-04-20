import React, { useState } from "react";
import "./Countrylist.css"

const Countrylist = ({ country }) => {
    const [clicked, setClicked] = useState(false);

    const handlelist = () => {
        setClicked(!clicked);

    }

    return (
        <div>
            <button id="listbutton" onClick={handlelist}>Country List</button>
            <div id="listmodel" style={{ visibility: clicked ? "visible" : "hidden" }}>
                <p id="note">Only copy name and paste to input bar</p>
                {
                    country.map((data) => {
                        return (
                            <div id="nameofcountrydiv" key={data.id}>
                                <p id="nameofcountry">{data.name}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Countrylist;
