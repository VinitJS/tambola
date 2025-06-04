import React from 'react';
import { useSelector } from 'react-redux';
import './Rules.css';
import { ReactComponent as MiddleLastIcon } from '../../assets/claims/middlelast.svg';


const Rules = React.memo(() => {
    const { game_by, coins_length } = useSelector(state => state.game);
    return (
        game_by &&
        <div className="pxs">
            <h2 className="title co mm tac">{`${game_by}'s Game`}</h2>
            {coins_length === 0 && <p className="mtm tac title co b">{`${game_by} will start the game soon!`}</p>}
            <ul>
                <li className="frow mbm">
                    <span role="img" aria-label="limited chances" className="fsxxl">🫰</span>
                    <p className="mlm">Get 6 chances to claim</p>
                </li>
                <li className="frow mbm">
                    <span role="img" aria-label="first claim bonus" className="fsxxl">🤟</span>
                    <p className="mlm">Get double points on your Last claim</p>
                </li>
                <li className="frow mbm">
                    <span role="img" aria-label="one left claim" className="fsxxl">✌</span>
                    <p className="mlm">Claim ONE LEFT needs 2 chances and gives double points</p>
                </li>
                <li className="frow mbm">
                    <MiddleLastIcon className="mtm ticket_icon" />
                    <p className="mlm">To learn more about a claim, TAP on the figure beside it</p>
                </li>
            </ul>
        </div>
    );
});

export default Rules;
