'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const aFn = () => {
    const desc = 'moduleA fn';
    return new Promise((resolve, reject) => {
        console.log(desc);
        resolve(`promise - ${desc}`);
    });
};
const aConst = '这里是moduleA';

exports.aConst = aConst;
exports["default"] = aFn;
//# sourceMappingURL=module-a.cjs.js.map
