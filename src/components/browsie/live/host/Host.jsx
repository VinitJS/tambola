import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setGameLoading } from '../../../../redux/game/game.actions';

import Manage from '../../manage/Manage';
import Invite from '../../invite/Invite';

const Host = ({ setGameLoading }) => {
    useEffect(() => {
        setGameLoading(false);
    }, [setGameLoading]);

    return (
        <div className="Host w100pc">
            <Manage />
            <Invite />
        </div>
    );
};

export default connect(null, { setGameLoading })(Host);
