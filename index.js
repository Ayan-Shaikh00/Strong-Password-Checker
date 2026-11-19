
var strongPasswordChecker = function(password) {
    let n = password.length;

    let hasLower = /[a-z]/.test(password);
    let hasUpper = /[A-Z]/.test(password);
    let hasDigit = /[0-9]/.test(password);

    let missing = 
        (!hasLower ? 1 : 0) +
        (!hasUpper ? 1 : 0) +
        (!hasDigit ? 1 : 0);

    let replace = 0;
    let mod0 = 0;
    let mod1 = 0;

    for (let i = 0; i < n;) {
        let j = i;

        while (j < n && password[j] === password[i]) {
            j++;
        }

        let len = j - i;

        if (len >= 3) {
            replace += Math.floor(len / 3);

            if (len % 3 === 0) mod0++;
            else if (len % 3 === 1) mod1++;
        }

        i = j;
    }

    if (n < 6) {
        return Math.max(missing, 6 - n);
    }

    if (n <= 20) {
        return Math.max(missing, replace);
    }

    let deleteCount = n - 20;
    let remaining = deleteCount;

    // First, optimize sequences where length % 3 === 0
    let use = Math.min(mod0, remaining);
    replace -= use;
    remaining -= use;

    // Next, optimize sequences where length % 3 === 1
    use = Math.min(mod1 * 2, remaining);
    replace -= Math.floor(use / 2);
    remaining -= use;

    // Delete 3 characters to reduce one replacement
    use = Math.min(replace, Math.floor(remaining / 3));
    replace -= use;

    return deleteCount + Math.max(missing, replace);
};
