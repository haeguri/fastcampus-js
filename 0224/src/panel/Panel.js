class Panel{
    constructor(el){
        this.el = el;
    }
    clear(){
        this.el.innerHTML = '';
    }
}

export default Panel;