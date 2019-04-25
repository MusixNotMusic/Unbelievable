/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    var m = nums1.length;
    var n = nums2.length;
    var temp = null;
    if (m > n) {
        temp = nums1;
        nums1 = nums2;
        nums2 = temp;
        temp = m;
        m = n;
        n = temp;
    }
    var iMin = 0,
        iMax = m,
        halfLen = (m + n + 1) / 2 | 0;
    while (iMin <= iMax) {
        var i = (iMin + iMax) / 2 | 0;
        var j = halfLen - i;
        if (nums2[j - 1] > nums1[i]) {
            iMin = i + 1;
        } else if (nums1[i - 1] > nums2[j]) {
            iMax = i - 1;
        } else {
            var maxLeft = 0;
            if (i == 0) { maxLeft = nums2[j - 1]; } else if (j == 0) { maxLeft = nums1[i - 1]; } else { maxLeft = Math.max(nums1[i - 1], nums2[j - 1]); }
            if ((m + n) % 2 == 1) { return maxLeft; }

            var minRight = 0;
            if (i == m) { minRight = nums2[j]; } else if (j == n) { minRight = nums1[i]; } else { minRight = Math.min(nums1[i], nums2[j]) }
            return (maxLeft + minRight) / 2;
        }
    }
    return 0;
}
var arr1 = [1, 3];
var arr2 = [5, 6];
console.log(findMedianSortedArrays(arr1, arr2));