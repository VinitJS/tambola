import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import './Players.css';

const Players = React.memo(({ players, size, claims, userId }) => {
    // Define refs for speech synthesis, leader tracking, and emojis
    const emo = useRef(["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "🙈", "🙉", "🙊", "🐒", "🐔", "🐧", "🐦", "🐤", "🐣", "🐥", "🦆", "🦅", "🦉", "🦇", "🐺", "🐗", "🐴", "🦄", "🐝", "🐛", "🦋", "🐌", "🐞", "🐜", "🦟", "🦗", "🕷", "🦂", "🐢", "🐍", "🦎", "🦖", "🦕", "🐙", "🦑", "🦐", "🦞", "🦀", "🐡", "🐠", "🐟", "🐬", "🐳", "🐋", "🦈", "🐊", "🐅", "🐆", "🦓", "🦍", "🐘", "🦛", "🦏", "🐪", "🐫", "🦒", "🦘", "🐃", "🐂", "🐄", "🐎", "🐖", "🐏", "🐑", "🦙", "🐐", "🦌", "🐕", "🐩", "🐈", "🐓", "🦃", "🦚", "🦜", "🦢", "🐇", "🦝", "🦡", "🐁", "🐀", "🐿", "🦔", "🐉", "🐲"]);
    const leader = useRef("");
    const synth = useRef(window.speechSynthesis);
    const utter = useRef(new SpeechSynthesisUtterance());

    // Initialize speech synthesis settings
    const voices = useRef(synth.current.getVoices());
    const voice = useRef(voices.current.filter(voice => voice.lang === "hi-IN")[0] || voices.current[0]);
    utter.current.voice = voice.current;
    utter.current.volume = 1;
    utter.current.pitch = 1;
    utter.current.rate = 1;

    console.log(players, claims)

    // Effect for handling speech when the leader changes
    useEffect(() => {
        if (players.length > 1 && players[0].points !== players[1].points && players[0].id !== leader.current) {
            utter.current.text = `${players[0].name} is leading`;
            synth.current.speak(utter.current);
            leader.current = players[0].id;
        }
    }, [players, userId]);

    return (
        <div className="Players fcol faic">
            <h2 className="title co frow faic">
                Score
                {
                    claims.fullHouse &&
                    <a className="btn-link fsxxl co mm frow faic" href={`https://api.whatsapp.com/send?text=${encodeURIComponent((claims.fullHouse ? `Full house 🎟️ ${claims.fullHouse}\n` : "") + (players.length > 0 ? `🥇 ${players[0]?.name}\n` : "") + (players.length > 1 ? `🥈 ${players[1]?.name}\n` : "") + (players.length > 2 ? `🥉 ${players[2]?.name}` : ""))}`} target="_blank" rel="noopener noreferrer">⬀</a>

                }
            </h2>
            {players.map(player => (
                <div key={player.id} className="frow faic mtm">
                    <div className="player frow faic bcly pxs">
                        <span className="avatar mxs" role="img" aria-label={`Avatar of ${player.name}`}>{emo.current[player.p % emo.current.length]}</span>
                        <div className="fcol faic">
                            <div className="fss mrxs">
                                {player.p > 0 && <span className="mrs">{player.p}</span>}
                                {player.v > 0 && <span role="img" aria-label="star">{player.v}⭐</span>}
                            </div>
                            <p className="mrxs">{player.name?.substring(0, 25)}</p>
                        </div>
                        <p className="points bcy tac">
                            {player.points * 10}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
});

const mapStateToProps = ({ play, user }) => ({
    players: play.players,
    size: play.size,
    claims: play.claims,
    userId: user.id.toString()
});

export default connect(mapStateToProps)(Players);
