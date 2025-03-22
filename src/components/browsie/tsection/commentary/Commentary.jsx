import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import './Commentary.css';

const Commentary = React.memo(({ c }) => {
    const synth = window.speechSynthesis;

    // Memoize voices to prevent reloading on every render
    const voices = useMemo(() => synth.getVoices(), [synth]);

    // Memoize utterance to avoid unnecessary re-creation
    const utter = useMemo(() => {
        const u = new SpeechSynthesisUtterance();
        u.voice = voices.find(voice => voice.lang === "hi-IN") || voices[0];
        u.volume = 1;
        u.pitch = 1;
        u.rate = 1;
        return u;
    }, [voices]);

    useEffect(() => {
        if (c) {
            utter.text = c;
            synth.speak(utter);
        }
    }, [c, synth, utter]);

    return c ? <p className="Commentary bco cw pxs b w100pc tac">{c}</p> : null;
});

const mapStateToProps = ({ play }) => ({
    c: play.c
});

export default connect(mapStateToProps)(Commentary);
