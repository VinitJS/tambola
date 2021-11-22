import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import './Commentary.css';

const Commentary = React.memo(({ c }) => {

    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    const utter = new SpeechSynthesisUtterance();
    const voice = voices.filter(voice => voice.lang === "hi-IN")[0] || voices[0];
    utter.voice = voice;
    utter.volume = 1;
    utter.pitch = 1;
    utter.rate = 1;

    useEffect(() => {
        utter.text = c || "You can demand 1 number of your choice.";
        synth.speak(utter);
    }, [c, synth, utter]);

    return (
        c && <p className={`Commentary bco cw pxs b w100pc tac`}>{c}</p>
    );
});

const mapStateToProps = ({ play }) => (
    {
        c: play.c
    }
);

export default connect(mapStateToProps)(Commentary);