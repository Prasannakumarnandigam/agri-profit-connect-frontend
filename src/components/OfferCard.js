import React from 'react';
import '../styles/components.css';

function OfferCard({ offer, handleOfferUpdate }) {
    return (
        <div className="card">
            <h4>{offer.crop_name}</h4>
            <p>Offered Price: ${offer.offered_price}</p>
            <p>Status: {offer.status}</p>
            {offer.status === 'pending' && handleOfferUpdate && (
                <>
                    <button onClick={() => handleOfferUpdate(offer.id, 'accepted')}>Accept</button>
                    <button onClick={() => handleOfferUpdate(offer.id, 'rejected')}>Reject</button>
                </>
            )}
        </div>
    );
}

export default OfferCard;