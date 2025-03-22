import React from 'react';

const Rules = React.memo(() => {
    return (
        <div className="pxs">
            <h2 className="title co tac mm">Tambola Life Rules</h2>
            <ul>
                <li className="frow mbm">
                    <span role="img" aria-label="initial points">🖐</span>
                    <p className="mlm">Get 50 joining points</p>
                </li>
                <li className="frow mbm">
                    <span role="img" aria-label="limited chances">🤏</span>
                    <p className="mlm">Get 6 chances to claim</p>
                </li>
                <li className="frow mbm">
                    <span role="img" aria-label="first claim bonus">🤟</span>
                    <p className="mlm">First claim gives double points</p>
                </li>
                <li className="frow mbm">
                    <span role="img" aria-label="one left claim">✌</span>
                    <p className="mlm">Claim ONE LEFT gives double points, but takes away 2 chances</p>
                </li>
                <li className="frow mbm">
                    <span role="img" aria-label="tap number">☝</span>
                    <p className="mlm">Tap a number to demand, but you lose joining points</p>
                </li>
            </ul>
        </div>
    );
});

export default Rules;
