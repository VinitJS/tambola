import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import './Board.css';

const Board = React.memo(() => {
    const coins = useSelector(state => state.coins.coins);

    const numero = useMemo(() => {
        const numArray = Array(90).fill(-1);
        coins.forEach((coin, i) => numArray[coin] = i < 13 ? 1 : 2);
        if (coins.length > 0) numArray[coins[coins.length - 1]] = 3;
        return numArray;
    }, [coins]);

    return (
        <div className="Drawn fcol mtxs">
            <div className="board-border bclst tac">
                <div className="board fcol fwrap w100pc">
                    {numero.map((value, index) => (
                        <button key={index} className={`cell brs tac fss ${value === -1 ? "bcw clst" : (value === 1 ? "bcw co" : (value === 2 ? "bcw cfd" : "bco cw b"))}`}>
                            {index}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
});

export default Board;