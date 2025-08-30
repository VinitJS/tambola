import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../redux/user.reducer';

const Changename = () => {
    const [inputName, setInputName] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const name = useSelector(state => state.user.name);
    const total_points = useSelector(state => state.user.total_points);
    const total_stars = useSelector(state => state.user.total_stars);

    useEffect(() => {
        if (name) {
            setInputName(name);
        }
    }, [name]);

    const handleChange = ({ target }) => {
        setInputName(target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = inputName.trim()
        if (!name) return;
        dispatch(updateUser({ name }));
        navigate(-1);
    };

    return (
        <div className="Changename ma tac pm">
            {
                name && <>
                    <div className="frow">
                        <div className="w100pc ms">
                            <p className="cl b">Points</p>
                            <p className='bcly pxl brm fsxxl cy b'>{total_points}</p>
                        </div>
                        <div className="w100pc ms">
                            <p className="cl b">Full House</p>
                            <p className='bcly pxl brm fsxxl cy b'>{total_stars}</p>
                        </div>
                    </div>
                </>
            }
            <form onSubmit={handleSubmit} className="fcol">
                <input className="textbox" type="text" onChange={handleChange} value={inputName} placeholder="Enter Name" />
                <div className='frow fjcc'>
                    <button type="button" className="btn btn-l mm" onClick={() => navigate(-1)}>Cancel</button>
                    <button type="submit" className="btn btn-y mm">Update</button>
                </div>
            </form>
            <p className="co fss">Updated name will be visible next game onwards</p>
        </div>
    );
};

export default Changename;