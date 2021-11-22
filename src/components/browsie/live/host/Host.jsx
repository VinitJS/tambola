import React from 'react';
import Manage from '../../manage/Manage';
import Invite from '../../invite/Invite';
import { useEffect } from 'react';
import { setGameLoading } from '../../../../redux/game/game.actions';
import { connect } from 'react-redux';

const Host = ({ setGameLoading }) => {

    useEffect(() => {
        setGameLoading(false);
    }, [setGameLoading]);

    return (
        <div className="Host w100pc">
            <Invite />
            <Manage />
        </div>
    );
};

const mapDispatchToProps = dispatch => (
    {
        setGameLoading: bool => dispatch(setGameLoading(bool))
    }
)

export default connect(null, mapDispatchToProps)(Host);