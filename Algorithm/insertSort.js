/**
 * 插入排序
 */

function insertion_sort(arr) {
    var len = arr.length;
    for (var i = 1; i < len; i++) {
        var key = arr[i];
        var j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}

var arr = [7, 6, 4, 3, 2, 1, -1];
insertion_sort(arr);
console.log(arr);