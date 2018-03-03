import { range } from '../util.js';
import { KEY } from '../setting.js';
import Panel from './Panel.js';

class InputPanel extends Panel {
    constructor(el, { pressEnter, right, wrong }){
        super(el);
        this.enterListener = pressEnter;
        this.rightListener = right;
        this.wrongListener = wrong;
        this.el.addEventListener('keydown', (e)=>{
            const keyCode = e.keyCode;
            if(keyCode === KEY.RIGHT ||
               keyCode === KEY.BACK ||
               keyCode === KEY.DEL || 
               keyCode === KEY.LEFT) return;
            else if(!/[0-9]/.test(String.fromCharCode(keyCode))) {
                e.preventDefault();
                e.stopPropagation();
            }
        });
        this.el.addEventListener('keyup', (e)=>{
            const keyCode = e.keyCode;
            const prevInput = e.target.previousElementSibling;
            const nextInput = e.target.nextElementSibling;
            if(prevInput &&
              (keyCode === KEY.BACK || keyCode === KEY.DEL || keyCode === KEY.LEFT)) {
                prevInput.select();
                prevInput.focus();
            }
            else if (nextInput && 
                    (keyCode === KEY.RIGHT ||
                     /[0-9]/.test(String.fromCharCode(keyCode)))) {
                nextInput.select();
            }
            else if(e.target.parentElement.lastElementChild === e.target && 
                    keyCode === KEY.ENTER) {
                this.enterListener(e);
            }
        });
    }
    get inputs(){
        return Array.prototype.slice.call(this.el.children);
    }
    makeDigits(digit){
        range(digit).forEach(_=>{
            this.el.innerHTML += '<input type="text" maxlength="1" class="digit-input" placeholder="•">';
        });
    }
}

export default InputPanel;