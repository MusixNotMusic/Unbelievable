/**
 * 并轨排序
 */
var RandomArray = require('./util').RandomArray;

function merge(A, p, q, r) {
    var arr1 = A.slice(p, q + 1);
    var arr2 = A.slice(q + 1, r + 1);
    console.log(arr1, arr2);
    arr1.push(Infinity);
    arr2.push(Infinity);
    var i = 0,
        j = 0;
    for (var m = p; m < r + 1; m++) {
        if (arr1[i] < arr2[j]) {
            A[m] = arr1[i];
            i++;
        } else {
            A[m] = arr2[j];
            j++;
        }
    }
}


function merge_sort(A, p, r) {
    if (p < r) {
        var q = (r + p) / 2 | 0;
        merge_sort(A, p, q);
        merge_sort(A, q + 1, r);
        merge(A, p, q, r);
    }
}

var arr = RandomArray(20, 1000);
console.log(arr);
merge_sort(arr, 0, arr.length - 1);
console.log(arr);