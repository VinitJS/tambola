import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import './Game.css';

import { setUserName } from '../../../redux/user/user.actions';
import { createGame } from '../../../redux/game/game.actions';

const Game = ({ name, id, gameLoading, gameId, setUserName, createGame }) => {

    const history = useHistory();

    useEffect(() => {
        if (gameId) { // if game is already created
            history.push(`/${gameId}`)
        }
    }, [gameId, history])

    const handleNewGame = () => {
        createGame(name, id, id);
    }

    return (
        <div className='Game ma fcol faic'>
            <h2>Welcome {name}!</h2>
            <img src="https://img.icons8.com/doodle/192/000000/ticket.png" alt="ticket" />
            <div className="frow faic mtm">
                <p className="cfd mrxs">Not {name}?</p>
                <button className="btn-link fsl cb" onClick={() => setUserName("")}>Change Name</button>
            </div>
            <button className="btn btn-y mtm" disabled={gameLoading} onClick={handleNewGame}>Host Game</button>
        </div>
    );
};

const mapStateToProps = ({ user, game }) => (
    {
        name: user.name,
        id: user.id,
        gameLoading: game.gameLoading,
        gameId: game.gameId
    }
);

const mapDispatchToProps = dispatch => (
    {
        setUserName: name => dispatch(setUserName(name)),
        createGame: (gameBy, gameId, gVersion) => dispatch(createGame(gameBy, gameId, gVersion))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Game);