const forEach = (list, f) => {
    for(let i = 0; i < list.length; i++) f(list[i], i);
    return list;
}

const map = (list, f) => {
    const result = [];
    forEach(list, (v, i) => {
        result.push(f(v, i))
    });
    return result;
}

const filter = (list, p) => {
    const result = [];
    forEach(list, (v, i) => {
        if(p(v, i)) result.push(v);
    })
    return result;
}

const reduce = (list, reducer, init) => {
    let result = init || list[0];

    for(let i = 1; i < list.length; i++) {
        result = reducer(result, list[i]);
    }

    return result;
}

const pipe = (...args) => reduce(args, (p, f) => f(p));
const currying = (f) => {
    const length = f.length;

    return function curried(arg){
        const args = [];
        let i = 0;
        const result = arg => {
            console.log(args, arg, i);
            args.push(arg);
            return ++i === length ? f(...args) : result;
        }
        
        // args.push(arg);
        // return ++i === length ? f(...args) : result;
        return result(arg);
    }
}

const getVAT = (rate, amount) => amount * (1 + rate / 100);

const getVATCurried = currying(getVAT);
const getNationalVAT = getVATCurried(5);
const getStateVAT = getVATCurried(2);

console.log(getNationalVAT(1000));
console.log(getStateVAT(1500));

const sample = [0, 1, 2];
const value = reduce(
                filter(
                    map(sample, num => Math.pow(num, 2)), 
                    num => num >= 2
                ),
              (p, c) => p + c);

console.log(
    'pipe result', 
    pipe(
        filter(sample, v => v >= 2),
        filtered => map(filtered, v => v ** 2),
        mapped => reduce(mapped, (p, c) => p + c)
    )
)

const personInfo = [
    {name: 'Joe'}, {age: 31}, {birthday: '1/1/2018'}
];

console.log(value);
console.log(reduce(personInfo, (p, c) => Object.assign({}, p, c)));