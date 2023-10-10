import { useState } from "react";

export const Calculator = () => {
    // State Object
    const initialState = {
        input: '0',
        operator: "",
        prevInput: 0,
        handleOpCall: 0, // The number of calls of the ?handleOperator? function     
        negative: false   
    }
    // State constants
    const [state, setState] = useState(initialState);
    // Arrays
    const numbers = [
        {
            text: 0,
            id: "zero"
        },
        {
            text: 1,
            id: "one"
        },
        {
            text: 2,
            id: "two"
        },
        {
            text: 3,
            id: "three"
        },
        {
            text: 4,
            id: "four"
        },
        {
            text: 5,
            id: "five"
        },
        {
            text: 6,
            id: "six"
        },
        {
            text: 7,
            id: "seven"
        },
        {
            text: 8,
            id: "eight"
        },
        {
            text: 9,
            id: "nine"
        }
    ];
    const operators = [
        {
            text: "+",
            id: "add"
        },
        {
            text: "-",
            id: "subtract"
        },
        {
            text: "x",
            id: "multiply"
        },
        {
            text: "/",
            id: "divide"
        }
    ];
    // FUNCTIONS    
    const clear = () => {
        setState(prevState => ({ ...prevState, ...initialState }));
    }
    const handleNumber = (event) => {
        let number = event.target.textContent;
        // Writing the first number
        if (state.input === '0') {
            if (number !== '0') {
                if (state.negative) {
                    number = '-' + number; // Parsing to negative
                }
                setState(prevState => ({ ...prevState, input: number, handleOpCall: 0 }));
            }
        } else {
            setState(prevState => ({ ...prevState, input: state.input + number, handleOpCall: 0 }));
        }
    }
    const handleDecimal = (event) => {
        let decimal = event.target.textContent;
        let counter = 0;
        let number = state.input;

        number.split('').map((x) => {
            if (x === '.') { counter++; }
        });

        if (counter < 1) {
            setState(prevState => ({ ...prevState, input: state.input + decimal, handleOpCall: 0 }));            
        }
    }
    // Calculator logic
    const calc = (op, n) => {
        let result;
        switch (op) {
            case '+':
                result = state.prevInput + n;
                break;
            case '-':
                result = state.prevInput - n;
                break;
            case 'x':
                result = state.prevInput * n;
                break;
            case '/':
                result = state.prevInput / n;
                break;
        }
        return result;
    }
    const handleOperator = (event) => {
        const number = parseFloat(state.input);
        // Variables to pass into the setInput Hook
        let nextOperator = event.target.textContent;
        let isNegative = false;
        let prev = state.prevInput;
        let outPut; // Reset the input to '0' or the result value
        let call;

        if (nextOperator !== '=') {
            call = state.handleOpCall; // Store into a variable from the prev render            
        } else {
            call = 0; // Set the handleOpCall in 0
        }

        // state.operator = prev operator
        // nextOperator = actual operator
        if (state.operator === "" || state.operator === '=') {
            // Initialize / Reboot the prevInput
            prev = number;
            outPut = '0';
        } else if (state.operator !== '=') {
            if (call === 0) { // Perform the operation ONLY if there are one call after inputing a number
                prev = calc(state.operator, number);

                if (nextOperator === '=') {
                    outPut = prev.toString();
                } else {
                    outPut = '0';
                }                    
            } else {
                if (nextOperator === '-') {
                    isNegative = true;
                    nextOperator = state.operator;
                }
                outPut = '0';
            }
        }
        const updateState = {
            input: outPut,
            prevInput: prev, 
            operator: nextOperator, 
            handleOpCall: call + 1, 
            negative: isNegative
        }
        setState(prevState => ({ ...prevState, ...updateState }));
    }
    // HTML
    return (
        <div id="container">
            <div id="calculator" className="border border-dark border-5">
                <button id="equals" onClick={handleOperator} className="calc-btn fs-5 bg-primary text-white">=</button>
                {numbers.map((number) => 
                    <button id={number.id} key={number.text} onClick={handleNumber} className="calc-btn fs-5 bg-dark text-white">{number.text}</button>
                )}
                {operators.map((op) => 
                    <button id={op.id} key={op.text} onClick={handleOperator} className="calc-btn fs-5 bg-secondary text-white">{op.text}</button>
                )}
                <button id="decimal" onClick={handleDecimal} className="calc-btn fs-5 bg-dark text-white">.</button>
                <button id="clear" onClick={clear} className="calc-btn fs-5 bg-danger text-white">AC</button>
                <div id="display" className="pt-3 fs-4 text-end border border-dark border-1">
                    {state.input}
                </div>
            </div>
        </div>
        )   
}