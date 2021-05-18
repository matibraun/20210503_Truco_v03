let arrayOld = ['apple', 'orange', 'fig']
let index = 2;
let arrayNew = [...arrayOld.slice(0, index), ...arrayOld.slice(index + 1)];
console.log(arrayOld);
console.log(arrayNew);