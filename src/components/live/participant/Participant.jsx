import { useEffect } from 'react';
import { updateCoins } from '../../../redux/coins.reducer';
import { resetGame, updateGame } from '../../../redux/game.reducer';
import { updatePlayers } from '../../../redux/players.reducer';
import { updateClaims } from '../../../redux/claims.reducer';
import { firestore } from "../../../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import Board from '../../board/Board';
import Rules from '../../rules/Rules';
import Tsection from '../../tsection/Tsection';
import Players from '../../players/Players';
import Claims from '../../claims/Claims';
import Invite from '../../invite/Invite';
import { useNavigate } from 'react-router-dom';
import { updateTicket } from '../../../redux/ticket.reducer';
import Host from '../../host/host';

const Participant = ({ game_id }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const id = useSelector(state => state.user.id);
    const game_by = useSelector(state => state.game.game_by);
    useEffect(() => {
        const unsubscribe = firestore
            .collection("call")
            .doc(game_id)
            .onSnapshot(
                (snapshot) => {
                    if (!snapshot.exists) {
                        dispatch(resetGame())
                        return navigate("/");
                    }
                    const {
                        game_by,
                        version,
                        coins,
                        players,
                        claims,
                        message
                    } = snapshot.data();

                    dispatch(updateCoins({
                        coins,
                    }));
                    
                    dispatch(updateGame({
                        game_by,
                        play_id: game_id,
                        version,
                        coin_count: coins.length,
                        players_count: Object.keys(players).length,
                        message
                    }));

                    dispatch(updateTicket({
                        flatTicket: players?.[id]?.ticket,
                        version
                    }));

                    dispatch(updatePlayers({
                        players: Object.entries(players).map(([key, { name, points, total_points, total_stars }]) => ({ id: key, name, points, total_points, total_stars }))
                    }));

                    dispatch(updateClaims({
                        claims,
                        players_count: Object.keys(players).length,
                        chances_left: players?.[id]?.chances_left
                    }));
                },
                (error) => console.error("Error fetching game status:", error)
            );
        return () => unsubscribe();
    }, [game_id, id, dispatch, navigate]);

    return <div className="fcol faic">
        <h2 className="title co mtm tac">{game_by}'s Game</h2>
        <Invite/>
        <Rules />
        <Claims game_id={game_id} />
        <Tsection game_id={game_id} />
        <Board />
        <Players game_id={game_id} />
        <Host/>
        <div className="tac mtm mbm">
            <p className="ps brxl">
                Game designed by {' '}
                <a
                    href="https://www.linkedin.com/in/khandelwalvinit/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-link cb"
                    >
                    Vinit Khandelwal
                </a>
            </p>
        </div>
    </div>;
};

export default Participant;
