import React, { useEffect } from 'react';

const Latestcoin = React.memo(({ coin }) => {

    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    const utter = new SpeechSynthesisUtterance();
    const voice = voices.filter(voice => voice.lang === "hi-IN")[0] || voices[0];
    utter.voice = voice;
    utter.volume = 1;
    utter.pitch = 1;
    utter.rate = 1;

    useEffect(() => {
        utter.text = (coin > 9) ? `${Math.floor(coin / 10)}, ${coin % 10}, ${coin}` : (coin > 0) ? `Number ${coin}` : `Game will begin soon!`;
        synth.speak(utter);
    }, [coin, synth, utter]);

    return (
        <p className="drawn bcr tac cw">{coin ? coin : "#"}</p>
    );
});

export default Latestcoin;