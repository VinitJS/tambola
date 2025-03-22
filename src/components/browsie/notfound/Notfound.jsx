import React from 'react';

const Notfound = () => {
    return (
        <section className="Notfound fcol faic">
            <img 
                src="https://img.icons8.com/cute-clipart/128/000000/quest.png" 
                alt="Game not found icon" 
                className="notfound-icon"
            />
            <h1 className="error-title">Game Not Found</h1>
            <p className="error-message">It seems there was a problem with your internet connection or the link you followed is invalid.</p>
        </section>
    );
};

export default Notfound;
