import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';

import './Players.css';

const Players = React.memo(({ gameId, players, totalCollected, totalPoints, userId }) => {

    const emo = useRef(["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "🙈", "🙉", "🙊", "🐒", "🐔", "🐧", "🐦", "🐤", "🐣", "🐥", "🦆", "🦅", "🦉", "🦇", "🐺", "🐗", "🐴", "🦄", "🐝", "🐛", "🦋", "🐌", "🐞", "🐜", "🦟", "🦗", "🕷", "🦂", "🐢", "🐍", "🦎", "🦖", "🦕", "🐙", "🦑", "🦐", "🦞", "🦀", "🐡", "🐠", "🐟", "🐬", "🐳", "🐋", "🦈", "🐊", "🐅", "🐆", "🦓", "🦍", "🐘", "🦛", "🦏", "🐪", "🐫", "🦒", "🦘", "🐃", "🐂", "🐄", "🐎", "🐖", "🐏", "🐑", "🦙", "🐐", "🦌", "🐕", "🐩", "🐈", "🐓", "🦃", "🦚", "🦜", "🦢", "🐇", "🦝", "🦡", "🐁", "🐀", "🐿", "🦔", "🐉", "🐲"]);
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
    }, [players, userId]);

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
                                    player.v > 0 && <span role="img" aria-label="star">{player.v}⭐</span>
                                }
                            </div>
                            <p className="mrxs">
                                {player.name?.substring(0, 15)}
                            </p>
                        </div>
                        <p className="points bcy tac">{totalPoints > 0 ? Math.round((player.points/totalPoints)*totalCollected) : 0}</p>
                    </div>
                </div>)
            }
        </div >
    );
});

const mapStateToProps = ({ play, user }) => (
    {
        players: play.players,
        totalCollected: play.size*50,
        totalPoints: play.totalPoints,
        userId: user.id.toString()
    }
);

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Players);