 const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    secondNumber: null,
    isWaitForSecondNumber: false,
    holdNegative: false,
  };

  function updateDisplay() {
    document.querySelector('#display').innerText = calculator.displayNumber;
  }

  function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.secondNumber = null;
    calculator.isWaitForSecondNumber = false;
    calculator.holdNegative = false;
  }
   
  function inputDigit(digit) {
    const { displayNumber, isWaitForSecondNumber } = calculator;
    if (isWaitForSecondNumber === true) {
     if (calculator.holdNegative === true) {
         digit *= -1;
      }
      calculator.displayNumber = digit;
      calculator.isWaitForSecondNumber = false;
      calculator.holdNegative = false;
    } else {
      calculator.displayNumber = displayNumber === '0' 
      ? (calculator.displayNumber = digit)
      : (calculator.displayNumber += digit);
      console.log(digit)
    }
  }

  function inputDecimal(dot) {
    if (calculator.isWaitForSecondNumber === true) {
      calculator.displayNumber = '0.'
      calculator.isWaitForSecondNumber = false;
      return
    }
    if (!calculator.displayNumber.includes(dot)) {
      calculator.displayNumber += dot;
    }
  }

  const buttons = document.querySelectorAll('.button');
  for (const button of buttons) {
    button.addEventListener('click', function (event) {
      // mendapatkan objek elemen yang diklik
      const target = event.target;
   
      if (target.classList.contains('clear')) {
        clearCalculator();
        updateDisplay();
        return;
      }
   
      if (target.classList.contains('negative')) {
        inverseNumber();
        updateDisplay();
        return;
      }
      if (target.classList.contains('equals')) {
        handleOperator(target.innerText);
        updateDisplay();
        return;
      }
      if (target.classList.contains('decimal')) {
        inputDecimal(target.innerText);
        updateDisplay();
        return;
      }
      if (target.classList.contains('operator')) {
        console.log('operator', target.innerText);
        handleOperator(target.innerText);
        updateDisplay();
        return;
      }
      inputDigit(target.innerText);
      updateDisplay();
    });
  }

  /**
   * If the displayNumber is 0, then return nothing. Otherwise, multiply the displayNumber by -1.
   * @returns the value of the calculator.displayNumber multiplied by -1.
   */
  function inverseNumber() {
    if (calculator.isWaitForSecondNumber === true) {
      return;
    }
    calculator.displayNumber = -Math.abs(calculator.displayNumber);
  }
  
  function handleOperator(nextOperator) {
    const { firstNumber, displayNumber, operator, secondNumber} = calculator;
    const inputValue = parseFloat(displayNumber);
    if (operator && calculator.isWaitForSecondNumber) {
      /* Checking if the nextOperator is a minus sign. If it is, then it will multiply the
      displayNumber by -1. */
     if (nextOperator === "-") {
        displayNumber < 0;
        calculator.holdNegative = true;
      } else {
        calculator.holdNegative = false;
        calculator.operator = nextOperator;
        return;
      }
      console.log(calculator);
      return;
    }
    if (firstNumber == null && !isNaN(inputValue)) {
      calculator.firstNumber = inputValue;
    }  else if (operator) {
      calculator.displayNumber = parseFloat(displayNumber);
      
      

      const result = performCalculation(firstNumber, displayNumber, operator);

      calculator.displayNumber = String(result);
      calculator.firstNumber = result;
    }
    calculator.isWaitForSecondNumber = true;
    calculator.operator = nextOperator;
    console.log(calculator);
  }

  function performCalculation() {
    if (calculator.operator === "+") {
      return result = parseFloat(calculator.firstNumber) + parseFloat(calculator.displayNumber);
    } else if (calculator.operator === "-"){
      return result = parseFloat(calculator.firstNumber) - parseFloat(calculator.displayNumber);
    } else if (calculator.operator === "X") {
      return result = parseFloat(calculator.firstNumber) * parseFloat(calculator.displayNumber);
    } else if (calculator.operator === "/"){
      return result = parseFloat(calculator.firstNumber) / parseFloat(calculator.displayNumber);
    } 
      return  result = calculator.displayNumber;
    
 }