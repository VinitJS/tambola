import React from 'react';
import { connect } from 'react-redux';
import './Drawn.css';
import { addNewDraw } from '../../../redux/drawing/drawing.actions';
import { useCallback } from 'react';

const Drawn = React.memo(({ coins, gameBy, gameId, size, dchance, addNewDraw, myTNums, name, userId }) => {
    const numero = Array(90).fill(-1);
    coins.slice(0, 13).forEach((coin) => numero[coin] = 1);
    coins.slice(13).forEach(coin => numero[coin] = true);
    numero[coins[coins.length - 1]] = 2;
    
    const chosenDraw = useCallback((value, index) => {
        if (dchance) {
            if (value === -1) {
                if (myTNums.includes(index)) {
                    if (window.confirm(`It takes away ${size} points. Press OK to get ${index} next.`)) {
                        addNewDraw(gameId, index, `${name} demands ${index}`, userId);
                    }
                } else {
                    alert(`${index} is NOT on your ticket.`);
                }
            } else {
                alert(`${index} is already called out.`)
            }
        } else {
            alert("You have 0 chance left to demand number.")
        }
    }, [addNewDraw, dchance, gameId, myTNums, name, userId, size]);

    return (
        <div className='Drawn fcol faic'>
            <h2 className="title co mtm tac">{`${gameBy}'s Game`}</h2>
            <div className="board-border bclst brm tac mtm">
                <p className="ptxs cw">Number Board</p>
                <div className="board fcol fwrap ma">
                    {
                        numero.map((value, index) => (< button key={index} onClick={() => coins.length > 0 ? chosenDraw(value, index) : alert("Can demand number after game starts.")} className={`cell brs tac ${value === -1 ? "bcw clst" : value === 1 ? "bcw cr b" : value === 2 ? "bcy" : "bcw b"}`} > {index}</button>))
                    }
                </div>
                {
                    dchance && <p className="pbxs">Tap on the number you want next</p>
                }
            </div>
            {
                coins.length === 0 &&
                <>
                    <p className="mtm tac title co b">Game will begin soon</p>
                </>
            }
        </div >
    );
});

const mapStateToProps = ({ play, draw, ticket, user }) => (
    {
        coins: play.coins,
        gameBy: play.gameBy,
        gameId: play.gameId,
        size: play.size,
        dchance: draw.dchance,
        myTNums: ticket.myTNums,
        name: user.name,
        userId: user.id
    }
);

const mapDispatchToProps = dispatch => (
    {
        addNewDraw: (gameId, num, statement, userId) => dispatch(addNewDraw(gameId, num, statement, userId))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Drawn);