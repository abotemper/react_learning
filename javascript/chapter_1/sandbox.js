// alert("hello,world");
// console.log(1);
// console.log(2);

let age = 25;
let year = 2019;
console.log(age, year);

age = 30;

console.log(age);

const  points = 100;// can not be overrided
console.log(points);
// points = 50;
// console.log(points);

var score = 75;// old way

console.log(score);


// String
console.log('things below are about string')
console.log('hello, world');
let email = 'tianbo152@gmail.com';
console.log(email);

let firstName = 'Bo';
let lastName = 'Tian';

let fullName = firstName + ' ' + lastName;

console.log(fullName);

console.log(fullName[0]);

console.log(fullName.length);

console.log(fullName.toUpperCase());

let result = fullName.toLowerCase();
console.log(result, fullName);

let index = email.indexOf('@');
console.log(index);

//String methods

let email_2 = 'bo.tian@ucdconnect.ie';

let result_2 = email_2.lastIndexOf('n');
console.log(result_2);

let result_3 = email_2.slice(0,5);
console.log(result_3);

let result_4 = email_2.substr(1,5);//form first position count 5 to the last
console.log(result_4);

let result_5 = email_2.replace('o','t');//replace first 'o'
console.log(result_5);

//numbers
console.log('below about numbers')
let radius = 10;
const pi = 3.14;
console.log(radius, pi);

console.log(10/2);
let result_6 = radius % 3;
console.log(result_6)

let result_7 = pi * radius ** 2;
console.log(result_7);


//order of operation () ,**, * / , + -, 
radius++;
console.log(radius);
radius--;
console.log(radius);
radius+=1;
console.log(radius);
radius-=1;
console.log(radius);
radius*=2;
console.log(radius);
radius/=2;
console.log(radius);

console.log(5 / 'hello');//NaN  - not a number.

let result_8 = 'hello' + radius + 'good';
console.log(result_8);

// template string 

const title = 'best reads of 2019';
const author = 'mario';
const likes = 30;

//concatenation way
let result_9 = 'the blog called ' + title + ' by ' + author + ' has ' + likes + ' likes';
console.log(result_9);


//template string way
let result_10 = `the blog called ${title} by ${author} has ${likes} likes`;
// its `` not ''
console.log(result_10);


//creating html templates
let html = `
<h2>${title}</h2>
<p>${author}</p>
<span>this blog has ${likes} likes</span>
`;
console.log(html);

//arrays

let ninjas = ['shaun', 'ryu', 'chun-li'];
console.log(ninjas);
console.log(ninjas[1]);
ninjas[1] = 'ken';//overwrite
console.log(ninjas);

let ages = [20,25,30,35];
console.log(ages[2]);

let random = ['shaun', 'crystal', 30, 20];
console.log(random);

console.log(ninjas.length);

//array methods

let result_11 = ninjas.join(',');
console.log(result_11); 

let result_12 = ninjas.join('-');
console.log(result_12); 

let result_13 = ninjas.indexOf('chun-li');
console.log(result_13);

let result_14 = ninjas.concat(['ken', 'crystal']);
console.log(result_14); 

let result_15 = ninjas.push('aa');

console.log(ninjas);

result_15 = ninjas.pop();
console.log(result_15);