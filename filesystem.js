var fs = require('fs');

//sync
console.log(1);
var syn_data = fs.readFileSync('./data.txt', {encoding:'utf8'});

console.log(syn_data);

//async
console.log(2);
fs.readFile('data.txt', {encoding:'utf8'}, function(err, data){
  console.log(3);
  console.log(data);
})
console.log(4);

//나오는 결과는 2,4,3이다. readFile이 read를 마치면 다음줄로 넘어가면서 function은 기능을 한다.
