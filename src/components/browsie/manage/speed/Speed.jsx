import React from 'react';
import { connect } from 'react-redux';
import { setSpeed } from '../../../../redux/game/game.actions';

const Speed = ({ speed, setSpeed, counting }) => {

    return (
        <div className="fcol faic pxs mtm brm bcw op80pc">
            <p className="title mtm">Set Speed</p>
            <div className="btn-group frow fwrap fjcc mm">
                <button disabled={counting} onClick={() => speed !== 5000 && setSpeed(5000)} className={`mxs btn ${(speed === 5000) ? "btn-y" : ""}`}>Fast</button>
                <button disabled={counting} onClick={() => speed !== 10000 && setSpeed(10000)} className={`mxs btn ${(speed === 10000) ? "btn-y" : ""}`}>Medium</button>
                <button disabled={counting} onClick={() => speed !== 15000 && setSpeed(15000)} className={`mxs btn ${(speed === 15000) ? "btn-y" : ""}`}>Slow</button>
            </div>
        </div>
    );
}

const mapStateToProps = ({ game }) => (
    {
        speed: game.speed,
        counting: game.counting
    }
);

const mapDispatchToProps = dispatch => (
    {
        setSpeed: speed => dispatch(setSpeed(speed))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Speed);