 class Calculator {
     constructor(previousOperand, currentOperand) {
        this.previousOperand = previousOperand
        this.currentOperand = currentOperand
        this.reset()
     }

     reset = () => {
         this.firstOperand = ''
         this.secondOperand = ''
         this.operator = null
     }

    delete =  () => {

    }

    inputDigit = (digit) => {
        if (digit === '.' && this.firstOperand.includes('.')) return
        this.firstOperand = this.firstOperand.toString() + digit.toString()
    }

    chooseOperators = (operator) => {
        if (this.firstOperand === '') return
        if (this.firstOperand !== '') {
            this.compute()
        }
        this.operator = operator
        this.secondOperand = this.firstOperand
        this.firstOperand = ''
    }

    compute = () => {
        let computation
        const first = parseFloat(this.firstOperand)
        const second = parseFloat(this.secondOperand)
        if (isNaN(first) || isNaN(second)) return
       switch (this.operator) {
           case '+':
               computation = first + second
               break
            case '-':
                computation =  second - first
                break
            case '*':
                computation = first * second
                break
            case '/':
                computation = first / second
                break
            default:
                return
       } 
        this.secondOperand = computation
        this.operator = null
        this.firstOperand = ''
    }

    updateDisplay =  () => {
        this.currentOperand.innerHTML = this.firstOperand;
        this.previousOperand.innerHTML = this.secondOperand;
    }

};

const digitKeys = document.querySelector('.keys');
const deleteKeys = document.querySelector('.delete');
const display = document.querySelector('.display');
const previousOperand = document.querySelector('.first-operand');
const currentOperand = document.querySelector('.second-operand');

const calculator = new Calculator(previousOperand, currentOperand)
 
digitKeys.addEventListener('click', (event) => {
    const { target } = event;
    const value = target.getAttribute('id');
    if (target.classList.contains('digit')) {
        console.log(value);
        calculator.inputDigit(value);
       calculator.updateDisplay();
    }  
    if (target.classList.contains('operator')) {
        console.log(value);
        calculator.chooseOperators(value);
        calculator.updateDisplay();
    }
    if (target.classList.contains('reset')) {
        console.log(value);
        calculator.reset();
        calculator.updateDisplay();
    }
    if (target.classList.contains('equal_to')) {
        console.log(value);
        calculator.compute ();
        calculator.updateDisplay();
    }
 })