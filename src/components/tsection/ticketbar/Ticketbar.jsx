import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Ticketbar.css';

const Ticketbar = () => {
    const chances_left = useSelector(state => state.claims.chances_left);
    const coin_latest = useSelector(state => state.coins.coin_latest);

    const [voices, setVoices] = useState([]);

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
        if (coin_latest && voices.length > 0) {
            const synth = window.speechSynthesis;

            const utter = new SpeechSynthesisUtterance(coin_latest > 9 ? `${Math.floor(coin_latest/10)}, ${coin_latest%10}, ${coin_latest}` : `Number ${coin_latest}`);
            utter.voice = voices.find(({ lang }) => lang === 'hi-IN') || voices[0];
            utter.volume = 1;
            utter.pitch = 1;
            utter.rate = 1;

            synth.speak(utter);
        }
    }, [coin_latest, voices]);

    return (
        <div className="Ticketbar frow fjcsb tac b">
            <p className={`drawn fsxl cw ${coin_latest%2 ? 'bcg' : 'bcr'}`}>{coin_latest}</p>
            <p className="chances fsl bclst">{`${chances_left} chances left`}</p>
        </div>
    );
};

export default Ticketbar;
