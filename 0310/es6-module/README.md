# ES6 Module import/export

ES6의 모듈 import/export를 사용하면 모듈에서 값을 내보내거나 다른 모듈에서 export된 값을 불러올 수 있다. 

## Named export

이름 있는 export는 모듈에서 여러 값을 내보낼 때 유용하다. export 뒤에는 반드시 선언문이 오거나, export할 변수들의 이름을 `{ }`로 감싸야 한다.

    /* calculator.js */

    export const PI = 3.14;
    export let add = (a, b) => a + b;
    const sub = (a, b) => a - b;
    const multiply = (a, b) => a * b;

    export const module = {
        version: '0.0.0'
    };

    export {
        sub,
        multiply
    };

다른 모듈에서는 import할 값들을 `{ }`로 감싸서 가져올 수 있다.

    /* index.js */

    import { PI, add, sub, multiply, module } from './calculator.js';

    console.log(PI); // 3.14
    console.log(add(1,1)); // 2
    console.log(sub(1,2)); // -1
    console.log(multiply(11, 3)); // 33
    console.log(module.version); // '0.0.0'

이름 있는 export 뒤에는 표현식이 올 수 없다.

    const PI = 3.14;
    export PI; // Error
    export a*b; // Error

## default export
default export는 모듈에서 이름없이 값을 내보낼 수 있으며, 한 개의 모듈에 하나만 허용이 된다. `export default` 뒤에는 표현식이 와야 한다.

```
/* calculator.js */

export default class Calculator { };
// export default class Person { }; // Error!
```
```
/* index.js */

import CalculatorClass from './calculator.js';

console.log(CalculatorClass); // class Calculator{ };
```

default export는 named export와 병행해서 사용될 수도 있다.

```
/* calculator.js */

export const PI = 3.14;
export default class Calculator{};

/* index.js */

import CalculatorClass, { PI } from './calculator.js';
```