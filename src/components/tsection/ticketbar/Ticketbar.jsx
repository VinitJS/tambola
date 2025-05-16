import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Ticketbar.css';

const Ticketbar = () => {
    const chances_left = useSelector(state => state.claims.chances_left);
    const { count, coin_latest } = useSelector(state => state.coins);

    const [voices, setVoices] = useState([]);

    useEffect(() => {
        const loadVoices = () => {
            const availableVoices =  window.speechSynthesis.getVoices();
            if (availableVoices.length > 0) {
                setVoices(availableVoices);
            }
        };

        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;

        return () => {
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, []);

    useEffect(() => {
        if (coin_latest > -1 && voices.length > 0) {
            const utter = new SpeechSynthesisUtterance(coin_latest > 9 ? `${coin_latest % 11 === 0 ? "Twin number, " : ""}${Math.floor(coin_latest/10)}, ${coin_latest%10}, ${coin_latest}` : `Number ${coin_latest}`);
            utter.voice = voices.find(({ lang }) => lang === 'hi-IN') || voices[0];
            utter.volume = 1;
            utter.pitch = 1;
            utter.rate = 1;
            window.speechSynthesis.speak(utter);
        }
    }, [coin_latest, voices]);

    return (
        <div className="Ticketbar frow fjcsb tac b">
            <p className={`drawn fsxl cw ${count%2 ? 'bcg' : 'bcr'}`}>{coin_latest > -1 ? coin_latest : "#"}</p>
            <p className="chances fsl bclst cdst">{`${chances_left} chances left`}</p>
        </div>
    );
};

export default Ticketbar;
