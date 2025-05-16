import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    const id = useSelector((state) => state.user.id);

    return (
        <nav className="Navbar w100pc">
            <div className="nav frow fjcsb">
                <button 
                    onClick={() => id && navigate(`/`)} 
                    className="btn pm cy b w100pc mxs bcd" 
                    disabled={!id}
                >
                    HOST MY GAME
                </button>
                <button 
                    onClick={() => navigate("/user")} 
                    className="btn pm clst b w100pc mxs bcd"
                >
                    PROFILE
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
