import React from 'react';
import GoogleMapReact from 'google-map-react';

const GoogleMap = () => {
    const location = {
        address: 'Stockholm, Sweden',
        lat: 59.334591,
        lng: 18.063240,
    }
    return (
        <div style={{ height: '70vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyDUNxhqkILD9IOW7WszAdRpGbIRNVt-xSY" }}
                defaultCenter={location}
                defaultZoom={10}
            >
            </GoogleMapReact>
        </div>
    );
};

export default GoogleMap;