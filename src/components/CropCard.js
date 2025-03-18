import React from 'react';
import '../styles/components.css';

function CropCard({ crop }) {
    return (
        <div className="card">
            <h4>{crop.crop_name}</h4>
            <p>Quantity: {crop.quantity} kg</p>
            <p>Price: ${crop.price_per_unit}/kg</p>
            <p>Location: {crop.location}</p>
            <p>Status: {crop.status}</p>
        </div>
    );
}

export default CropCard;