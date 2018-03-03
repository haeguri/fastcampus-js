var counter = {
    _value: 1,
    get value(){
        return this._value;
    },
    set value(v){
        if(v < 1) return;
        else if(v > 9) return;
        this._value = v;
        document.getElementById('digit-number').innerHTML = this._value;
    },
    init: function() {
        document.getElementById('plus-btn')
            .addEventListener('click', function(e){
                counter.value += 1;
            });

        document.getElementById('minus-btn')
            .addEventListener('click', function(e) {
                counter.value -= 1;
            });
        
        document.getElementById('digit-number').innerHTML = counter.value;
    }
};

counter.init();

function createDotInputControl(digitNumber, callback){
    var inputContainer = document.querySelector('.digit-input-container'),
        inputElementText = '';

    for (var index = 0; index < digitNumber; index++) {
        inputElementText += '<input type="text" maxlength="1" class="digit-input" placeholder="•">';
    }

    inputContainer.innerHTML = inputElementText;
    
    inputContainer.addEventListener('keydown', function(e){
        var charCode = e.keyCode;
        if(e.target.className === 'digit-input'){
            if(charCode === 37 || 
               charCode === 8 ||
               charCode === 46 ||
               charCode === 39 ||
               charCode === 32) {
                    return;
               }
            
            if(!/[0-9]/.test(Number(String.fromCharCode(charCode)))) {
                e.stopPropagation();
                e.preventDefault();
            }

            if(charCode === 13 || e.target == e.target.parentElement.lastElement) {
                var arrOfInputs = Array.prototype.slice.call(e.target.parentElement.children);
                var values = arrOfInputs.map(function(v) {return v.value;}).map(function(v) {return Number(v);});
                
                arrOfInputs.forEach(function(v){
                    v.value = null;
                });
                e.target.parentElement.firstElementChild.select();
                callback.call(null, values);
            }
        }
    });

    inputContainer.addEventListener('keyup', function(e){
        var charCode = e.keyCode,
            previousElement = e.target.previousElementSibling,
            nextElement = e.target.nextElementSibling;

        if(e.target.className === 'digit-input') {
            if(previousElement){
                if(charCode === 37 ||
                    charCode === 8 ||
                    charCode === 46) {
                        previousElement.select();
                        previousElement.focus();
                    }
            }
            if(nextElement){
                if(charCode === 39 ||
                    charCode === 32){
                        nextElement.select();
                        return;
                    }

                if(e.target.value) {
                    nextElement.select();
                }
            }
        }
    });
}

function makeRandomNumbers(digit){
    var values = [];

    for(var i = 0; i < digit; i++) {
        var n;

        while(true) {
            if(values.indexOf(n = Math.floor(Math.random()*10)) >= 0){
                continue;
            } else {
                values.push(n);
                break;
            }
        }
    }

    console.log('[answer]',values);

    return values;
}

function getResult(answer, inputs){
    var strike = 0, ball = 0;

    for(var i = 0; i < answer.length; i++) {
        for(var j = 0; j < inputs.length; j++) {
            if(inputs[j] === answer[i]) {
                if(i == j) strike++;
                else ball++;
            }
        }
    }

    return strike === 0 && ball === 0 ?
           'OUT' :
           strike+'S'+ball+'B';
}

function createResultElement(numbers, result) {
    var text = '<li class="list-group-item">' +
                '<span class="guess">'+numbers+'</span>' +
                '<span class="badge result">'+result+'</span>';

    return text;
}

function gameReset() {
    var preEl = document.querySelector('.digit-input-container');
    var cloneEl = preEl.cloneNode(false);
    preEl.parentNode.replaceChild(cloneEl, preEl);

    document.querySelector('.result-container').innerHTML = '';
    document.querySelector('.digit-selector').style.display = 'block';
    document.querySelector('.main-game').style.display = 'none';
}

function startGame(digit){
    var answer = makeRandomNumbers(digit);
    var resultContainer = document.querySelector('.result-container');
    document.querySelector('.digit-selector').style.display = 'none';
    document.querySelector('.main-game').style.display = 'block';
    createDotInputControl(digit, function enterPressed(inputValues) {
        var result = getResult(answer, inputValues);

        if(result === digit+'S0B') {
            alert('정답'); 
            gameReset();
        }
        else {
            resultContainer.insertAdjacentHTML('beforeend', createResultElement(inputValues, result));
        }
    });
}

document.querySelector('#start-btn').addEventListener('click', function(e){
    e.preventDefault();
    startGame(counter.value);
});

