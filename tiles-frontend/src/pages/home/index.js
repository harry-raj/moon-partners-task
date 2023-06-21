// Tiles
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useDebouncedEffect from 'use-debounced-effect';

import img from '../../data/img.json';

const Home = () => {
    const [tiles, setTiles] = useState([]);
    const [tilesData, setTilesData] = useState([]);

    const [filterValues, setFilterValues] = useState({
        material: '',
        color: '',
        price: '',
    });

    useDebouncedEffect(() => {
        fetchFilteredTiles();
    }, 1000, [filterValues?.name]);

    useEffect(() => {
        fetchFilteredTiles();
    }, [filterValues]);

    useEffect(() => {
        fetchTilesData();
    }, []);

    const fetchTilesData = async () => {
        const { data } = await axios.get(process.env.REACT_APP_API_BASE_URL);
        setTiles(data?.results);
        setTilesData(data?.results);
    }

    const fetchFilteredTiles = async () => {
        const { data } = await axios.get(process.env.REACT_APP_API_BASE_URL, { params: filterValues });
        setTilesData(data?.results);
    };

    const handle = {
        change: (e) => {
            const { name, value } = e?.target;
            setFilterValues({ ...filterValues, [name]: value });
        },
    }

    const uniqueMaterial = [...new Set(tiles.map(item => item?.material))];
    const uniqueColor = [...new Set(tiles.map(item => item?.color))];
    const uniquePrice = [...new Set(tiles.map(item => item?.price))];

    return (
        <>
            {/* ---------------filter section---------------------- */}
            <div className="container py-4">
                <div className="filter-section">
                    <div className="row">
                        <div className="col-md-12 mb-4">
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search tiles by name.."
                                    name="search"
                                    onChange={handle.change}
                                />
                            </div>

                        </div>

                        <div className="col-md-2">
                            <div className="form-group">
                                <label htmlFor="">Material</label>
                                <select value={filterValues?.material || ''} name="material" onChange={handle.change} className="form-control">
                                    <option value="" selected>Select</option>
                                    {
                                        uniqueMaterial.map((item) => (
                                            <option value={item} key={item}>{item}</option>
                                        ))
                                    }
                                </select>
                            </div>

                        </div>
                        <div className="col-md-2">
                            <div className="form-group">
                                <label htmlFor="">Color</label>
                                <select value={filterValues?.color || ''} name="color" onChange={handle.change} className="form-control">
                                    <option value="" selected>Select</option>
                                    {
                                        uniqueColor.map((item) => (
                                            <option value={item} key={item}>{item}</option>
                                        ))
                                    }
                                </select>
                            </div>

                        </div>
                        <div className="col-md-2">
                            <div className="form-group">
                                <label htmlFor="">Price</label>
                                <select value={filterValues?.price || ''} name="price" onChange={handle.change} className="form-control">
                                    <option value="" selected>Select</option>
                                    {
                                        uniquePrice.map((item) => (
                                            <option value={item} key={item}>{item}</option>
                                        ))
                                    }
                                </select>
                            </div>

                        </div>

                        <div className="col">
                            <div className="btn btn-primary my-4" onClick={() => setFilterValues({})}>
                                <span>Reset</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div >

            {/* ------------------ Tiles section ------------------- */}
            <div className="container">
                <div className="row gy-4">
                    {
                        tilesData?.length > 0 ?
                            tilesData?.map((item, index) => (
                                <div className="col-xl-3 col-lg-4 col-md-6 col-12" key={item?.id}>
                                    <div className="product-box">
                                        {img?.[index % img?.length] && (
                                            <img className="tiles-image" src={img?.[index % img?.length]?.image_link} alt={item?.name} />
                                        )}
                                        <ul>
                                            <li>Name: {item?.name}</li>
                                            <li>Material: {item?.material}</li>
                                            <li>Color: {item?.color}</li>
                                            <li>Price: {item?.price}</li>
                                        </ul>
                                    </div>
                                </div>
                            ))
                            :
                            <p>No Data Found.</p>
                    }
                </div>
            </div>
        </>
    )
}

export default Home;
