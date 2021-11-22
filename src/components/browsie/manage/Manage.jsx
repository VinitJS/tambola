import React from 'react';
import NewGame from './newgame/NewGame';
import Speed from './speed/Speed';
import Counting from './counting/Counting';

const Manage = () => {

    return (
        <div className="Manage card brm mtm">
            <div className="card-header tac">
                <h2 className="title co">Host Game</h2>
            </div>
            <div className="card-body fcol faic brm bcgo">
                <NewGame />
                <Speed />
                <Counting />
            </div>
        </div>
    );
};

export default Manage;