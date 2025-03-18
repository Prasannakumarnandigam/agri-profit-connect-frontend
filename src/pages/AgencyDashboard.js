import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CropCard from '../components/CropCard';
import OfferCard from '../components/OfferCard';

function AgencyDashboard({ user }) {
    const [crops, setCrops] = useState([]);
    const [offers, setOffers] = useState([]);
    const [offerForm, setOfferForm] = useState({ crop_id: '', offered_price: '' });

    useEffect(() => {
        fetchCrops();
        fetchOffers();
    }, []);

    const fetchCrops = async () => {
        const res = await axios.get('http://localhost:5000/crops/all');
        setCrops(res.data);
    };

    const fetchOffers = async () => {
        const res = await axios.get(`http://localhost:5000/offers/my-offers?user_id=${user.id}&user_type=agency`);
        setOffers(res.data);
    };

    const handleMakeOffer = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/offers/make', { ...offerForm, agency_id: user.id });
        fetchOffers();
        setOfferForm({ crop_id: '', offered_price: '' });
    };

    return (
        <div className="dashboard">
            <h2>Agency Dashboard</h2>
            <h3>Available Crops</h3>
            {crops.map((crop) => (
                <div key={crop.id}>
                    <CropCard crop={crop} />
                    <form onSubmit={handleMakeOffer}>
                        <input
                            type="hidden"
                            value={crop.id}
                            onChange={(e) => setOfferForm({ ...offerForm, crop_id: e.target.value })}
                        />
                        <input
                            placeholder="Your Offer ($)"
                            value={offerForm.offered_price}
                            onChange={(e) => setOfferForm({ ...offerForm, offered_price: e.target.value, crop_id: crop.id })}
                            required
                        />
                        <button type="submit">Make Offer</button>
                    </form>
                </div>
            ))}
            <h3>My Offers</h3>
            {offers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
            ))}
        </div>
    );
}

export default AgencyDashboard;