import React from "react";
import { useSelector } from "react-redux";
import "./Celebration.css";

const Celebration = () => {
  const message = useSelector(state => state.game.message);
  if (!message) return null;
  return (
    <div className="Celebration mtm w100pc">
      <div className="card-body fsxl pxl tac brm bcgg">
        {message.split(' ').join("\n")}
      </div>
    </div>
  );
};

export default Celebration;