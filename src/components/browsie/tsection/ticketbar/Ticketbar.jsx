import React from 'react';

import './Ticketbar.css';
import { connect } from 'react-redux';
import Latestcoin from './Latestcoin';

const Ticketbar = ({ coin, chances, claimedCount }) => {
    return (
        <div className="Ticketbar frow fjcsb">
            <Latestcoin coin={coin} />
            <p className="chances bcly b">{chances > 0 ? `${chances - claimedCount} chances left` : "use chances wisely"}</p>
        </div>
    );
};

const mapStateToProps = ({ play, claims }) => (
    {
        coin: play.coins[play.coins.length - 1],
        chances: play.chances,
        claimedCount: claims.claimedCount
    }
);

export default connect(mapStateToProps)(Ticketbar);