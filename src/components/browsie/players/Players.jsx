import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { addToClapped, setClap } from '../../../redux/playing/playing.actions';

import './Players.css';

const Players = React.memo(({ gameId, players, totalCollected, totalPoints, userId, clapLoading, clapped, setClap, addToClapped }) => {

    const emo = useRef(["ðķ", "ðą", "ð­", "ðđ", "ð°", "ðĶ", "ðŧ", "ðž", "ðĻ", "ðŊ", "ðĶ", "ðŪ", "ð·", "ðļ", "ðĩ", "ð", "ð", "ð", "ð", "ð", "ð§", "ðĶ", "ðĪ", "ðĢ", "ðĨ", "ðĶ", "ðĶ", "ðĶ", "ðĶ", "ðš", "ð", "ðī", "ðĶ", "ð", "ð", "ðĶ", "ð", "ð", "ð", "ðĶ", "ðĶ", "ð·", "ðĶ", "ðĒ", "ð", "ðĶ", "ðĶ", "ðĶ", "ð", "ðĶ", "ðĶ", "ðĶ", "ðĶ", "ðĄ", "ð ", "ð", "ðŽ", "ðģ", "ð", "ðĶ", "ð", "ð", "ð", "ðĶ", "ðĶ", "ð", "ðĶ", "ðĶ", "ðŠ", "ðŦ", "ðĶ", "ðĶ", "ð", "ð", "ð", "ð", "ð", "ð", "ð", "ðĶ", "ð", "ðĶ", "ð", "ðĐ", "ð", "ð", "ðĶ", "ðĶ", "ðĶ", "ðĶĒ", "ð", "ðĶ", "ðĶĄ", "ð", "ð", "ðŋ", "ðĶ", "ð", "ðē"]);
    const leader = useRef("");
    const synth = useRef(window.speechSynthesis);
    const utter = useRef(new SpeechSynthesisUtterance());
    const voices = useRef(synth.current.getVoices());
    const voice = useRef(voices.current.filter(voice => voice.lang === "hi-IN")[0] || voices[0]);
    utter.current.voice = voice.current;
    utter.current.volume = 1;
    utter.current.pitch = 1;
    utter.current.rate = 1;

    useEffect(() => {
        if (players.length > 1) {
            if (players[0].points !== players[1].points && players[0].id !== leader.current) {
                utter.current.text = `${players[0].name} is leading`;
                synth.current.speak(utter.current);
                leader.current = players[0].id;
            }
        }
        const player = players.find(p => p.id === userId);
        if(player?.clap?.length > clapped?.length) {
            const clappedPlayerId = player.clap.find(p => !clapped.includes(p));
            const clappedPlayer = players.find(p => p.id === clappedPlayerId);
            utter.current.text = `${clappedPlayer.name} clapped for you.`;
            synth.current.speak(utter.current);
            addToClapped(clappedPlayerId);
        }
    }, [addToClapped, clapped, players, userId]);

    return (
        <div className="Players fcol faic">
            <h2 className="title co">Score</h2>
            {
                players.map(player => <div key={player.id} className="frow faic mtm">
                    <div className="player frow faic bcly pxs">
                        <span className="avatar" role="img" aria-label="avatar">{emo.current[player.p % emo.current.length]}</span>
                        <div className="fcol faic">
                            <div className="fss mrxs">
                                {
                                    player.p > 0 && <span className="mrs">{player.p}</span>
                                }
                                {
                                    player.v > 0 && <span role="img" aria-label="star">{player.v}â­</span>
                                }
                            </div>
                            <p className="mrxs">
                                {player.name?.substring(0, 15)}
                            </p>
                        </div>
                        <p className="points bcy tac">{totalPoints > 0 ? Math.round((player.points/totalPoints)*totalCollected) : 0}</p>
                    </div>
                    {
                        !clapLoading && <div className="clap frow faic">
                            <button onClick={() => ((player.id===userId || (player.clap && player.clap.includes(userId))) ? null : (setClap(gameId, player.id, userId)))}>
                                <span className="avatar" role="img" aria-label="avatar">ð</span>
                            </button>
                            <p>{player.clap?.length}</p>
                        </div>
                    }
                    </div>
                )
            }
        </div >
    );
});

const mapStateToProps = ({ play, user }) => (
    {
        players: play.players,
        totalCollected: play.size*50,
        totalPoints: play.totalPoints,
        userId: user.id.toString(),
        clapLoading: play.clapLoading,
        clapped: play.clapped
    }
);

const mapDispatchToProps = dispatch => (
    {
        setClap: (gameId, playerId, userId) => dispatch(setClap(gameId, playerId, userId)),
        addToClapped: (id) => dispatch(addToClapped(id))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Players);