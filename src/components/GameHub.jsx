import React from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function GameHub() {
  const navigate= useNavigate();

  useEffect(()=> {
     const status= localStorage.getItem("loggedIn");
    
     if(!status){
      navigate("/")
    }
  }, [])
 

  return (
    <div className="home">
      <h1>Game Hub</h1>
      <ul>
        <li>
          <Link to="/tictactoe">TicTacToe Game</Link>
        </li>
        <li>
          <Link to="/hangman">Hangman Game</Link>
        </li>
        <li>
          <Link to="/sudoku">Sudoku Game</Link>
        </li>
      </ul>
    </div>
  );
}

export default GameHub;
