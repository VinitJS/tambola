import React from 'react';
import { connect } from 'react-redux';
import { createGame } from '../../../../redux/game/game.actions';

const NewGame = ({ createGame, name, id, gameLoading, gVersion, counting }) => {

    const handleReset = () => {
        if (window.confirm("Press OK to restart this game.")) {
            createGame(name, id, gVersion + 1);
        }
    };

    return (
        <button 
            disabled={gameLoading || counting} 
            className="btn btn-o mtm" 
            onClick={handleReset}
        >
            Restart Game
        </button>
    );
};

const mapStateToProps = ({ user, game }) => ({
    name: user.name,
    id: user.id,
    gameLoading: game.gameLoading,
    gVersion: game.gVersion,
    counting: game.counting
});

const mapDispatchToProps = {
    createGame
};

export default connect(mapStateToProps, mapDispatchToProps)(NewGame);
