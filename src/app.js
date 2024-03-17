import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import TicTacToe from "./components/TicTacToe";
import Hangman from "./components/Hangman";
import Sudoku from "./components/Sudoku";
import GameHub from "./components/GameHub";
import api from "./api";
import "./App.css";

function App() {
  function App() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">GameHub</Link>
              </li>
              <li>
                <Link to="/hangman">Hangman</Link>
              </li>
              <li>
                <Link to="/sudoku">Sudoku</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/tictactoe">
              <TicTacToe />
            </Route>
            <Route path="/hangman">
              <Hangman />
            </Route>
            <Route path="/sudoku">
              <Sudoku />
            </Route>
            <Route path="/">
              <GameHub />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
