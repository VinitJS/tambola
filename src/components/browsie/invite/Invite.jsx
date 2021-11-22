import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';

import './Invite.css';

const Invite = ({ gameId }) => {
    const { pathname } = useLocation();
    const [copied, setCopied] = useState(false);

    const handleCopy = e => {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }

    return (
        <div className="Invite card mtm brm">
            <div className="card-header tac">
                <h2 className="title co">Send Invite</h2>
            </div>
            <div className="card-body fcol faic brm bcgg">
                <p className="mtm">Copy and share your game link</p>
                <p onClick={handleCopy} className="share-link bcw ps brs mtm frow fjcc faic">{`https://tambola.life${pathname}`}<span className={`copied pxs brs bcy ${copied ? "" : "dnone"}`}>Copied</span></p>
                <p className="mtm">OR</p>
                <a className="btn tdnone btn-g mm frow faic" href={`https://api.whatsapp.com/send?text=%F0%9F%8E%9F%20Starting%2010%20minute%20FREE%20game%20of%20Tambola%0A%0A%E2%8F%B1%20Join%20fast%21%20Starting%20at%20${new Date().getMinutes() > 30 ? `${(new Date().getHours() + 1) % 12}:15` : `${(new Date().getHours()) % 12}:45`}%0A%0A%F0%9F%92%83%F0%9F%8F%BD%20Let%27s%20have%20fun%21%0D%0A%0D%0Ahttps://tambola.life${pathname}`} target="_blank" rel="noopener noreferrer">
                    <img className="mrxs" src="https://img.icons8.com/color/30/000000/whatsapp.png" alt="whatsapp" />
                    Invite on WhatsApp
                </a>
            </div>
        </div>
    );
};

const mapStateToProps = ({ game }) => (
    {
        gameId: game.gameId
    }
);

export default connect(mapStateToProps)(Invite);