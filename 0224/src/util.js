const range = n => {
    let numbers = [];
    for(let i = 0; i < n; i++) numbers.push(i);
    return numbers;
};
const sel = s => document.querySelector(s);
const selAll = s => document.querySelectorAll(s);
const ERROR = m => {throw new Error(m)};

export { 
    range,
    sel,
    selAll,
    ERROR
};