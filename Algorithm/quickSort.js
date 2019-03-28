// 参考算法导论
function qs(arr, start, pivot) {
    if (start < pivot) {
        var q = partition(arr, start, pivot);
        qs(arr, start, q - 1);
        qs(arr, q + 1, pivot);
    }
}

function partition(arr, start, pivot) {
    var pivotNum = arr[pivot];
    var i = start - 1;
    var temp;
    for (var j = start; j < pivot; j++) {
        console.log(arr, i, j);
        if (arr[j] <= pivotNum) {
            i++;
            if (i == j) continue;
            temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            console.log(arr, i, j);
        }
    }
    temp = arr[i + 1];
    arr[i + 1] = arr[pivot];
    arr[pivot] = temp;
    return i + 1;
}
arr = [100, 81, 3, 32, 22, 41, 55, 92, 88]
qs(arr, 0, arr.length - 1);
console.log(arr);