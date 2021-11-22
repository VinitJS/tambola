import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUserName, updateUserName } from '../../../redux/user/user.actions';
import { useEffect } from 'react';
import { setCreatingTicket } from '../../../redux/ticket/ticket.actions';

const Getname = ({ setUserName, updateUserName, userName, p, v, setCreatingTicket }) => {
    const [name, setName] = useState("");
    const history = useHistory();

    useEffect(() => {
        if (userName) {
            setName(userName);
        }
    }, [userName]);

    const handleChange = ({ target }) => {
        setName(target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name !== "") {
            if (userName) {
                updateUserName(name);
                setCreatingTicket(false);
                history.goBack();
            } else {
                setUserName(name);
            }
        }
    }

    return (
        <div className="Getname ma tac pm">
            <form onSubmit={handleSubmit} className="fcol">
                <input className="textbox" type="text" onChange={handleChange} value={name} placeholder="Enter Name" />
                <button type="submit" className="btn btn-y">{userName ? "Update Name" : "Set Name"}</button>
                {
                    userName && <>
                        <p className="cr">Updated name will be visible next game onwards</p>
                        <div className="frow">
                            <div className="w100pc ms">
                                <p className="cl">Points</p>
                                <p className='bcly pxl brm fsxxl cy b'>{p}</p>
                            </div>
                            <div className="w100pc ms">
                                <p className="cl">Stars</p>
                                <p className='bcly pxl brm fsxxl cy b'>{v}</p>
                            </div>
                        </div>
                    </>
                }
            </form>
        </div>
    );
};

const mapStateToProps = ({ user }) => (
    {
        userName: user.name,
        p: user.p,
        v: user.v
    }
);

const mapDispatchToProps = dispatch => (
    {
        setUserName: name => dispatch(setUserName(name)),
        updateUserName: name => dispatch(updateUserName(name)),
        setCreatingTicket: bool => dispatch(setCreatingTicket(bool))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Getname);