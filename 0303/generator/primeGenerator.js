function *primeGenerator(){
    const isPrime = (n) => {
        if(n < 2) {
            return false;
        } else {
            for(let i = 2; i < n; i++) if(n % i === 0) return false;
        }
        return true;
    };

    const limit = 100;
    let curr = 1;

    while(++curr <= limit) {
        if(isPrime(curr)) {
            yield curr;
        }
    }
}

export default primeGenerator;