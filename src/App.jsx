import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import GameHub from "./components/GameHub";
import Hangman from "./components/Hangman";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import SudokuGame from "./components/Sudoku";
import TicTacToe from "./components/TicTacToe";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/gamehub" element={<GameHub />} />
          <Route path="/hangman" element={<Hangman />} />
          <Route path="/sudoku" element={<SudokuGame />} />
          <Route path="/tictactoe" element={<TicTacToe />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
