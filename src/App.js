import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Game from './components/game/Game';
import Changename from './components/changename/Changename';
import Livegame from './components/live/Livegame';
import Navbar from './components/navbar/Navbar';
import { updateUser } from './redux/user.reducer';

function App() {
  const dispatch = useDispatch();
  const name = useSelector(state => state.user.name);

  useEffect(() => {
    dispatch(updateUser());
  }, [dispatch]);

  return (
    <div className="App fcol faic">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={name ? <Game /> : <Changename />} />
          <Route path="/user" element={<Changename />} />
          <Route path="/:game_id" element={name ? <Livegame /> : <Changename />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
