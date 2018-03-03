const APP = (_=>{
'use strict';
const KEY = {
    RIGHT: 39,
    DEL: 46,
    BACK: 8,
    LEFT: 37,
    ENTER: 13
};
const isEnterKey = keyCode => keyCode === KEY.ENTER;
const isLeftMoving = keyCode => keyCode === KEY.DEL || keyCode === KEY.BACK || keyCode === KEY.LEFT;
const isRightMoving = keyCode => keyCode === KEY.RIGHT;
const isInteger = keyCode => /[0-9]/.test(String.fromCharCode(keyCode));
const isLastElement = target => target.parentElement.lastElementChild === target;
const range = n => {
    let numbers = [];
    for(let i = 0; i < n; i++) numbers.push(i);
    return numbers;
}
const sel = s => document.querySelector(s);
const selAll = s => document.querySelectorAll(s);
const ERROR = m => {throw new Error(m)};

class Counter {
    constructor(initCnt){
        this._value = initCnt;
    }
    get value(){
        return this._value;
    }
    set value(v){
        if(v <= 0) v = 0;
        else if(v >= 9) v = 9;
        this._value = v;
    }
    plus(){
        this.value += 1;
    }
    minus(){
        this.value -= 1;
    }
}

class CounterComponent extends Counter {
    constructor(initCnt, listener){
        super(initCnt);
        this.listener = listener;
        this.listener(initCnt);
    }
    set plusBtn(btn){
        if(!(btn instanceof HTMLElement)) ERROR('parameter must be instnace of HTMLElement');
        btn.addEventListener('click', ()=>this.plus());
    }
    set minusBtn(btn){
        if(!(btn instanceof HTMLElement)) ERROR('parameter must be instance of HTMLElement');
        btn.addEventListener('click', ()=>this.minus());
    }
    plus(){
        if(this.plusBtn) ERROR('plusBtn is not defined.');
        super.plus();
        this.listener(this.value);
    }
    minus(){
        if(this.minusBtn) ERROR('minusBtn is not defined.');
        super.minus();
        this.listener(this.value);
    }
}

class Panel{
    constructor(e){
        this.elem = e;
    }
    clear(){
        this.elem.innerHTML = '';
    }
}

class InputPanel extends Panel {
    constructor(e, enterListener){
        super(e);
        this.enterListener = enterListener;
        this.elem.addEventListener('keydown', (e)=>{
            const keyCode = e.keyCode;
            if(isLeftMoving(keyCode) || isRightMoving(keyCode)) return;
            else if(!isInteger(keyCode)) {
                e.preventDefault();
                e.stopPropagation();
            }
        });
        this.elem.addEventListener('keyup', (e)=>{
            const keyCode = e.keyCode;
            const prevInput = e.target.previousElementSibling;
            const nextInput = e.target.nextElementSibling;
            if(isLeftMoving(keyCode) || isRightMoving(keyCode)) {
                if(prevInput && isLeftMoving(keyCode)){
                    prevInput.select();
                    prevInput.focus();
                }
                if(nextInput && isRightMoving(keyCode)){
                    nextInput.select();
                }
            }
            else if(nextInput && isInteger(keyCode)) {
                nextInput.select();
            }
            else if(isLastElement(e.target) && isEnterKey(keyCode)) {
                this.enterListener(e);
            }
        });
    }
    get inputs(){
        return Array.prototype.slice.call(this.elem.children);
    }
    makeDigits(digit){
        range(digit).forEach(_=>{
            this.elem.innerHTML += '<input type="text" maxlength="1" class="digit-input" placeholder="•">';
        });
    }
}

class ResultPanel extends Panel {
    constructor(){
        super();
    }
    addResult(data){
        if(!(data instanceof ResultData)) ERROR('parameter is must be instance of ResultData.')
        this.elem.innerHTML = '<li class="list-group-item">' +
                                `<span class="guess">${data.values}</span>` +
                                `<span class="badge result">${data}</span>` +
                              '</li>' +
                              this.elem.innerHTML;
    }
}

class ResultData {
    constructor(...args){
        [ this.values, this.strike, this.ball ] = args;
    }
    [Symbol.toPrimitive](hint){
        return `${this.strike}S${this.ball}`;
    }
}

class Game {
    constructor(){}
    init({start, end}){
        this.startListener = start;
        this.endListener = end;
    }
    start(){
        if(this.digits === undefined) ERROR('digits is not defined');

        const set = range(10), randoms = [];
        let randIndex;
        range(digits).forEach(v => {
            randIndex = Math.floor(Math.random()*set.length);
            randoms.push(set[randIndex]);
            set.splice(randIndex, 1);
        });
        this.answer = randoms;
        this.startListener(this.digits);
        console.log('답은 ', this.answer);
    }
    end(){
        this.endListener();
    }
    getResult(inputs){
        if(this.answer === undefined) ERROR('answer is not defined.');

        let strike = 0, ball = 0;
        this.answer.forEach((v1, i) => {
            inputs.forEach((v2, j) => {
                if(v1 !== v2) return;
                else if(i === j) strike++;
                else if(i !== j) ball++;
            })
        });
        return { strike, ball, isCorrect: strike === this.answer.length }
    }
}

return {
    init(){
        const game = new Game();
        const resultPanel = new ResultPanel(sel('.result-container'));
        const inputPanel = new InputPanel(sel('.digit-input-container', {
            pressEnterListener: e => {
                const values = inputPanel.inputs.map(i => Number(i.value));
                game.getResult(values);
            },
            answerListener: _ => {
                alert('정답');
                game.end();
            },
            wrongAnswerListener: _ => {
                inputPanel.inputs.forEach(i => i.value = null);
                inputPanel.inputs[0].select();
            }
        }));
        game.init({
            startListener(digits){
                sel('.digit-selector').style.display = 'none';
                sel('.main-game').style.display = 'block';
                inputPanel.makeDigits(game.digit);
            },
            endListener(){
                sel('.digit-selector').style.display = 'block';
                sel('.main-game').style.display = 'none';
                inputPanel.clear();
                resultPanel.clear();
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