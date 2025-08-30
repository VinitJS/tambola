import React from 'react';
import './Rules.css';
import { ReactComponent as MiddleLastIcon } from '../../assets/claims/middlelast.svg';

const Rules = React.memo(() => {
    return <div className="pxs mbs">
            <h2 className="title co mm tac">How to play?</h2>
            <ul className="Rules cw bcdst brm pl">
                <li className="frow mbm">
                    <span role="img" aria-label="limited chances" className="fsxxl">📢</span>
                    <p className="mlm">Numbers are called out when the game starts</p>
                </li>
                <li className="frow mbm">
                    <span role="img" aria-label="limited chances" className="fsxxl">🔢</span>
                    <p className="mlm">Called out numbers are on the Number board</p>
                </li>
                <li className="frow mbm">
                    <span role="img" aria-label="limited chances" className="fsxxl">✍️</span>
                    <p className="mlm">Mark numbers on your ticket as they are called</p>
                </li>
                <li className="frow mbm">
                    <span role="img" aria-label="limited chances" className="fsxxl">🏆</span>
                    <p className="mlm">Tap on matching claims to collect points</p>
                </li>
                <li className="frow mbm">
                    <span role="img" aria-label="limited chances" className="fsxxl">6️⃣</span>
                    <p className="mlm">You have 6 chances to claim</p>
                </li>
                <li className="frow mbm">
                    <span role="img" aria-label="first claim bonus" className="fsxxl">🤟</span>
                    <p className="mlm">Get double points for your last claim</p>
                </li>
                <li className="frow mbm">
                    <span role="img" aria-label="one left claim" className="fsxxl">✌</span>
                    <p className="mlm">Claim ONE LEFT needs 2 chances and gives double points</p>
                </li>
                <li className="frow">
                    <MiddleLastIcon className="mtm ticket_icon" />
                    <p className="mlm">To learn more about a claim, tap on the icon beside it</p>
                </li>
            </ul>
        </div>
    }
);

export default Rules;
