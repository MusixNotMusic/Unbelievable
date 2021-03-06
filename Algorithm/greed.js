/**
 * 
 * @param {*} s1  起始 
 * @param {*} f1  结束
 * 
 * @param path 
 *  maxS 最大连续活动的 起始值
 *  maxF 最大连续活动的 结束值
 *  mem  记录索引
 */
var RandomGreedArray = require('./util').RandomGreedArray;
var runTime = require('./util').runTime;


function activity_greed_all_path(s1, f1) {
    var path = {
        0: {
            maxS: s1[0],
            maxF: f1[0],
            mem: [0]
        }
    };
    for (var i = 1; i < s1.length; i++) {
        for (var item in path) {
            var record = path[item];
            if (record.maxF <= s1[i] && record.maxS <= s1[i]) {
                record.maxF = f1[i];
                // record.mem.push([s1[i], f1[i]]);
                record.mem.push(i);
            } else {
                path[i] = {
                    maxS: s1[i],
                    maxF: f1[i],
                    mem: [i]

                }
                break;
            }
        }
    }
    return path;
}

/**
 * 
 * @param {*} s  [0, 4, 6, 7, 9, 15]   起始列表 需要加入虚拟 0
 * @param {*} f  [3, 7, 9, 10, 11, 20] 结束列表 需要加入虚拟 0
 * @param {*} k  起始索引
 * @param {*} n  范围
 * 
 * 函数会遍历出 把第一个任务加入到列表里
 */
function recursive_activity_selector(s, f, k, n) {
    var m = k + 1;
    while (m <= n && s[m] < f[k]) { // s[k] > f[m] 意思是说  k 与 k+1 的活动冲突
        m = m + 1;
    }
    if (m <= n) {
        // 0 是虚拟活动索引 index
        return [m].concat(recursive_activity_selector(s, f, m, n));
    }
    return [];
}

function greed_activity_selector(s, f) {
    var len = s.length;
    var A = [0]; //虚拟
    for (var i = 1, m = 0; i < len; i++) {
        // console.log(i, m)
        if (f[m] <= s[i]) {
            A.push(i);
            m = i;
        }

    }
    return A;
}

/**
 * 
 * @param {Number} denomination  面额
 * @param {Array} changes_list 零钱列表
 * @param {Array} coins  找零结果
 * 有n美分， 最少硬币找零
 */
function greed_coins_change_recursive(denomination, changes_list, coins) {
    for (var i = 0; i < changes_list.length; i++) {
        var changes_value = changes_list[i];
        if (denomination - changes_value >= 0) {
            coins[changes_value] || (coins[changes_value] = { size: 0 });
            coins[changes_value].size++;
            return greed_coins_change_recursive(denomination - changes_value, changes_list, coins);
        }
    }
    return coins;
}

function greed_coins_change(denomination, changes_list, coins) {
    for (var i = 0; i < changes_list.length; i++) {
        var changes_value = changes_list[i];
        while (denomination >= changes_value) {
            coins[changes_value] || (coins[changes_value] = { size: 0 });
            coins[changes_value].size++;
            denomination = denomination - changes_value;
        }
    }
    return coins;
}




// var obj = RandomGreedArray(25, 10);
// console.log(obj.s1);
// console.log(obj.f1);
// runTime(activity_greed_all_path)(obj.s1, obj.f1)
// runTime(recursive_activity_selector)(obj.s1, obj.f1, -1, obj.s1.length - 1)
// runTime(greed_activity_selector)(obj.s1, obj.f1)
// runTime(greed_coins_change_recursive)(1113271, [25, 10, 5, 1], {});
runTime(greed_coins_change)(1113271, [25, 10, 5, 1], {});
// greed_coins_change(121, [25, 10, 5, 1], []);