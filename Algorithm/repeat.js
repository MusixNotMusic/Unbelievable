/**
 *  字符串 复制 repeat
 */

 function repeat(str , n){
   var result = '';
   while(n > 0){
     console.log(n);
     if( n % 2 === 1) {
       n--;
       result += str;
     }
     if( n % 2 === 0){
       n = n / 2;
       str += str;
     }
   }
   return result;
 }

 function repeatCounter(n){
  var sum = 0;
  var counter = 1;
  while(n > 0){
    // console.log(sum);
    if( n % 2 === 1) {
      n--;
      sum += counter;
      console.log('%=1',counter);
    }
    if( n % 2 === 0){
      n = n / 2;
      counter += counter;
      console.log('%=0',counter);
    }
  }
  return sum;
}

//  console.log(repeat('_=_=_', 100));
 console.log(repeatCounter(113));