import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CropCard from '../components/CropCard';
import OfferCard from '../components/OfferCard';

function FarmerDashboard({ user }) {
    const [cropForm, setCropForm] = useState({ crop_name: '', quantity: '', price_per_unit: '', location: '' });
    const [crops, setCrops] = useState([]);
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        fetchCrops();
        fetchOffers();
    }, []);

    const fetchCrops = async () => {
        const res = await axios.get(`http://localhost:5000/crops/my-listings?farmer_id=${user.id}`);
        setCrops(res.data);
    };

    const fetchOffers = async () => {
        const res = await axios.get(`http://localhost:5000/offers/my-offers?user_id=${user.id}&user_type=farmer`);
        setOffers(res.data);
    };

    const handleAddCrop = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/crops/add', { ...cropForm, farmer_id: user.id });
        fetchCrops();
        setCropForm({ crop_name: '', quantity: '', price_per_unit: '', location: '' });
    };

    const handleOfferUpdate = async (offerId, status) => {
        await axios.put(`http://localhost:5000/offers/update/${offerId}`, { status });
        fetchOffers();
        fetchCrops();
    };

    return (
        <div className="dashboard">
            <h2>Farmer Dashboard</h2>
            <form onSubmit={handleAddCrop}>
                <input
                    placeholder="Crop Name"
                    value={cropForm.crop_name}
                    onChange={(e) => setCropForm({ ...cropForm, crop_name: e.target.value })}
                    required
                />
                <input
                    placeholder="Quantity (kg)"
                    value={cropForm.quantity}
                    onChange={(e) => setCropForm({ ...cropForm, quantity: e.target.value })}
                    required
                />
                <input
                    placeholder="Price per Unit ($)"
                    value={cropForm.price_per_unit}
                    onChange={(e) => setCropForm({ ...cropForm, price_per_unit: e.target.value })}
                    required
                />
                <input
                    placeholder="Location"
                    value={cropForm.location}
                    onChange={(e) => setCropForm({ ...cropForm, location: e.target.value })}
                    required
                />
                <button type="submit">Add Crop</button>
            </form>
            <h3>My Listings</h3>
            {crops.map((crop) => (
                <CropCard key={crop.id} crop={crop} />
            ))}
            <h3>Received Offers</h3>
            {offers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} handleOfferUpdate={handleOfferUpdate} />
            ))}
        </div>
    );
}

export default FarmerDashboard;