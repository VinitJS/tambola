import React from 'react';
import { connect } from 'react-redux';

import Notfound from '../../notfound/Notfound';
import Players from '../../players/Players';
import Claims from '../../claims/Claims';
import Tsection from '../../tsection/Tsection';
import Drawn from '../../drawn/Drawn';
import Commentary from '../../tsection/commentary/Commentary';
import Rules from '../../rules/Rules';

const Play = ({ gameId, isValidGame }) => {
    return (
        <div className="fcol faic">
            {
                isValidGame
                    ?
                    <>
                        <Rules />
                        <Drawn />
                        <Tsection gameId={gameId} />
                        <Claims gameId={gameId} />
                        <Players gameId={gameId} />
                        <div className="tac mtm mbm">
                            <p className="ps bcy brxl">Game Created by <a href="https://www.linkedin.com/in/khandelwalvinit/" target="_blank" rel="noopener noreferrer" className="btn-link">Vinit Khandelwal</a></p>
                        </div>
                        <Commentary />
                    </>
                    :
                    <Notfound />
            }
        </div>
    );
};

const mapStateToProps = ({ play }) => (
    {
        isValidGame: play.isValidGame,
        gameId: play.gameId
    }
);

export default connect(mapStateToProps)(Play);