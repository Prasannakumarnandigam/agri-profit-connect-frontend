import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="home">
            <h1>Agri Profit Connect</h1>
            <p>Connecting Farmers and Agencies Directly</p>
            <Link to="/login"><button>Login</button></Link>
            <Link to="/register"><button>Register</button></Link>
        </div>
    );
}

export default Home;