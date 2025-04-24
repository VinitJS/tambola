import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Manage from '../manage/Manage';
import Participant from './participant/Participant';

const Livegame = () => {
    const { game_id } = useParams();
    const id = useSelector(state => state.user.id);

    return (
        <div className="w100pc">
            {id === game_id && <Manage />}
            <Participant game_id={game_id} />
        </div>
    );
};

export default Livegame;