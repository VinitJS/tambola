import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';
import { connect } from 'react-redux';

const Navbar = ({ gameId }) => {

    return (
        <div className="Navbar w100pc">
            <div className="nav frow fjcsb">
                <Link to={gameId ? `${gameId}` : "/"} className="btn-link pm cr b">My Tambola Game</Link>
                <Link to="/user" className="btn-link pm cb b">Change Name</Link>
            </div>
        </div>
    );
};

const mapStateToProps = ({ game }) => (
    {
        gameId: game.gameId
    }
);

export default connect(mapStateToProps)(Navbar);