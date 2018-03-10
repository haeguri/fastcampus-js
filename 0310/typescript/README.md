# TypeScript

타입스크립트는 동적 타입 언어인 자바스크립트를 확장한 언어로 개발 단계에서 데이터의 타입을 제한할 수 있으며, Enum, 인터페이스, 접근 제어자 등의 확장 기능들도 제공한다. 타입스크립트 컴파일러는 기본적으로 최신 ES6 이상의 자바스크립트 코드를 폴리필해주기 때문에 'babel'과 같은 도구를 별도로 사용하지 않아도 된다.

---
## 설치 및 실행
1. `npm install -g typescript`

2. 프로젝트 폴더 및 `tsconfig.json` 파일 생성
```
    {
        "include": [
            "src/**/*.ts"
        ],
        "exclude": [
            "node_modules"
        ],
        "compilerOptions": {
            "outDir": "dist",
            "module": "commonjs",
            "rootDir": "src",
            "target": "es5",
            "sourceMap": true
        }
    }
```
- includes: 컴파일할 타입스크립트 파일 목록
- exclude: 컴파일 대상에서 제외할 파일 목록
- compilerOptions
    - outDir: 컴파일된 자바스크립트 파일이 출력될 경로
    - module: 모듈 시스템 스타일
    - rootDir: 컴파일하게 될 소스코드의 루트 경로
    - target: 폴리필 할 자바스크립트의 버전
    - sourceMap: 소스맵 파일의 추가 생성 여부

2. 컴파일 테스트를 위한 타입스크립트 파일(`src/index.ts`) 생성

3. 터미널에서 `tsconfig.json` 파일이 있는 경로로 이동한 후 `tsc` 혹은 `tsc --watch` 명령어 실행

4. 실행 후 프로젝트 구조

    ```
    - dist/
        - index.js
        - index.js.map
    - src/
        - index.ts
    - tsconfig.json
    ```
---

## 데이터 타입

타입스크립트로 강제할 수 있는 데이터 타입의 목록

- 기본 자바스크립트 데이터 타입
    - undefined
    - null
    - boolean
    - string
    - number
    - object
    - symbol

- 타입스크립트에서 추가된 데이터 타입
    - any
    - void
    - never
    - enum
    - tuple

---
## 타입 강제

타입 강제는 `:type_name` 형식으로 이뤄지며, 선언된 변수의 타입과 다른 타입이 할당될 경우 컴파일러에서 에러를 발생시킨다. 

### 변수
```
// boolean
let b: boolean = false;
b = true;
// b = 1; // Error!

// number
let n: number = 3;
n = 5;
// n = '123'; Error.

// string
let s: string = '123';
s = 'hello, world';
// s = {}; Error.

// any
let a: any = 123;
a = 'string';
a = {};
a = false;

// array
let numArr: number[] = [1,2,3];
let strArr: string[] = ['1','2','3'];
// numArr = [1,'2',3]; // Error.
// strArr = ['1','2',3]; // Error.
```

### 함수
```
let add = (n1: number, n2: number):number => n1 + n2;
add(3, 3) // 6;

// add('3', 3) // Error
// add = (n1: number, n2: number):string => n1 + n2; // Error
```
### 클래스 멤버

타입스크립트에서는 클래스의 생성자 밖에서 멤버 변수를 정의할 수 있으며, 멤버 변수의 타입도 강제할 수 있다.
```
class Player {
    id: string;
    level: number;

    constructor(id: string, level: number) {
        this.id = id;
        this.level = level;   
    } 
}
```
## 접근제어자
클래스 멤버 변수에 대한 `public`, `private`, `protected`와 같은 '접근 제어자'를 지정할 수 있고, 디폴트 접근 제어자는 `public`.

- public: 선언된 클래스, 상속받은 클래스, 클래스의 인스턴스에서 접근 가능.
- protected: 선언된 클래스, 상속받은 클래스에서 접근 가능.
- private: 선언된 클래스에서만 접근 가능.


```
class ParentPlayer {
    public id: string;
    private level: number;
    protected items: string[];

    constructor(id: string, level: number) {
        this.id = id;
        this.level = level;
    } 
}

class ChildPlayer extends ParentPlayer{
    constructor(id: string, level: number, items: string[]){
        super(id, level);
        // this.level = 123; // Error.
        this.items = items;
    }
}

const pPlayer = new ParentPlayer('parent', 99);
pPlayer.id
// pPlayer.level = 99 // Error
// pPlayer.items = ['food'] // Error

const cPlayer = new ChildPlayer('child', 12, ['boots', 'sword']);
cPlayer.id
// cPlayer.level = 12; // Error
// cPlayer.items = ['boots']; // Error

```


