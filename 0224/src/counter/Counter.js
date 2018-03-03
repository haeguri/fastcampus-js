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

export default Counter;