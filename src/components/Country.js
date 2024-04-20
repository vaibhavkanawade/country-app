import { useCallback, useMemo, useState, useEffect } from "react";
import "./country.css";
import "./singlecountry.css";
import Pagination from "./pagination";
import Countrylist from "./Countrylist";
const Country = () => {
    const [country, setcountry] = useState([]);
    const [loading, setloading] = useState(false);
    const [currentpage, setcurrentpage] = useState(1);
    const [postperpage] = useState(20);
    const [inputcountry, setinputcountry] = useState({ name: "" });
    const [newname, setnewname] = useState([{
        name: "india",
        capital: "",
        region: "",
        subregion: "",
        population: "",
        demonym: "",
        currencies: [{ name: "" }]
    }]);

    // Fetching the country data from API 
    const getcountries = async () => {
        setloading(true);
        const res = await fetch("https://codejudge-question-artifacts-dev.s3.amazonaws.com/q-1709/data.json");
        const data = await res.json();
        setcountry(data);
        setloading(false);

    };

    useEffect(() => {
        getcountries();
    }, []);

    // Calculating current page and data for pagination
    const indexoflastpage = currentpage * postperpage;
    const indexoffirstpost = indexoflastpage - postperpage;

    // Memoize the current post calculation to avoid recalculation on every render
    const currentpost = useMemo(() => {
        return country.slice(indexoffirstpost, indexoflastpage);
    }, [country, indexoffirstpost, indexoflastpage]);

    const paginate = (pagenumber) => setcurrentpage(pagenumber);

    // Sorting countries
    const handleSortMethod = useCallback((event) => {
        const result = event.target.value;
        let sortedCountry = [...country]; // Create a copy of the country array

        if (result === "low") {
            sortedCountry.sort((a, b) => a.population - b.population);
        } else if (result === "high") {
            sortedCountry.sort((a, b) => b.population - a.population);
        }

        setcountry(sortedCountry); // Update the state with sorted array
    }, [country]);

    // Filtering countries
    const handleFilterMethod = useCallback((event) => {
        const result = event.target.value;
        let filteredCountry = [...country]; // Create a copy of the country array

        if (result === "AtoZ") {
            filteredCountry.sort((a, b) => a.name.localeCompare(b.name));
        } else if (result === "ZtoA") {
            filteredCountry.sort((a, b) => b.name.localeCompare(a.name));
        }

        setcountry(filteredCountry); // Update the state with filtered array
    }, [country]);

    // Handling change and submit for input country
    const handleChange = (event) => {
        const { name, value } = event.target;
        setinputcountry((prev) => ({ ...prev, [name]: value }));

    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newCountryName = inputcountry.name.toLowerCase();

        // Find country by name
        const foundCountry = country.find(obj => obj.name.toLowerCase() === newCountryName);

        if (!foundCountry) {
            alert("Invalid country name. Find country from the country list button.");
        } else {
            setnewname([foundCountry]);
            document.getElementById("model").style.visibility = "visible";
            // Hide the country list modal
            document.getElementById("listmodel").style.visibility = "hidden";
        }
    };

    const handleClose = () => {
        document.getElementById("model").style.visibility = "hidden";
    };

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>
            <div id="container">
                {/* Upper navbar */}
                <div id="searchbar">
                    <Countrylist country={country} />
                    <form onSubmit={handleSubmit} id="searchform">
                        <input
                            type="text"
                            onChange={handleChange}
                            value={inputcountry.name}
                            name="name"
                            id="search-input"
                            placeholder="Enter Country"
                        />
                        <button id="search-btn" type="submit">Search</button>
                    </form>
                    {/* Sorting method by population */}
                    <select id="selectsort" onChange={handleSortMethod}>
                        <option value="">Sort Population</option>
                        <option value="low">Low to High</option>
                        <option value="high">High to Low</option>
                    </select>
                    {/* Filter method for name */}
                    <select id="selectfilter" onChange={handleFilterMethod}>
                        <option value="">Filter</option>
                        <option value="AtoZ">A to Z</option>
                        <option value="ZtoA">Z to A</option>
                    </select>
                </div>

                {/* Country display */}
                <div id="countrydisplay">
                    {currentpost.map((data) => (
                        <div id="country-card" key={data.id}>
                            <img alt="country" id="countryflag" src={data.flag} />
                            <h5 id="countryname">{data.name}</h5>
                            <p id="capital">Capital: {data.capital}</p>
                            <p id="population">Population: {data.population}</p>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <Pagination postperpage={postperpage} totalpost={country.length} paginate={paginate} />
            </div>

            {/* Pop-up model */}
            <div id="model">
                <div id="close" onClick={handleClose}>Close</div>
                <div id="upperdiv">
                    <h1>{newname[0].name}</h1>
                </div>
                <div id="middlediv">
                    <div id="modelflag">
                        <img src={newname[0].flag} width="100%" height="100%" alt="flag" />
                    </div>
                    <div id="modelmap">
                        <iframe
                            src={`https://maps.google.com/maps?q=${newname[0].name}&t=&z=5&ie=UTF8&iwloc=&output=embed`}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            aria-hidden="false"
                            tabIndex="0"
                            title="country"
                        />
                    </div>
                </div>
                <div id="lowerdiv">
                    <div className="infocard" id="info1">
                        <h6>Capital</h6>
                        <h6>{newname[0].capital}</h6>
                    </div>
                    <div className="infocard" id="info2">
                        <h6>Region</h6>
                        <h6>{newname[0].region}</h6>
                    </div>
                    <div className="infocard" id="info3">
                        <h6>Subregion</h6>
                        <h6>{newname[0].subregion}</h6>
                    </div>
                    <div className="infocard" id="info4">
                        <h6>Population</h6>
                        <h6>{newname[0].population}</h6>
                    </div>
                    <div className="infocard" id="info5">
                        <h6>Demonym</h6>
                        <h6>{newname[0].demonym}</h6>
                    </div>
                    <div className="infocard" id="info6">
                        <h6>Currency</h6>
                        <h6>{newname[0].currencies[0].name}</h6>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Country;







// import { useCallback, useMemo, useState, useEffect } from "react";
// import "./country.css";
// import "./singlecountry.css";
// import Pagination from "./pagination";
// import Countrylist from "./Countrylist";

// const Country = () => {
//     const [country, setCountry] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [postsPerPage] = useState(20);
//     const [inputCountry, setInputCountry] = useState({ name: "" });
//     const [selectedCountry, setSelectedCountry] = useState(null);
//     const [modelVisible, setModelVisible] = useState(false);
//     const [listModelVisible, setListModelVisible] = useState(false);

//     // Fetching the country data from API
//     const getCountries = async () => {
//         setLoading(true);
//         const res = await fetch("https://codejudge-question-artifacts-dev.s3.amazonaws.com/q-1709/data.json");
//         const data = await res.json();
//         setCountry(data);
//         setLoading(false);
//     };

//     useEffect(() => {
//         getCountries();
//     }, []);

//     // Calculating current page and data for pagination
//     const indexOfLastPost = currentPage * postsPerPage;
//     const indexOfFirstPost = indexOfLastPost - postsPerPage;

//     // Memoize the current post calculation to avoid recalculation on every render
//     const currentPosts = useMemo(() => {
//         return country.slice(indexOfFirstPost, indexOfLastPost);
//     }, [country, indexOfFirstPost, indexOfLastPost]);

//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     // Sorting countries
//     const handleSortMethod = useCallback((event) => {
//         const result = event.target.value;
//         let sortedCountry = [...country]; // Create a copy of the country array

//         if (result === "low") {
//             sortedCountry.sort((a, b) => a.population - b.population);
//         } else if (result === "high") {
//             sortedCountry.sort((a, b) => b.population - a.population);
//         }

//         setCountry(sortedCountry); // Update the state with sorted array
//     }, [country]);

//     // Filtering countries
//     const handleFilterMethod = useCallback((event) => {
//         const result = event.target.value;
//         let filteredCountry = [...country]; // Create a copy of the country array

//         if (result === "AtoZ") {
//             filteredCountry.sort((a, b) => a.name.localeCompare(b.name));
//         } else if (result === "ZtoA") {
//             filteredCountry.sort((a, b) => b.name.localeCompare(a.name));
//         }

//         setCountry(filteredCountry); // Update the state with filtered array
//     }, [country]);

//     // Handling change and submit for input country
//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setInputCountry((prev) => ({ ...prev, [name]: value }));

//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         const newCountryName = inputCountry.name.toLowerCase();

//         // Find country by name
//         const foundCountry = country.find(obj => obj.name.toLowerCase() === newCountryName);

//         if (!foundCountry) {
//             alert("Invalid country name. Find country from the country list button.");
//         } else {
//             setSelectedCountry(foundCountry);
//             setModelVisible(true);
//             setListModelVisible(false);
//             setInputCountry({ name: "" });
//         }
//     };


//     const handleClose = () => {
//         setSelectedCountry(null);
//         setModelVisible(false);
//     };

//     const handleListModelToggle = () => {
//         setListModelVisible(!listModelVisible);
//         setModelVisible(false);
//     };

//     if (loading) {
//         return <h2>Loading...</h2>;
//     }

//     return (
//         <div>
//             <div id="container">
//                 {/* Upper navbar */}
//                 <div id="searchbar">
//                     <Countrylist country={country} toggleListModel={handleListModelToggle} />
//                     <form onSubmit={handleSubmit} id="searchform">
//                         <input
//                             type="text"
//                             onChange={handleChange}
//                             value={inputCountry.name}
//                             name="name"
//                             id="search-input"
//                             placeholder="Enter Country"
//                         />
//                         <button id="search-btn" type="submit">Search</button>
//                     </form>
//                     {/* Sorting method by population */}
//                     <select id="selectsort" onChange={handleSortMethod}>
//                         <option value="">Sort Population</option>
//                         <option value="low">Low to High</option>
//                         <option value="high">High to Low</option>
//                     </select>
//                     {/* Filter method for name */}
//                     <select id="selectfilter" onChange={handleFilterMethod}>
//                         <option value="">Filter</option>
//                         <option value="AtoZ">A to Z</option>
//                         <option value="ZtoA">Z to A</option>
//                     </select>
//                 </div>

//                 {/* Country display */}
//                 <div id="countrydisplay">
//                     {currentPosts.map((data) => (
//                         <div id="country-card" key={data.id}>
//                             <img alt="country" id="countryflag" src={data.flag} />
//                             <h5 id="countryname">{data.name}</h5>
//                             <p id="capital">Capital: {data.capital}</p>
//                             <p id="population">Population: {data.population}</p>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Pagination */}
//                 <Pagination postperpage={postsPerPage} totalpost={country.length} paginate={paginate} />
//             </div>

//             {/* Pop-up model */}
//             {selectedCountry && (
//                 <div id="model" style={{ visibility: modelVisible ? "visible" : "hidden" }}>
//                     <div id="close" onClick={handleClose}>Close</div>
//                     <div id="upperdiv">
//                         <h1>{selectedCountry.name}</h1>
//                     </div>
//                     <div id="middlediv">
//                         <div id="modelflag">
//                             <img src={selectedCountry.flag} width="100%" height="100%" alt="flag" />
//                         </div>
//                         <div id="modelmap">
//                             <iframe
//                                 src={`https://maps.google.com/maps?q=${selectedCountry.name}&t=&z=5&ie=UTF8&iwloc=&output=embed`}
//                                 width="100%"
//                                 height="100%"
//                                 style={{ border: 0 }}
//                                 allowFullScreen=""
//                                 aria-hidden="false"
//                                 tabIndex="0"
//                                 title="country"
//                             />
//                         </div>
//                     </div>
//                     <div id="lowerdiv">
//                         <div className="infocard" id="info1">
//                             <h6>Capital</h6>
//                             <h6>{selectedCountry.capital}</h6>
//                         </div>
//                         <div className="infocard" id="info2">
//                             <h6>Region</h6>
//                             <h6>{selectedCountry.region}</h6>
//                         </div>
//                         <div className="infocard" id="info3">
//                             <h6>Subregion</h6>
//                             <h6>{selectedCountry.subregion}</h6>
//                         </div>
//                         <div className="infocard" id="info4">
//                             <h6>Population</h6>
//                             <h6>{selectedCountry.population}</h6>
//                         </div>
//                         <div className="infocard" id="info5">
//                             <h6>Demonym</h6>
//                             <h6>{selectedCountry.demonym}</h6>
//                         </div>
//                         <div className="infocard" id="info6">
//                             <h6>Currency</h6>
//                             <h6>{selectedCountry.currencies[0].name}</h6>
//                         </div>
//                     </div>

//                 </div>
//             )}


//         </div>
//     );
// };

// export default Country;







