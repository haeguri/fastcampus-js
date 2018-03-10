# ES6 Module System

모듈 시스템에서는 모듈에서 값을 내보면 다른 모듈에서는 그 값을 가져올 수 있다. 내보낼 수 있는 값은 문자열, 숫자같은 원시값뿐만 아니라 객체, 배열, 함수같은 참조값도 보낼 수 있다. 먼저 값을 내보내는 방법은 'export' 구문을 사용하는 것인데, 사용법에는 두 가지가 있다.

- named export
- default export

## named export/import
'named export'는 외부로 내보내는 값에 이름을 지을 수 있다.

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

import하는 모듈은 export될 때의 이름을 사용해서 값에 접근할 수 있다.

    /* index.js */
    import { PI, add, sub, multiply, module } from './calculator.js';

    console.log(PI); // 3.14
    console.log(add(1,1)); // 2
    console.log(sub(1,2)); // -1
    console.log(multiply(11, 3)); // 33
    console.log(module.version); // '0.0.0'

'named export' 구문은 반드시 문이나 선언문과 함께 사용해야 한다.

    const PI = 3.14;
    export PI; // Error
    export a*b; // Error

## default export/import
'export default'는 이름없이 값을 내보낼 수 있다. 'export default' 구문은 반드시 표현식과 함께 사용해야 한다. 

    /* calculator.js */
    export default class Calculator { };

    
    /* index.js */
    import CalculatorClass from './calculator.js';

    console.log(CalculatorClass); // class Calculator{ };

'export default' 구문은 하나의 모듈에는 한 개만 와야 한다.

    /* calculator.js */
    const add = (a, b) => a + b;
    export default 2;
    export default add; // Error!

또는 'named export'와 병행해서 사용될 수도 있다.

    /* calculator.js */
    export const PI = 3.14;
    export default class Calculator{};

    /* index.js */
    import CalculatorClass, { PI } from './calculator.js';