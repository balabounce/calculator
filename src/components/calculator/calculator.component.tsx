import React, { useState } from "react";
import './calculator.style.scss';

const Calculator: React.FC  = () => {
    const [storyText, setStoryText] = useState('');
    const [bodyText, setBodyText] = useState('0');

    const multAndDiv = (operation: string, array: (string | number)[]): (string | number)[] => {
        const index = array.indexOf(operation);
        const a = array[index-1] as number;
        const b = array[index+1] as number;
        let result: number = 0;
        if(operation === '/') {
            result = a/b;
        } 
        if(operation === '*') {
            result = a*b;
        }
        if(operation === '+') {
            result = a+b;
        }
        if(operation === '-') {
            result = a-b;
        }
        array.splice(index-1,3, result);
        return array
    }

    const toCalc = () => {
        let expression = bodyText.split(/(-|\+|\*|\/)/g) as (string|number)[];
        if(expression.indexOf('') !== -1 && expression[1] !== '-') {
            if(expression[expression.indexOf('')-1] === '*') {
                const index = expression.indexOf('');
                console.log(expression);
                const neg = -expression[index+2];
                expression.splice(index, 2, `${neg}`);
            } else {
                return false;
            }
        }
        expression = expression.filter(str => str !== '');
        if(expression[0] === '-') {
            expression[1] = `-${expression[1]}`;
            expression = expression.slice(1);
        }
        expression = expression.map(word => {
            if(/\d/.test(`${+word}`)) {
                return +word;
            } else {
                return word;
            }
        });
        
        let result: (number|string)[];

        while(expression.indexOf('*') !== -1 || expression.indexOf('/') !== -1 || expression.indexOf('+') !== -1 || expression.indexOf('-') !== -1) {
            if(expression.indexOf('*') !== -1 && expression.indexOf('/') !== -1) {
                if(expression.indexOf('*') < expression.indexOf('/')) {
                    result =  multAndDiv('*', expression);
                } else {
                    result =  multAndDiv('/', expression);
                }
                expression = result;
            }
    
            if(expression.indexOf('*') !== -1 ) {
                expression = multAndDiv('*', expression);
            }
    
            if(expression.indexOf('/') !== -1 ) {
                expression = multAndDiv('/', expression);
            }
    
            if(expression.indexOf('+') !== -1 && expression.indexOf('-') !== -1 ) {
                if(expression.indexOf('+') < expression.indexOf('-')) {
                    result =  multAndDiv('+', expression);
                } else {
                    result =  multAndDiv('-', expression);
                }
                expression = result;
            }
    
            if(expression.indexOf('+') !== -1 ) {
                expression = multAndDiv('+', expression);
            }
    
            if(expression.indexOf('-') !== -1 ) {
                expression = multAndDiv('-', expression);
            }
        }
       
        setBodyText(`${expression[0]}`);
    }

    const toScreen = (text: string): void => {
        let tempText = bodyText + text;
        if(bodyText === '0' && text !== '.' ) {
            setBodyText(text);
            tempText = text;
        }
        tempText = tempText.replace(/\.\.+/g, '.');
        tempText = tempText.replace(/\/\/+/g, '/');
        tempText = tempText.replace(/\*\*+/g, '*');
        tempText = tempText.replace(/--+/g, '-');
        tempText = tempText.replace(/\+\++/g, '+');
        tempText = tempText.replace(/(-|\+|\*|\/)(\+|\*|\/)+/g, '$2');
        tempText = tempText.replace(/\.(-|\+|\*|\/)/g, '.0$1');
        tempText = tempText.replace(/(-|\+|\*|\/)\./g, '$1');
        tempText = tempText.replace(/(\.[0-9]+)\./g, '$1');
        const test =/[0-9]*.?/g.test(tempText); 
        if(test && bodyText.length <= 22) {
            setBodyText(tempText);
        }
    }

    const clicked = (box: string): void => {
        const boxElem: HTMLElement = document.querySelector(box) as HTMLElement;
        const boxText = boxElem.querySelector('p')!.textContent!;
        boxElem.classList.add('clicked');
        setTimeout(() => {
            boxElem.classList.remove('clicked');
        }, 100);
        if(boxText !== 'AC' && boxText !== '=') {
            toScreen(boxText);
        } else if (boxText === 'AC') {
            setStoryText('');
            setBodyText('0');
        } else {
            toCalc();
        }
    }

    return (
        <section id='calculator'>
            <div className="container">
                <div id="calculator-box">
                    <div className="screen">
                        <div className="story"> 
                            <p>
                                {storyText}
                            </p> 
                        </div>
                        <div className="screen-body">
                            <p>
                                {bodyText}
                            </p> 
                        </div>
                    </div>
                    <div className="calculator-body">
                        <button className="calc-elem box-1" id='AC' onClick={() => {
                            clicked('.box-1');
                        }}><p>AC</p></button>
                        <button className="calc-elem box-2" onClick={() => clicked('.box-2')}><p>/</p> </button>
                        <button className="calc-elem box-3" onClick={() => clicked('.box-3')}><p>*</p> </button>
                        <button className="calc-elem box-4" onClick={() => clicked('.box-4')}><p>7</p> </button>
                        <button className="calc-elem box-5" onClick={() => clicked('.box-5')}><p>8</p> </button>
                        <button className="calc-elem box-6" onClick={() => clicked('.box-6')}><p>9</p> </button>
                        <button className="calc-elem box-7" onClick={() => clicked('.box-7')}><p>-</p> </button>
                        <button className="calc-elem box-8" onClick={() => clicked('.box-8')}><p>4</p> </button>
                        <button className="calc-elem box-9" onClick={() => clicked('.box-9')}><p>5</p> </button>
                        <button className="calc-elem box-10" onClick={() => clicked('.box-10')}><p>6</p> </button>
                        <button className="calc-elem box-11" onClick={() => clicked('.box-11')}><p>+</p> </button>
                        <button className="calc-elem box-12" onClick={() => clicked('.box-12')}><p>1</p> </button>
                        <button className="calc-elem box-13" onClick={() => clicked('.box-13')}><p>2</p> </button>
                        <button className="calc-elem box-14" onClick={() => clicked('.box-14')}><p>3</p> </button>
                        <button className="calc-elem box-15" onClick={() => clicked('.box-15')}><p>=</p> </button>
                        <button className="calc-elem box-16" onClick={() => clicked('.box-16')}><p>0</p> </button>
                        <button className="calc-elem box-17" onClick={() => clicked('.box-17')}><p>.</p> </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Calculator;