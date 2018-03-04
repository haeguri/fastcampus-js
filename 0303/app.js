import primeIterable from './iterator/primeIterator.js';
import primeGenerator from './generator/primeGenerator.js';


console.log('....iterator.....');
for(let n of primeIterable) {
    console.log(n);
}

console.log('....generator....');
for(let number of primeGenerator()) {
    console.log(number);
}