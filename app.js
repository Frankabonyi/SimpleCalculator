 class Calculator {
     constructor(previousOperand, currentOperand) {
        this.previousOperand = previousOperand;
        this.currentOperand = currentOperand;
        this.reset();
     }
     // clearing all the inputed values
     reset() {
         this.firstOperand = '';
         this.secondOperand = '';
         this.operator = null;
     }

     // deleting values from the last to the first
    delete() {
        this.firstOperand = this.firstOperand.toString().slice(0, -1);
    }

    // Used to key in digits and decimal
    inputDigit(digit) {
        if (digit === '.' && this.firstOperand.includes('.')) return;
        this.firstOperand = this.firstOperand.toString() + digit.toString();
    }

    chooseOperators(operator) {
        if (this.firstOperand === '') return;
        if (this.secondOperand !== '') {
            this.calculate();
        }
        this.operator = operator
        this.secondOperand = this.firstOperand;
        this.firstOperand = '';
    }

    // performs the simple arithmetic computations
    calculate() {
        let result;
        const second = parseFloat(this.secondOperand);
        const first = parseFloat(this.firstOperand);
        if (isNaN(first) || isNaN(second)) return
        switch (this.operator) {
           case '+':
               result = first + second;
               break
            case '-':
                result =  second - first;
                break
            case '×':
                result = first * second;
                break
            case '÷':
                result = second / first ; 
                break
            default:
                return;
       } 
        this.firstOperand = result;
        this.operator = '';
        this.secondOperand = '';
    }

    // Displays input values and results on the screen
    updateDisplay() {
        this.currentOperand.innerHTML = this.firstOperand;
        if (this.operator !== null) {
            this.previousOperand.innerHTML = 
            `${this.secondOperand} ${this.operator}`;
            return;
        }
        this.operator = '';
        this.secondOperand = '';
    }

}
 
const digitKeys = document.querySelector('.keys');
const previousOperand = document.querySelector('.first-operand');
const currentOperand = document.querySelector('.second-operand');

// Declaring the calculator object
const calculator = new Calculator(previousOperand, currentOperand);
 
digitKeys.addEventListener('click', (event) => {
    const { target } = event;
    const value = target.getAttribute('id');
   
    if (target.classList.contains('digit')) {
        calculator.inputDigit(value);
        calculator.updateDisplay();
    }  
    if (target.classList.contains('operator')) {
        calculator.chooseOperators(value);
        calculator.updateDisplay();
    }
    if (target.classList.contains('reset')) {
        calculator.reset();
        calculator.updateDisplay();
    }
    if (target.classList.contains('equal_to')) {
        calculator.calculate();
        calculator.updateDisplay();
    }
    if (target.classList.contains('delete')) {
        calculator.delete();
        calculator.updateDisplay();
    }
 })