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