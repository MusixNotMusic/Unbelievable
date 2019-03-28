function bSearch(Arr, start, end, target) {
    if (end - start <= 1) {
        if (Arr[start] === target) {
            return start;
        } else if (Arr[end] === target) {
            return end;
        } else {
            return -1;
        }
    }
    var mid = Math.floor((start + end) / 2);
    // console.log('[mid = %s], [start = %s], [end = %s]', mid, start, end);
    if (Arr[mid] === target) {
        return mid;
    } else if (Arr[mid] > target) {
        return bSearch(Arr, start, mid - 1, target);
    } else if (Arr[mid] < target) {
        return bSearch(Arr, mid + 1, end, target);
    }
}

// var arr = [0,1,4,5,8,10,11,44,53,55,300,543];
var arr = [55, 300, 543];
// var arr = [543];
// for(var i = 0; i < arr.length; i ++){
//   console.log('[i=%s]',i, bSearch(arr, 0, arr.length, 10));
// }
console.log(bSearch(arr, 0, arr.length, 55));
console.log(bSearch(arr, 0, arr.length, 400));
console.log(bSearch(arr, 0, arr.length, 543));
console.log(bSearch(arr, 0, arr.length, 542));