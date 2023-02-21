import React, { useState } from 'react';
import './App.css';

function App() {
  // set states and initialize them
  const [numbers, setNumbers] = useState([]);
  const [display, setDisplay] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [isResetShown, setIsResetShown] = useState(false);
  const [animation, setAnimation] = useState(false);

  // function to generate a unique number from 1 - 49
  const generateNumber = () => {
    if (numbers.length < 5){
      let num = Math.floor(Math.random() * 49) + 1;
      // make sure the new number generated does not exist in the existing array
      while(numbers.indexOf(num) !== -1){
        num = Math.floor(Math.random() * 49) + 1;
      }
      numbers.push(num);
      setNumbers(numbers);
    } else if (numbers.length == 5) {
        let num = Math.floor(Math.random() * 49) + 1;
        while(numbers.indexOf(num) !== -1){
          num = Math.floor(Math.random() * 49) + 1;
        }
        numbers.push(num);
        setNumbers(numbers);
        // disable the "generate" button and show "start again" button when there are 6 numbers generated
        setIsDisabled(true);
        setIsResetShown(true);
    } 
  }

  // when the "generate" button is clicked
  const handleClick = () => {
    // clear display box
    setDisplay('');
    // show rotate display box animation for 2 second
    setAnimation(true);
    // generate a unique number from 1-49 after rotation animation
    setTimeout(generateNumber, 2300);
    // then disable rotation animation so it can be shown on every button's click
    setTimeout(() => setAnimation(false), 2300);
    // finally, display the number generated in display box
    setTimeout(() => setDisplay(numbers[numbers.length-1]), 2300);
  }

  // when the "start again" button is clicked after 6 numbers have been generated 
  const handleReset = () => {
    // clear display box
    setDisplay('');
    // clear previous random number results 
    setNumbers([]);
    // enable the "generate" button again and hide the "start again" button
    setIsDisabled(false);
    setIsResetShown(false);
  }

  // return HTML codes for rendering
  return (
    <div className="App">
      <h1 id="title">Mark Six Lottery Numbers Generator</h1>
      <div id="display" className="display" style={{animation: animation ? 'mymove 2s' : 'none'}}>{display}</div>
      <div className="btn">
        <button id="button" onClick={handleClick} disabled={isDisabled}>GENERATE</button>
        <button id="reset" onClick={handleReset} style={{ display: isResetShown ? 'inline-block' : 'none' }}>START AGAIN</button>
      </div>
      <div className="numberContainer">
        {numbers.map((num, index) => (
          <div key={index} className="numbers">
            {num}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;