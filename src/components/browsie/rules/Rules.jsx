import React from 'react';

const Rules = React.memo(() => {
    return (
        <div className="pxs">
            <h2 className="title co tac mm"> Rules</h2>
            <ul>
                <li className="frow mbm">
                    <span role="img" aria-label="initial points" className="fsxl">🖐</span>
                    <p className="mlm">Get 50 joining points</p>
                </li>
                <li className="frow mbm">
                    <span role="img" aria-label="limited chances" className="fsxl">🤏</span>
                    <p className="mlm">Get 6 chances to claim</p>
                </li>
                <li className="frow mbm">
                    <span role="img" aria-label="first claim bonus" className="fsxl">🤟</span>
                    <p className="mlm">Get double points on first claim</p>
                </li>
                <li className="frow mbm">
                    <span role="img" aria-label="one left claim" className="fsxl">✌</span>
                    <p className="mlm">Claim ONE LEFT needs 2 chances and gives double points</p>
                </li>
                <li className="frow mbm">
                    <span role="img" aria-label="tap number" className="fsxl">☝</span>
                    <p className="mlm">Tap a number to demand, but you lose joining points</p>
                </li>
            </ul>
        </div>
    );
});

export default Rules;
