import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import './Invite.css';

const Invite = ({ gameId }) => {
    const { pathname } = useLocation();
    const [copied, setCopied] = useState(false);
    const gameLink = `https://browsie.web.app${pathname}`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(gameLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    return (
        <div className="Invite card mtm brm">
            <div className="card-header tac">
                <h2 className="title co">Invite</h2>
            </div>
            <div className="card-body fcol faic brm bcgg">
                <p className="mtm">Tap on the link to copy</p>
                <div className="share-link-container">
                    <p onClick={handleCopy} className="share-link bcw ps brs mtm frow fjcc faic">
                        {gameLink}
                        <span className={`copied pxs brs bcy fss ${copied ? "" : "dnone"}`}>Copied</span>
                    </p>
                </div>
                <p className="mtm">OR</p>
                <a 
                    className="btn tdnone btn-g mm frow faic" 
                    href={`https://api.whatsapp.com/send?text=%F0%9F%8E%9F%20Starting%2010%20minute%20FREE%20game%20of%20Tambola%0A%0A%E2%8F%B1%20Join%20fast...%20starting%20soon!%0A%0A%F0%9F%92%83%F0%9F%8F%BD%20Let%27s%20have%20fun%21%0D%0A%0D%0A${gameLink}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <img className="mrxs" src="https://img.icons8.com/color/30/000000/whatsapp.png" alt="whatsapp" />
                    Invite on WhatsApp
                </a>
            </div>
        </div>
    );
};

const mapStateToProps = ({ game }) => ({
    gameId: game.gameId,
});

export default connect(mapStateToProps)(Invite);
