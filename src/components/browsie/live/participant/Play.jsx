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
    if (!isValidGame) return <Notfound />;

    return (
        <div className="fcol faic">
            <Rules />
            <Drawn />
            <Tsection gameId={gameId} />
            <Claims gameId={gameId} />
            <Players gameId={gameId} />
            <div className="tac mtm mbm">
                <p className="ps brxl">
                    Game designed by {' '}
                    <a
                        href="https://www.linkedin.com/in/khandelwalvinit/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-link"
                    >
                        Vinit Khandelwal
                    </a>
                </p>
            </div>
            <Commentary />
        </div>
    );
};

const mapStateToProps = ({ play: { isValidGame, gameId } }) => ({ isValidGame, gameId });

export default connect(mapStateToProps)(Play);
