import React from 'react';
import './Vehicles.css'
import { Link } from 'react-router-dom';


const Vehicles = ({ vehicle }) => {
    return (
        <div className="col-md-3 col-sm-12 p-3 mt-5">
            <Link to={`/destination/${vehicle.id}`}>
            <div className="vehicles-container p-3">
                <img className='w-100' src={vehicle.img} alt="" />
                <h3 className="text-center text-dark text-mod mt-3">{vehicle.name}</h3>
            </div>
            </Link>
        </div>
    );
};

export default Vehicles;