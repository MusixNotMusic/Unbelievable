/**
 * 
 * @param {*} s  起始数字 
 * @param {*} c  底部数字
 */
function factorial(s, c){
  var val = 1;
  while(s >= c){
    val = val * s--;
  }
  return val;
}
// 
function permutationCombination(low, top){
  return parseInt(factorial(top, top- low + 1, 1) / factorial(low, 1, 1));
}
const C = permutationCombination;
// console.log(factorial(5,5,1));
// console.log(C(0,0));
// console.log(C(0,1),C(1,1));
// console.log(C(0,2),C(1,2),C(2,2));
// console.log(C(0,3),C(1,3),C(2,3),C(3,3));
// console.log(C(0,1));