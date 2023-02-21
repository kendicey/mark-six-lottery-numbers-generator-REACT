import React, { useState } from 'react';
import './App.css';

const LAST_NUM_INDEX = 5;
const POSSIBLE_NUM_TOTAL = 49;

function App() {
  // set states and initialize them
  const [numbers, setNumbers] = useState([]);
  const [display, setDisplay] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [isResetShown, setIsResetShown] = useState(false);
  const [animation, setAnimation] = useState(false);

  /**
   * Generates a random number from 1 - 49
   * @function
   * @returns {number} A random integer between 1 and 49 (inclusive)
   */
  const generateNumber = () => Math.floor(Math.random() * POSSIBLE_NUM_TOTAL) + 1;

  /**
   * Generates a new number if there is a repeated number in the array
   * @function
   * @param {number} num - The number to check for repeats in the array
   * @returns {void}
   */
  const checkNumber = (num) => {
    while(numbers.indexOf(num) !== -1){
      num = generateNumber();
    }
  }

  /**
   * Generates a unique number from 1 - 49 and adds it to the numbers array
   * @function
   *  1. generate a number from 1 - 49
   *  2. check if the number repeats
   *  3. while repeats, generate a new number
   *  4. if the number does not repeat, push it to the numbers array
   *  5. disable the "generate" button and show "start again" button when there are 6 numbers generated
   * @returns {void}
*/
  const generateUniqueNumber = () => {
    if (numbers.length < LAST_NUM_INDEX){
      let num = generateNumber();
      checkNumber(num);
      numbers.push(num);
      setNumbers(numbers);
    } else if (numbers.length === LAST_NUM_INDEX) {
        let num = generateNumber();
        checkNumber(num);
        numbers.push(num);
        setNumbers(numbers);
        setIsDisabled(true);
        setIsResetShown(true);
    } 
  }

  /**
   * Handles the click event for the "generate" button
   * @function
   *  1. clear display box
   *  2. show rotate display box animation for 2 second
   *  3. generate a unique number from 1-49 after rotation animation
   *  4. disable rotation animation so it can be shown on every button's click
   *  5. display the number generated in display box
   * @returns {void}
   */
  async function handleClick() {
    setDisplay('');
    setAnimation(true);
    await new Promise(resolve => setTimeout(resolve, 2300));
    generateUniqueNumber();
    setAnimation(false);
    setDisplay(numbers[numbers.length - 1]);
  }
  
  /**
   * Handles the click event for the "start again" button after 6 numbers have been generated
   * @function
   *  1. clear display box
   *  2. clear previous random number results 
   *  3. enable the "generate" button again and hide the "start again" button
   * @returns {void}
   */
  const handleReset = () => {
    setDisplay('');
    setNumbers([]);
    setIsDisabled(false);
    setIsResetShown(false);
  }

  // return HTML codes for rendering
  return (
    <div className="App">
      <h1 id="title">Mark Six Lottery Numbers Generator</h1>
      <div id="display" className="display" style={{animation: animation ? 'mymove 2s' : 'none'}}>{display}</div>
      <div className="btn">
        <button id="button" onClick={handleClick} disabled={isDisabled}>generate</button>
        <button id="reset" onClick={handleReset} style={{ display: isResetShown ? 'inline-block' : 'none' }}>start again</button>
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