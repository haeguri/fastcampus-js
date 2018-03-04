function primeIterator(){
    const isPrime = (n) => {
        if(n < 2) return false;
        else for(let i = 2; i < n; i++) if(n % i === 0) return false;
        return true;
    };
    const limit = 100;
    let curr = 2;
    return {
        next: () => {
            while(curr <= limit && !isPrime(curr)) { curr++ }
            return {
                done: curr > limit,
                value: curr++
            }
        }
    }
}

const primeIterable = {
    [Symbol.iterator]: primeIterator
}

export default primeIterable;