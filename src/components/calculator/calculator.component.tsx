import React from "react";
import './calculator.style.scss';

const Calculator: React.FC  = () => {
    return (
        <section id='calculator'>
            <div className="container">
                <div id="calculator-box">
                    <div className="screen"></div>
                    <div className="calculator-body">
                        <div className="calc-elem" id='AC'>AC</div>
                        <div className="calc-elem">/</div>
                        <div className="calc-elem">x</div>
                        <div className="calc-elem">7</div>
                        <div className="calc-elem">8</div>
                        <div className="calc-elem">9</div>
                        <div className="calc-elem">-</div>
                        <div className="calc-elem">4</div>
                        <div className="calc-elem">5</div>
                        <div className="calc-elem">6</div>
                        <div className="calc-elem">+</div>
                        <div className="calc-elem">1</div>
                        <div className="calc-elem">2</div>
                        <div className="calc-elem">3</div>
                        <div className="calc-elem">=</div>
                        <div className="calc-elem">0</div>
                        <div className="calc-elem">.</div>
                        <div className="calc-elem" id='eq'></div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Calculator;