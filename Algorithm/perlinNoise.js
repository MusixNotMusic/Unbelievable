/***
 *  柏林噪声:
 *  Noise 函数
 *  Interpolation 函数
 *  [参考]:
 *   https://web.archive.org/web/20080809211310/http://freespace.virgin.net:80/hugo.elias/models/m_perlin.htm
 *   http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.92.5967&rep=rep1&type=pdf
 *   */

var PI = Math.PI;
var cos = Math.cos;
var pow = Math.pow;
var persistence = 1 / 2;
var Number_Of_Octaves = 4;
/**
 * @description 1维 Noise
 * @param {Integer} x 
 */
function Noise_D1(x) {
    x = (x << 13) ^ x;
    return (1.0 - ((x * (x * x * 15731 + 789221) + 1376312589) & 0x7fffffff) / 1073741824.0);
}

/**
 * @description 2维 Noise
 * @param {Integer} x 
 * @param {Integer} y 
 */

function Noise_D2(x, y) {
    var n = x + y * 57
    n = (n << 13) ^ n;
    return (1.0 - ((n * (n * n * 15731 + 789221) + 1376312589) & 0x7fffffff) / 1073741824.0);
}

function Linear_Interpolate(a, b, x) {
    return a * (1 - x) + b * x;
}

function Cosine_Interpolate(a, b, x) {
    var alpha = x * PI;
    var f = (1 - cos(alpha)) * 0.5;
    return a * (1 - f) + b * f;
}

function Cubic_Cosine_Interpolate(v0, v1, v2, v3, x) {
    var P = (v3 - v2) - (v0 - v1);
    var Q = (v0 - v1) - P;
    var R = v2 - v0;
    var S = v1;

    return P * pow(x, 3) + Q * pow(x, 2) + R * x + S;
}

// 1维
function SmoothedNoise_1D(x) {
    return Noise_D1(x) / 2 + Noise_D1(x - 1) / 4 + Noise_D1(x + 1) / 4;
}

/**
 * 平滑波形计算
 * @param {Float} x 
 * @param {Function} Interpolate  生成器回调
 */
function InterpolatedNoise_1D(x, Interpolate) {
    var integer_X = parseInt(x);
    var fractional_X = x - integer_X;
    var v1 = SmoothedNoise_1D(integer_X);
    var v2 = SmoothedNoise_1D(integer_X + 1);
    return Interpolate(v1, v2, fractional_X);
}
/**
 * 波形叠加
 * @param {Float} x 
 * @param {Function} Interpolate  生成器回调
 */
function PerlinNoise_1D(x, Interpolate) {
    var total = 0;
    var p = persistence;
    var len = Number_Of_Octaves - 1; //八分音
    for (var i = 0; i < len; i++) {
        var frequency = pow(2, i);
        var amplitude = pow(p, i);
        total = total + InterpolatedNoise_1D(x * frequency, Interpolate) * amplitude;
    }
    return total;
}

// 2维
function SmoothNoise_2D(x, y) {
    var corners = (Noise_D2(x - 1, y - 1) + Noise_D2(x + 1, y - 1) + Noise_D2(x - 1, y + 1) + Noise_D2(x + 1, y + 1)) / 16;
    var sides = (Noise_D2(x - 1, y) + Noise_D2(x + 1, y) + Noise_D2(x, y - 1) + Noise_D2(x, y + 1)) / 8;
    var center = Noise_D2(x, y) / 4;

    return corners + sides + center;
}

function InterpolatedNoise_2D(x, y, Interpolate) {
    var integer_X = parseInt(x);
    var fractional_X = x - integer_X;

    var integer_Y = parseInt(y);
    var fractional_Y = y - integer_Y;

    var v1 = SmoothNoise_2D(integer_X, integer_Y);
    var v2 = SmoothNoise_2D(integer_X + 1, integer_Y);
    var v3 = SmoothNoise_2D(integer_X, integer_Y + 1);
    var v4 = SmoothNoise_2D(integer_X + 1, integer_Y + 1);

    var i1 = Interpolate(v1, v2, fractional_X);
    var i2 = Interpolate(v3, v4, fractional_X);

    return Interpolate(i1, i2, fractional_Y);
}

function PerlinNoise_2D(x, y, Interpolate) {
    var total = 0;
    var p = persistence;
    var len = Number_Of_Octaves;

    for (var i = 0; i < len; i++) {
        var frequency = pow(2, i);
        var amplitude = pow(p, i);
        total = total + InterpolatedNoise_2D(x * frequency, y * frequency, Interpolate) * amplitude;
    }
    return total;
}