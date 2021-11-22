import React from 'react';

import './Rules.css';

const Rules = React.memo(() => {
    return (
        <div className="Rules">
            <h2 className="title co tac mm">Tambola Life Rules</h2>
            <div className="frow mbm">
                <span role="img" aria-label="limited">👍</span>
                <p className="mlm">You all have 50 points to begin with</p>
            </div>
            <div className="frow mbm">
                <span role="img" aria-label="limited">🖐</span>
                <p className="mlm">You have limited number of chances to claim</p>
            </div>
            <div className="frow mbm">
                <span role="img" aria-label="two">🤟</span>
                <p className="mlm">For your first claim you get double the points of that claim</p>
            </div>
            <div className="frow mbm">
                <span role="img" aria-label="tap">☝</span>
                <p className="mlm">You have 1 chance to demand a number of your choice by tapping the number on the board. It takes away your joining points.</p>
            </div>
            <div className="frow mbm">
                <span role="img" aria-label="tap">✌</span>
                <p className="mlm">Claim <b>ONE LEFT</b> takes away 2 chances but you get double the points too</p>
            </div>
        </div>
    );
});

export default Rules;