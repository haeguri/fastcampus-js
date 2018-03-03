import Counter from './Counter.js';
import { ERROR } from '../util.js';

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

export default CounterComponent;