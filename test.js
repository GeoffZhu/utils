const { urlParser } = require('./index.js');

let url = urlParser('https://www.npmjs.com/package/gz-utils?a=1&b=2#ishash');
console.log(url.href);

url.setSearch('c', '3');
console.log(url.href);

console.log(url.getSearch('c'));

url.removeSearch('c', '3');
console.log(url.href);