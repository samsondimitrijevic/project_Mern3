import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const words=['software', 'react', 'javascript', 'system', 'encoded', 'reset', 'brainy', 'tricky', 'moment', 'country'];


function Hangman() {

  const navigate= useNavigate();

  useEffect(()=> {
     const status= localStorage.getItem("loggedIn");
    
     if(!status){
      navigate("/")
    }
  }, []);

  const [word, setWord] = useState("");
  const [lives, setLives] = useState(7);
  const [guesses, setGuesses] = useState([]);
  const [clue, setClue]= useState([]);
  const [isStarted, setIsStarted]= useState(false);
  const [input, setInput]= useState("");

  const startGame=()=> {
     setIsStarted(true);
     selectWord();
     
  }

  const selectWord=()=> {
     const randomNumber= Math.round(Math.random() * (words.length - 1));
     const randomWord= words[randomNumber]
     let clueArray= [];

     const wordClue= randomWord.split("");   
     wordClue.forEach(w=> {
         clueArray.push("_");
     })

     setClue(clueArray);  
     setWord(randomWord);
  }


  const handleGuess=(letter)=> {
    setInput(letter);

     if(!word.includes(letter)){
        if(!guesses.includes(letter)) {
            setGuesses(oldGuesses=> {
              return [...oldGuesses, letter]
            })
            setLives(oldLives=> oldLives-1);

            setTimeout(()=> {
              if(lives === 1){
                alert(`Sorry, you lost as you have exhausted the number of lives alotted to you. The right word was: '${word}'`);
              handleReset();
              }
            }, 50)
        }
        else{
          setTimeout(()=> {
            setInput("");
         }, 500)
          return;
        }    
     }
     else{
        const wordArray= word.split("");
        for(let i= 0; i < wordArray.length; i++){
           if(wordArray[i] === letter){
                setClue(oldClue=> {
                        oldClue[i] = letter
                        return oldClue
                })
           }
        }
     }
    
     setTimeout(()=> {
        if(!clue.includes("_")){
          alert("Congratulations. You got the word correctly!")
          handleReset();
         }
    }, 50);  
    
    setTimeout(()=> {
      if(clue.includes("_") && lives !== 1){
        setInput("");
       }
    }, 200)
  }

  const handleReset=()=> {
    setWord("");
    setLives(7);
    setGuesses([]);
    setClue([]);
    startGame();
    setInput("");
  }


  return (
    <div className="hangman">
      <h1>Hangman Game</h1>
      {!isStarted && <p><button onClick={startGame}>start game</button></p>}
      {isStarted && (
      <div>
      <p>You have <b>{lives}</b>lives left.</p>
      <p>wrong guesses: {guesses.join(", ")}</p>
      <p>
        <b>Word:</b>{
        clue?.map((c, i)=> <span key={i}>{c}</span>)
        }
      </p>
      
        <input maxLength={1} type="text" value={input} onChange={(e) => handleGuess(e.target.value.toLowerCase())} />
      
      <button onClick={handleReset}>Reset</button>
      </div>
      )}
    </div>
  );
}

export default Hangman;
