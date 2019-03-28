function canBreak(n){
  var old = n;
  var counter = -1;
  var breakCounter = 0;
  while(n != 1){
    if(old == n){
      counter++;
      if(counter === 100){
        console.log(n);
        break;
      }
    }else{
      counter = -1;
      old = n;
    }
    console.log('[num = %s]',++breakCounter,n);
    if(n % 2 == 0){
      n = n / 2;
    }else if( n % 2 == 1){
      n = n * 3 + 1;
    }
  }
}

// canBreak(100);
canBreak(1111);