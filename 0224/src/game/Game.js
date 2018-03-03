import { range, ERROR } from '../util.js';

class Game {
    constructor(){}
    init({start, end, rightAnswer, wrongAnswer}){
        this.startListener = start;
        this.endListener = end;
        this.rightAnswerListener = rightAnswer;
        this.wrongAnswerListener = wrongAnswer;
        this.digits;
    }
    start(){
        if(this.digits === undefined) ERROR('digits is not defined');

        const set = range(10), randoms = [];
        let randIndex;
        // this.digits 길이만큼 랜덤한 숫자 배열 생성
        range(this.digits).forEach(v => {
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
    findResult(values){
        if(this.answer === undefined) ERROR('answer is not defined.');

        let strike = 0, ball = 0;
        this.answer.forEach((v1, i) => {
            values.forEach((v2, j) => {
                if(v1 !== v2) return;
                else if(i === j) strike++;
                else if(i !== j) ball++;
            })
        });

        if(values.length === strike) {
            this.rightAnswerListener();
        } else {
            this.wrongAnswerListener(values, `${strike}S${ball}B`);
        }
    }
}

export default Game;