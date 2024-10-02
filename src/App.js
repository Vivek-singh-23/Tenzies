  import React, { useState } from 'react';
  import {nanoid} from 'nanoid'
  import './App.css';
  import Dice from './components/Dice';
  import Confetti from 'react-confetti'

  function App() {
      
    const[dice,setDice]=useState(allNewDice())
    const[tenzies,setTenzies]=useState(false)

    React.useEffect(()=>{
        const allHeld=dice.every(die=>die.isHeld)
        const firstValue=dice[0].value
        const allSameValue=dice.every(die=>die.value===firstValue)
        if(allSameValue && allHeld){
          setTenzies(true)
        }
        console.log("Dice state changed")
    },[dice])


    function generateNewDie(){
      return{
        value:Math.ceil(Math.random()*6),
        id: nanoid(),
        isHeld:false
      }
    }
    function allNewDice() {
      const arr = [];  
      for (let i = 0; i < 10; i++) {
        
        arr.push(generateNewDie());
      }
      return arr;
    }
    

    function rollDice(){
      if(!tenzies){
        setDice(oldDice=> oldDice.map(die=>{
          return die.isHeld ? die : generateNewDie()
        }))
      }else{
        setTenzies(false)
        setDice(allNewDice())
      }
    } 
    
    function holdDice(id){
      setDice(oldDice=>oldDice.map(die=>{
        return die.id===id ? {...die,isHeld:!die.isHeld} : die
      }))
    }
    

    const diceElements=dice.map(die=><Dice value={die.value} key={die.id}  isHeld={die.isHeld}  holdDice={()=>holdDice(die.id)}/>)
    
    return (
      <main>
        <div className='Confetti'>{tenzies && <Confetti/>}</div>
          <h1 className='main--header--glow'>Tenzies</h1>
          <p className='main--text'>Roll untill  number on  all dice are same.Click each die to freeze it at its current value between rolls </p>
          <div className="dice-container">
          {diceElements}
          </div>
        <button className=" roll--btn" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
      </main>
    );
  }

  export default App;
