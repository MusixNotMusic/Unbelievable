/**
 * 输出集合中最大连续 数字之和
 * 
 */
var max = Math.max;
var random = Math.random;

function plusOrMinus(arr) {
    var prevPlus = true;
    var newArr = [];
    var total = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] > 0) {
            if (prevPlus) {
                total += arr[i];
            } else {
                newArr.push(total);
                total = arr[i];
            }
            prevPlus = true;
        } else if (arr[i] < 0) {
            if (prevPlus) {
                newArr.push(total);
                total = arr[i];
            } else {
                total += arr[i];
            }
            prevPlus = false;
        }
        if (arr.length === i + 1) {
            newArr.push(total);
        }
    }
    return newArr;
}

function maxsum4(arr) {
    var sum = 0;
    var max = 0;
    var arr = plusOrMinus(arr);
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
        if (sum < 0) {
            // console.log("[i = %s (%s)] [sum = %s] [max = %s]",i, arr[i], sum, max);
            sum = 0;
            continue;
        }
        if (arr[i] > max) {
            max = arr[i];
        }

        if (sum > max) {
            max = sum;
        }
        // console.log("[i = %s (%s)] [sum = %s] [max = %s]",i, arr[i], sum, max);
    }
    return max;
}
// var arr = genarate(1000000, 10000000);
// console.log(maxsum4(arr));
/**
 *  genarate Set
 *  */
function genarate(size, top) {
    var arr = [];
    for (var i = 0; i < size; i++) {
        arr[i] = (Math.random() - 0.5) * top | 0;
    }
    return arr;
}


/**
 * runTime 运行时间
 *  */

function runTime(cb) {
    var now = Date.now()
    return function() {
        var params = Array.prototype.slice.call(arguments);
        console.log(cb.apply(this, params));
        console.log('[rum time = %s ms]', Date.now() - now);
    }
}

/**
 *  O(nlog(n))
 *  */
function maxsum3(arr, l, u) {
    if (l > u) return 0;
    if (l === u) return max(arr[l], 0);
    var m = ((l + u) / 2) | 0;
    var lmax = 0,
        sum = 0;
    for (var i = m; i >= 0; i--) {
        sum += arr[i];
        lmax = max(lmax, sum);
    }
    var rmax = 0,
        sum = 0;
    for (var i = m; i < u; i++) {
        sum += arr[i];
        rmax = max(rmax, sum);
    }
    console.log(lmax, rmax);
    return max(lmax + rmax, maxsum3(arr, l, m), maxsum3(arr, m + 1, u));
}
// var arr = [0,31, -41, 59, 26, -53, 58, 97, -93, -23, 84];
// var arr = [-100, 31, -41, 85 -53, 155, -916, 184,-12, 140];
// console.log(maxVector(arr));
// console.log(maxsum3(arr, 0, arr.length));
// console.log(runTime(maxsum3(genarate()), genarate, 3000, 10000));

/** 
 *  O(n^3)
 *  将计算过程 放到 双层 for 循环中
 * */
function maxsum1_1(arr) {
    var max = 0;
    for (var d = 0; d < arr.length; d++) {
        for (var s = 0; s < arr.length - d; s++) {
            var total = 0;
            for (var i = s; i <= s + d; i++) {
                total += arr[i];
            }
            if (max < total) {
                max = total;
            }
            // console.log("[%s, %s] total = %s max = %s",s,s+d,total, max);
        }
    }
    return max;
}
// console.log(maxsum1(genarate(100, 10000)));
// console.log(runTime(maxsum1_1, genarate, 3000, 10000));


/**
 * O(n^3)
 * 将计算过程提出 
 *  */
function maxsum1_2(arr) {
    var max = 0;
    var sum = 0;
    var boundaries = [];
    for (var d = 0; d < arr.length; d++) {
        for (var s = 0; s < arr.length - d; s++) {
            boundaries.push([s, s + d]);
        }
    }

    for (var i = 0; i < boundaries.length; i++) {
        sum = 0;
        for (var j = boundaries[i][0]; j <= boundaries[i][1]; j++) {
            sum += arr[j];
        }
        if (max < sum) {
            max = sum;
        }
        // console.log("sum = %s max = %s",sum, max);
    }
    return max;
}

/**
 *  跨中间 分治
 *  连续最大值所在区间:
 *   1、[low ~ mid]    在上半段
 *   2、[[low, mid),(low+1, high]]  跨过 上下界
 *   3、[mid+1, high]  在下半段
 * */
// 分治处理
function find_max_crossing_subarray(arr, low, mid, high) {
    var sum = 0,
        i;
    var left_sum = -Infinity,
        right_sum = -Infinity;
    var max_left, max_right;

    for (i = mid; i >= low; i--) {
        sum += arr[i];
        if (sum > left_sum) {
            left_sum = sum;
            max_left = i;
        }
    }

    for (i = mid + 1, sum = 0; i <= high; i++) {
        sum += arr[i];
        if (sum > right_sum) {
            right_sum = sum;
            max_right = i;
        }
    }

    return { max_left, max_right, left_sum, right_sum, sum: left_sum + right_sum };
}


function find_maximum_subarray(arr, low, high) {
    if (high === low) {
        return { low, high, sum: arr[low] };
    } else {
        var mid = (low + high) / 2 | 0;
        // console.log('mid ==> ', low, mid, high);
        var left = find_maximum_subarray(arr, low, mid);
        var right = find_maximum_subarray(arr, mid + 1, high);
        var cross = find_max_crossing_subarray(arr, low, mid, high);
        if (left.sum >= right.sum && left.sum >= cross.sum) {
            return left;
        } else if (right.sum >= left.sum && right.sum >= cross.sum) {
            return right;
        } else {
            return cross;
        }
    }
}
// 测试
// var arr = [-1, 31, 44, 21, -100, -10, 32, 42];
var arr = genarate(1000000, 10000000);
runTime(find_maximum_subarray)(arr, 0, arr.length - 1);
runTime(maxsum4)(arr);

// console.log(arr);
// console.log(find_maximum_subarray(arr, 0, arr.length - 1));