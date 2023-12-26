import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../context/authContext';
import { Logout } from '../helper/helper';
import { toast } from 'react-toastify';  // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css';  // Import default toastify styles

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated } = useAuth();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = async () => {
        const success = await Logout();
        if (success) {
            toast.success('Logged out successfully!', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            // You can redirect the user or perform any other action if needed
        } else {
            // Handle logout failure if necessary
            toast.error('Failed to logout. Please try again.');
        }
    }

    return (
        <nav className={isOpen ? 'navbar-height ' : 'navbar '}>
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    ChatGPT
                </Link>
                <div className="menu-icon" onClick={toggleMenu}>
                    <i className={isOpen ? 'fas fa-times fa-2x' : 'fas fa-bars fa-2x'} />
                </div>
                <ul className={isOpen ? 'nav-menu active ' : 'nav-menu '}>
                    <li className="nav-item">
                        <Link to="/" className="nav-links" onClick={toggleMenu}>
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/chats" className="nav-links" onClick={toggleMenu}>
                            Chats
                        </Link>
                    </li>
                    {!isAuthenticated && (
                        <>
                            <li className="nav-item">
                                <Link to="/signup" className="nav-links" onClick={toggleMenu}>
                                    Signup
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-links" onClick={toggleMenu}>
                                    Login
                                </Link>
                            </li>
                        </>
                    )}
                    {isAuthenticated && (
                        <li className="nav-item">
                            <Link to="/logout" className="nav-links" onClick={handleLogout}>
                                Logout
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
