import React from 'react';
import { connect } from 'react-redux';
import { setSpeed } from '../../../../redux/game/game.actions';

const Speed = ({ speed, setSpeed, counting }) => {
    const handleSpeedChange = (newSpeed) => {
        if (!counting && speed !== newSpeed) {
            setSpeed(newSpeed);
        }
    };

    return (
        <div className="fcol faic pxs mtm brm bcw op80pc">
            <p className="title mtm">Set Speed</p>
            <div className="btn-group frow fwrap fjcc mm">
                {['Fast', 'Medium', 'Slow'].map((label, index) => {
                    const speeds = [5000, 10000, 15000];
                    const currentSpeed = speeds[index];
                    return (
                        <button
                            key={label}
                            disabled={counting}
                            onClick={() => handleSpeedChange(currentSpeed)}
                            className={`mxs btn ${speed === currentSpeed ? "btn-y" : ""}`}
                        >
                            {label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

const mapStateToProps = ({ game }) => ({
    speed: game.speed,
    counting: game.counting,
});

const mapDispatchToProps = {
    setSpeed,
};

export default connect(mapStateToProps, mapDispatchToProps)(Speed);
