import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import sudoku from "sudoku";

function SudokuGame() {
  const navigate = useNavigate();

  useEffect(() => {
    const status = localStorage.getItem("loggedIn");

    if (!status) {
      navigate("/");
    }

    console.log("Hello");
  }, []);

  const [sudokuBoard, setSudokuBoard] = useState([]);
  const [solved, setSolved] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [disable, setDisable] = useState(true);
  const [puzzleSolution, setPuzzleSolution] = useState([]);

  const startGame = () => {
    const newBoard = sudoku.makepuzzle();
    setSudokuBoard(newBoard);

    const solution = sudoku.solvepuzzle(newBoard);
    setPuzzleSolution(solution);

    setIsStarted(true);
  };

  const handleCellChange = (index, value) => {
    setSudokuBoard((oldBoard) => {
      oldBoard[index] = value === "" ? null : parseInt(value) - 1;
      return oldBoard;
    });

    setTimeout(() => {
      if (!sudokuBoard.includes(null)) {
        setDisable(false);
      } else {
        setDisable(true);
      }
    }, 20);
  };

  const validateGame = () => {
    let puzzleSolved = true;

    for (let i = 0; i < sudokuBoard.length; i++) {
      if (sudokuBoard[i] !== puzzleSolution[i]) {
        puzzleSolved = false;
      }
    }

    if (puzzleSolved) {
      alert("Congrats, you won!");

      restartGame();
    } else {
      alert("Sorry, you lost as the puzzle was not solved correctly!");
      const response = confirm("Would you like to keep trying ?");

      if (response) {
        return;
      } else {
        setSolved(true);
      }
    }
  };

  const restartGame = () => {
    setDisable(true);
    setIsStarted(false);
    setSolved(false);
  };

  return (
    <div className="sudoku">
      <h1>Sudoku Game</h1>
      {!isStarted && <button onClick={startGame}>New Puzzle</button>}
      <div className="puzzle">
        {!solved && isStarted && (
          <>
            <p>Please enter numbers between 1 and 9 ONLY!</p>
            <div className="sudoku-board">
              {sudokuBoard.map((row, index) => {
                let customRight = "";
                let customBottom = "";

                if (
                  index === 2 ||
                  index === 5 ||
                  index === 11 ||
                  index === 14 ||
                  index === 20 ||
                  index === 23 ||
                  index === 29 ||
                  index === 32 ||
                  index === 38 ||
                  index === 41 ||
                  index === 47 ||
                  index === 50 ||
                  index === 56 ||
                  index === 59 ||
                  index === 65 ||
                  index === 68 ||
                  index === 74 ||
                  index === 77
                ) {
                  customRight = "right";
                }
                if (index > 17 && index < 27) {
                  customBottom = "bottom";
                }
                if (index > 44 && index < 54) {
                  customBottom = "bottom";
                }
                return (
                  <input
                    /* disabled={row !== null} */
                    className={`tile ${customRight} ${customBottom}`}
                    key={index}
                    type="number"
                    min="1"
                    max="9"
                    defaultValue={row === null ? "" : row + 1}
                    onChange={(e) => {
                      if (e.target.value < 1 || e.target.value > 9) {
                        e.target.value = "";
                        handleCellChange(index, (e.target.value = ""));
                        return;
                      }
                      handleCellChange(index, e.target.value);
                    }}
                  />
                );
              })}
            </div>
            <p>
              <button onClick={validateGame} disabled={disable}>
                Validate puzzle
              </button>
              <button onClick={() => setSolved(true)}>start a new game</button>
            </p>
          </>
        )}
      </div>

      <div className="solved-puzzle">
        {solved && (
          <>
            <p className="solution">Here is the solution to the puzzle</p>
            <>
              <div className="sudoku-board">
                {puzzleSolution.map((row, index) => {
                  let customRight = "";
                  let customBottom = "";

                  if (
                    index === 2 ||
                    index === 5 ||
                    index === 11 ||
                    index === 14 ||
                    index === 20 ||
                    index === 23 ||
                    index === 29 ||
                    index === 32 ||
                    index === 38 ||
                    index === 41 ||
                    index === 47 ||
                    index === 50 ||
                    index === 56 ||
                    index === 59 ||
                    index === 65 ||
                    index === 68 ||
                    index === 74 ||
                    index === 77
                  ) {
                    customRight = "right";
                  }
                  if (index > 17 && index < 27) {
                    customBottom = "bottom";
                  }
                  if (index > 44 && index < 54) {
                    customBottom = "bottom";
                  }
                  return (
                    <input
                      disabled
                      className={`tile ${customRight} ${customBottom}`}
                      key={index}
                      defaultValue={row === null ? "" : row + 1}
                      onChange={(e) => handleCellChange(index, e.target.value)}
                    />
                  );
                })}
              </div>
              <p>
                <button onClick={restartGame}>start a new game</button>
              </p>
            </>
          </>
        )}
      </div>
    </div>
  );
}

export default SudokuGame;
