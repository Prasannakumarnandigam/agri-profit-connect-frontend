import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components.css';

function Navbar({ user, setUser }) {
    const handleLogout = () => setUser(null);

    return (
        <nav className="navbar">
            <Link to="/">Agri Profit Connect</Link>
            <div>
                {user ? (
                    <>
                        <Link to={user.user_type === 'farmer' ? '/farmer-dashboard' : '/agency-dashboard'}>
                            Dashboard
                        </Link>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;