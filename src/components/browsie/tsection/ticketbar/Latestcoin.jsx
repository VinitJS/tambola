import React, { useEffect, useMemo } from 'react';

const Latestcoin = React.memo(({ coin }) => {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    const voice = voices.find(voice => voice.lang === "hi-IN") || voices[0];

    // Memoizing utter to prevent unnecessary re-creations
    const utter = useMemo(() => {
        const u = new SpeechSynthesisUtterance();
        u.voice = voice;
        u.volume = 1;
        u.pitch = 1;
        u.rate = 1;
        return u;
    }, [voice]);

    useEffect(() => {
        utter.text = coin > 9 ? `${Math.floor(coin / 10)}, ${coin % 10}, ${coin}` 
                              : coin > 0 ? `Number ${coin}` 
                              : `Game will begin soon!`;
        synth.speak(utter);
    }, [coin, synth, utter]);

    return (
        <p className="drawn bcr tac cw">{coin || "#"}</p>
    );
});

export default Latestcoin;
