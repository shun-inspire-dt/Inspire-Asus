const gcd = function (a, b) {
    if (!b) {
        return a;
    }

    return gcd(b, a % b);
};

const num1 = parseFloat(process.argv[2]);
const num2 = parseFloat(process.argv[3]);

if (isNaN(num1)) {
    console.log(`%s 不是數字`, 'num1');
} else if (isNaN(num2)) {
    console.log(`%s 不是數字`, 'num2');
} else {
    console.log('%s/%s' ,num1 / gcd(num1, num2), num2 / gcd(num1, num2));
}
