import React, { useMemo, useCallback } from 'react';
import { connect } from 'react-redux';
import './Drawn.css';
import { addNewDraw } from '../../../redux/drawing/drawing.actions';

const Drawn = React.memo(({ coins, gameBy, gameId, size, dchance, addNewDraw, myTNums, name, userId }) => {
    const numero = useMemo(() => {
        const numArray = Array(90).fill(-1);
        coins.forEach((coin, i) => numArray[coin] = i < 13 ? 1 : true);
        numArray[coins[coins.length - 1]] = 2; // Highlight the latest drawn number
        return numArray;
    }, [coins]);

    const confirmDraw = useCallback((index) => {
        const points = -5
        if (window.confirm(`It takes away ${points*10} points. Demand ${index} next?`)) {
            addNewDraw(gameId, index, `${name} demands ${index}`, userId, points, size);
        }
    }, [addNewDraw, gameId, name, userId, size]);

    const chosenDraw = useCallback((value, index) => {
        if (!dchance) return alert("You have 0 chances left to demand a number.");
        if (value !== -1) return alert(`${index} is already called out.`);
        if (!myTNums.includes(index)) return alert(`${index} is NOT on your ticket.`);

        confirmDraw(index);
    }, [dchance, myTNums, confirmDraw]);

    return (
        <div className="Drawn fcol faic">
            <h2 className="title co mtm tac">{`${gameBy}'s Game`}</h2>
            <div className="board-border bclst brm tac mtm">
                <div className="board fcol fwrap ma">
                    {numero.map((value, index) => (
                        <CellButton key={index} index={index} value={value} onClick={chosenDraw} isGameStarted={coins.length > 0} />
                    ))}
                </div>
                {dchance && <p className="pbxs">Tap on the number you want next</p>}
            </div>
            {coins.length === 0 && <p className="mtm tac title co b">Game will begin soon</p>}
        </div>
    );
});

const CellButton = ({ index, value, onClick, isGameStarted }) => {
    const getClassName = () => {
        if (value === -1) return "cell brs tac bcw clst";
        if (value === 1) return "cell brs tac bcw cr b";
        if (value === 2) return "cell brs tac bcy";
        return "cell brs tac bcw b";
    };

    return (
        <button
            onClick={() => isGameStarted ? onClick(value, index) : alert("Can demand number after game starts.")}
            className={getClassName()}
        >
            {index}
        </button>
    );
};

const mapStateToProps = ({ play, draw, ticket, user }) => ({
    coins: play.coins,
    gameBy: play.gameBy,
    gameId: play.gameId,
    size: play.size,
    dchance: draw.dchance,
    myTNums: ticket.myTNums,
    name: user.name,
    userId: user.id
});

const mapDispatchToProps = {
    addNewDraw
};

export default connect(mapStateToProps, mapDispatchToProps)(Drawn);
