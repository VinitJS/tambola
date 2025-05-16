import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import './Players.css';

const Players = React.memo(() => {
    const emo = useRef(["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "🙈", "🙉", "🙊", "🐒", "🐔", "🐧", "🐦", "🐤", "🐣", "🐥", "🦆", "🦅", "🦉", "🦇", "🐺", "🐗", "🐴", "🦄", "🐝", "🐛", "🦋", "🐌", "🐞", "🐜", "🦟", "🦗", "🕷", "🦂", "🐢", "🐍", "🦎", "🦖", "🦕", "🐙", "🦑", "🦐", "🦞", "🦀", "🐡", "🐠", "🐟", "🐬", "🐳", "🐋", "🦈", "🐊", "🐅", "🐆", "🦓", "🦍", "🐘", "🦛", "🦏", "🐪", "🐫", "🦒", "🦘", "🐃", "🐂", "🐄", "🐎", "🐖", "🐏", "🐑", "🦙", "🐐", "🦌", "🐕", "🐩", "🐈", "🐓", "🦃", "🦚", "🦜", "🦢", "🐇", "🦝", "🦡", "🐁", "🐀", "🐿", "🦔", "🐉", "🐲"]);
    const players = useSelector(state => state.players.players);
    const claims = useSelector(state => state.claims.claims);
    const [voices, setVoices] = useState([]);
    const leader = useRef({});

    useEffect(() => {
        const loadVoices = () => {
            const availableVoices =  window.speechSynthesis.getVoices();
            if (availableVoices.length > 0) {
                setVoices(availableVoices);
            }
        };

        loadVoices(); // Try loading immediately
        window.speechSynthesis.onvoiceschanged = loadVoices; // Fallback for async load

        return () => {
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, []);

    useEffect(() => {
        if (players.length > 1 && players[0].name !== leader.current.name && players[0].points !== players[1].points && voices.length > 0) {
            const utter = new SpeechSynthesisUtterance(`${players[0].name} is leading`);
            utter.voice = voices.find(({ lang }) => lang === 'hi-IN') || voices[0];
            utter.volume = 1;
            utter.pitch = 1;
            utter.rate = 1;
            window.speechSynthesis.speak(utter);
            leader.current = players[0];
        }
    }, [players, voices]);

    const medals = ['🥇', '🥈', '🥉'];
    const topGroups = [];
    let i = 0;

    while (topGroups.length < 3 && i < players.length) {
        const currentPoints = players[i].points;
        const group = players.filter(p => p.points === currentPoints);
        if (!topGroups.some(g => g[0]?.points === currentPoints)) {
            topGroups.push(group);
        }
        i += group.length;
    }

    return (
        <div className="Players fcol faic">
            {
                players.length > 0 && 
                <h2 className="title co frow faic">
                    Leaderboard
                    {
                        claims?.fullHouse &&
                        <a className="btn-link fsxxl co mm frow faic" href={`https://api.whatsapp.com/send?text=${encodeURIComponent((claims.fullHouse ? `Full house 🎟️ ${claims?.fullHouse}\n\n` : "") + topGroups.map((group, idx) => `${medals[idx]} ${group.map(p => p.name).join(", ")}`).join("\n"))}`} target="_blank" rel="noopener noreferrer">⬀</a>
                    }
                </h2>
            }
            {players.map(player => (
                <div key={player.id} className="frow faic mtm">
                    <div className="player frow faic bcly pxs cd">
                        <span className="mxs fsxl" role="img" aria-label={`Avatar of ${player.name}`}>{emo.current[player.total_points % emo.current.length]}</span>
                        <div className="fcol faic">
                            <div className="fss mrxs">
                                {player.total_points > 0 && <span className="mrs">{player.total_points}</span>}
                                {player.total_stars > 0 && <span role="img" aria-label="star">{player.total_stars}⭐</span>}
                            </div>
                            <p className="mrxs">{player.name?.substring(0, 25)}</p>
                        </div>
                        <p className="points bcy tac">
                            {player.points * players.length}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
});

export default Players;
