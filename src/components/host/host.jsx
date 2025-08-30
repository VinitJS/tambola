import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Host = () => {
    const navigate = useNavigate();
    const id = useSelector((state) => state.user.id);

    return <div className="Invite card mtm brm w100pc">
        <div className="card-body fcol faic brm bcgg tac clst pm">
            <h3>
                Enjoying?
            </h3>
            <p className="mtm">
                Host your own game and invite friends to join
            </p>
            <button 
                onClick={() => id && navigate(`/${id}`)} 
                className="btn tdnone btn-g mtm frow faic" 
                disabled={!id}
            >
                HOST MY GAME
            </button>
        </div>
    </div>
};

export default Host;