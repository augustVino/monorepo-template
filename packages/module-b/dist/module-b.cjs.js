'use strict';

const aFn = () => {
    const desc = 'moduleA fn';
    return new Promise((resolve, reject) => {
        console.log(desc);
        resolve(desc);
    });
};

const bFn = () => {
    const desc = 'moduleB fn';
    aFn().then(console.log);
    console.log(desc);
};
bFn();

module.exports = bFn;
//# sourceMappingURL=module-b.cjs.js.map
