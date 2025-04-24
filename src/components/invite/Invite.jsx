import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './Invite.css';

const Invite = () => {
    const { pathname } = useLocation();
    const [copied, setCopied] = useState(false);
    const linkRef = useRef(null);
    const gameLink = `${window.location.origin}${pathname}`;

    const handleCopy = async () => {
        try {
            const range = document.createRange();
            range.selectNodeContents(linkRef.current);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);

            await navigator.clipboard.writeText(gameLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    return (
        <div className="Invite card mtm brm w100pc">
            <div className="card-body fcol faic brm bcgg">
                <p className="mtm">Game Link</p>
                <div className="share-link-container tac">
                    <p ref={linkRef} onClick={handleCopy} className="share-link bcw ps brs mtm">
                        {gameLink}
                    </p>
                    {
                        copied && <span className="copied pxs brs bcy fss">Copied</span>
                    }
                </div>
                <p className="mtm">OR</p>
                <a
                    className="btn tdnone btn-g mm frow faic"
                    href={`https://api.whatsapp.com/send?text=%F0%9F%8E%9F%20Starting%2010%20minute%20FREE%20game%20of%20Tambola%0A%0A%E2%8F%B1%20Join%20fast...%20starting%20soon!%0A%0A%F0%9F%92%83%F0%9F%8F%BD%20Let%27s%20have%20fun%21%0D%0A%0D%0A${encodeURIComponent(gameLink)}`}
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

export default Invite;
