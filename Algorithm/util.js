var random = Math.random;
// 随机 数组
function RandomArray(size, threshold) {
    var output = [];
    while (size--) {
        output.push(random() * threshold - (threshold / 2 | 0) | 0);
    }
    return output;
}


function RandomGreedArray(size, range) {
    var randomSs = randomRange(range);
    var randomEe = randomRange(range) + randomSs | 0;
    var s1 = [randomSs],
        f1 = [randomEe];
    for (var i = 1; i < size; i++) {
        s1.push(randomRange(f1[i - 1]));
        f1.push(f1[i - 1] + randomRange(range));
    }
    return { s1, f1 };
}

function randomRange(randomRange) {
    return random() * randomRange | 0;
}

/**
 * 
 * @param {*} cb  回调函数
 * @param {*} hasLog 是否打印日志
 */
function runTime(cb, defaultLog) {
    var now = Date.now()
    return function() {
        var params = Array.prototype.slice.call(arguments);
        !defaultLog && console.log(cb.apply(this, params));
        console.log('[rum time = %s ms]', Date.now() - now);
    }
}

module.exports = { RandomArray, RandomGreedArray, runTime };