# ES6 Module System

export 구문을 사용하면 자바스크립트 모듈의 일부를 외부 모듈에서 사용할 수 있도록 내보낼 수 있다. 내보낼 수 있는 값은 문자열, 숫자 같은 원시값과 객체, 배열, 함수와 같은 참조값도 보낼 수 있다. 모듈 export 구문의 사용법에는 두 가지가 있다.
- named export
- default export

## named export/import
'named export'에는 외부로 내보내는 값에 이름을 붙인다. 

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

import하는 모듈은 해당 모듈의 값에 접근하기 위해서는 export된 이름을 사용해야 한다.

    /* index.js */
    import { PI, add, sub, multiply, module } from './calculator.js';

    console.log(PI); // 3.14
    console.log(add(1,1)); // 2
    console.log(sub(1,2)); // -1
    console.log(multiply(11, 3)); // 33
    console.log(module.version); // '0.0.0'

'named export'에는 반드시 선언문을 작성해야 하며 표현식은 올 수 없다.

    const PI = 3.14;
    export PI; // Error
    export a*b; // Error

## default export/import
'export default'는 이름없이 값을 내보낼 수 있다. 'export default'는 'named export'와 반대로 표현식만 내보낼 수 있고, 하나의 모듈에는 한 개의 'export default'만 올 수 있다.

    /* calculator.js */
    export default class Calculator { };

    
    /* index.js */
    import CalculatorClass from './calculator.js';

    console.log(CalculatorClass); // class Calculator{ };

'named export'와 병행해서 사용될 수도 있다.

    /* calculator.js */
    export const PI = 3.14;
    export default class Calculator{};

    /* index.js */
    import CalculatorClass, { PI } from './calculator.js';