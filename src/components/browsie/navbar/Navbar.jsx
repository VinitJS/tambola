import React from 'react';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';

import './Navbar.css';

const Navbar = ({ gameId }) => {
    const history = useHistory();

    return (
        <nav className="Navbar w100pc">
            <div className="nav frow fjcsb">
                <button onClick={() => history.push(gameId ? `/${gameId}` : "/")} className="btn pm cr b w100pc mxs">
                    My Tambola Game
                </button>
                <button onClick={() => history.push("/user")} className="btn pm cb b w100pc mxs">
                    Change Name
                </button>
            </div>
        </nav>
    );
};

const mapStateToProps = ({ game }) => ({
    gameId: game.gameId
});

export default connect(mapStateToProps)(Navbar);
