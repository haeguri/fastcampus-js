import Panel from './Panel.js';

class ResultPanel extends Panel {
    constructor(el){
        super(el);
    }
    addResult({ values, result }){
        this.el.innerHTML = '<li class="list-group-item">' +
                                `<span class="guess">${values}</span>` +
                                `<span class="badge result">${result}</span>` +
                            '</li>' +
                            this.el.innerHTML;
    }
}

export default ResultPanel;