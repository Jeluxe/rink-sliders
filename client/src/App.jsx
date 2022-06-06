import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import io from 'socket.io-client';
import Board from './components/board';
import Home from './components/home';
import WaitingPage from './components/waiting-page';
import Title from './components/title';


function App() {
  const socket = io();

  return (
    <Router>
      <div className="App">
        <Title socket={socket} />
        <Routes>
          <Route exact path="/" element={<Home socket={socket} />} />
          <Route path="/waiting-page" element={<WaitingPage socket={socket} />} />
          <Route path="game/:id" element={<Board socket={socket} />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </div>
    </Router >
  );
}

export default App;