function primeIterator(){
    const isPrime = (n) => {
        if(n < 2) {
            return false;
        } else {
            for(let i = 2; i < n; i++) if(n % i === 0) return false;
        }
        return true;
    };
    const limit = 5;
    let curr = 1;
    return {
        next(){
            if(!isPrime(++curr)) this.next();
            return {
                done: curr > limit,
                value: curr
            }
        }
    }
}

const primeIterable = {
    [Symbol.iterator]: primeIterator
}

export default primeIterable;