import CounterComponent from './counter/CounterComponent.js';
import InputPanel from './panel/InputPanel.js';
import ResultPanel from './panel/ResultPanel.js';
import Game from './game/Game.js';
import { sel } from './util.js';

const APP = (_=>{
'use strict';
return {
    init(){
        const game = new Game();
        const resultPanel = new ResultPanel(sel('.result-container'));
        const inputPanel = new InputPanel(sel('.digit-input-container'), {
            pressEnter(e){
                const values = inputPanel.inputs.map(i => Number(i.value));
                game.findResult(values);
            }
        });
        game.init({
            start(digits){
                sel('.digit-selector').style.display = 'none';
                sel('.main-game').style.display = 'block';
                inputPanel.makeDigits(game.digits);
            },
            end(){
                sel('.digit-selector').style.display = 'block';
                sel('.main-game').style.display = 'none';
                inputPanel.clear();
                resultPanel.clear();
            },
            rightAnswer(){
                alert('정답 입니다.');
                game.end();
                inputPanel.clear();
            },
            wrongAnswer(values, result){
                inputPanel.inputs.forEach(i => i.value = null);
                inputPanel.inputs[0].select();
                resultPanel.addResult({values, result});
            }
        });

        const counterComponent = new CounterComponent(3, v => {
            sel('#digit-number').innerHTML = v;
            game.digits = v;
        });
        counterComponent.minusBtn = sel('#minus-btn');
        counterComponent.plusBtn = sel('#plus-btn');

        sel('#start-btn').addEventListener('click', e=>{
            e.preventDefault();
            game.start();
        })
    }
}
})();

APP.init();