/**
 * 
 * @param {*} arr 
 * @param {*} key 
 */
function binarySearch(arr, key) {
    var iMax = arr.length - 1;
    var iMin = 0;
    while (iMin <= iMax) {
        var half = (iMax + iMin) / 2 | 0;
        console.log('half ==>', half, iMax, iMin);
        if (key < arr[half]) {
            iMax = half - 1;
        } else if (key > arr[half]) {
            iMin = half + 1;
        } else {
            console.log('bingo');
            return half;
        }
    }
    return -1;
}

var arr = [3, 5, 12];
console.log(binarySearch(arr, 123))