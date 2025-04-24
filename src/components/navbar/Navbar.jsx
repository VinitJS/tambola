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
                    className="btn pm cr b w100pc mxs" 
                    disabled={!id}
                >
                    {id ? "Host My Game" : "No Game Available"}
                </button>
                <button 
                    onClick={() => navigate("/user")} 
                    className="btn pm cb b w100pc mxs"
                >
                    Change Name
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
