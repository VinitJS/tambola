import React from 'react';
import './Rules.css';
import { ReactComponent as MiddleLastIcon } from '../../assets/claims/middlelast.svg';

const Rules = React.memo(() => {
    return <div className="pxs">
            <h2 className="title co mm tac">How to play?</h2>
            <ul className="clst brm bcdr pl">
                <li className="frow mbm">
                    <span role="img" aria-label="limited chances" className="fsxxl">📢</span>
                    <p className="mlm">Numbers are <b>CALLED OUT</b> when the game starts</p>
                </li>
                <li className="frow mbm">
                    <span role="img" aria-label="limited chances" className="fsxxl">🔢</span>
                    <p className="mlm">Called out numbers are on the <b>NUMBER BOARD</b> at the bottom</p>
                </li>
                <li className="frow mbm">
                    <span role="img" aria-label="limited chances" className="fsxxl">✍️</span>
                    <p className="mlm">Mark numbers on your <b>TICKET</b> as they are called</p>
                </li>
                <li className="frow mbm">
                    <span role="img" aria-label="limited chances" className="fsxxl">🏆</span>
                    <p className="mlm">Tap on <b>MATCHING CLAIMS</b> to collect points</p>
                </li>
                <li className="frow mbm">
                    <span role="img" aria-label="limited chances" className="fsxxl">6️⃣</span>
                    <p className="mlm">You have <b>6 CHANCES</b> to claim</p>
                </li>
                <li className="frow mbm">
                    <span role="img" aria-label="first claim bonus" className="fsxxl">🤟</span>
                    <p className="mlm">Get double points on your <b>LAST CLAIM</b></p>
                </li>
                <li className="frow mbm">
                    <span role="img" aria-label="one left claim" className="fsxxl">✌</span>
                    <p className="mlm">Claim <b>ONE LEFT</b> needs 2 chances and gives double points</p>
                </li>
                <li className="frow">
                    <MiddleLastIcon className="mtm ticket_icon" />
                    <p className="mlm">To learn more about a claim, tap on the <b>ICON</b> beside it</p>
                </li>
            </ul>
        </div>
    }
);

export default Rules;
