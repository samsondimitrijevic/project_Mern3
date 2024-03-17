import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function TicTacToe() {
  const navigate= useNavigate();

  useEffect(()=> {
     const status= localStorage.getItem("loggedIn");
    
     if(!status){
      navigate("/")
    }
  }, []);

  const [board, setBoard] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  const [turn, setTurn] = useState("");
  const [isStarted, setIsStarted]= useState(false);

  const chooseStarter=()=> {
      const players= ["X", "O"];  
      const randomNumber= Math.round(Math.random());
      setTurn(players[randomNumber]);
  }

  const startGame=()=> {
      resetGame();

      setIsStarted(true);
      chooseStarter();
  }

  const resetGame=()=> {
     setBoard([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ])
  }

  const handleClick=(row, col)=> {
    if (board[row][col] !== null) {
      return;
    }

    const newBoard = [...board];
    newBoard[row][col] = turn;
    setBoard(newBoard);
    setTurn(turn === "X" ? "O" : "X");

    setTimeout(()=> {
      if (hasWon(newBoard, turn)) {
        alert(`Player ${turn} wins!`);
      startGame();
      setIsStarted(false);
    }  
    if (!hasWon(newBoard, turn) && isBoardFull(newBoard)) {
      alert("It's a tie!");
      startGame();
      setIsStarted(false);
    }
    }, 50)
  
  }

  const hasWon=(board, turn)=> {
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] === turn &&
        board[i][1] === turn &&
        board[i][2] === turn
      ) {
        return true;
      }
      if (
        board[0][i] === turn &&
        board[1][i] === turn &&
        board[2][i] === turn
      ) {
        return true;
      }
    }
    if (board[0][0] === turn && board[1][1] === turn && board[2][2] === turn) {
      return true;
    }
    if (board[0][2] === turn && board[1][1] === turn && board[2][0] === turn) {
      return true;
    }
    return false;
  }

  const isBoardFull=(board)=> {
 
    for (let row of board) {
      for (let cell of row) {
        if (cell === null) {
          return false;
        }
      }
    }

     return true;
  }


  return (
    <div>
      <h1>TicTacToe Game</h1>
       {!isStarted && <p><button onClick={startGame}>start game</button></p>}
      
      {isStarted && 
      (<>
      <div className="board-row">
        <p>It is player <b>{turn}</b>'s turn</p>
        {
        board.map((row, index)=> (
          <div key={index} className="row">
            {
            row.map((cell, i)=> (
              <div className="ttt-tile" key={i} onClick={()=> handleClick(index, i)}>{cell}</div>
            ))
            }
          </div>
        ))  
        }
      </div>
       <p><button onClick={resetGame}>Reset</button></p>
       </>
      )}
    </div>
  );
}

export default TicTacToe;
