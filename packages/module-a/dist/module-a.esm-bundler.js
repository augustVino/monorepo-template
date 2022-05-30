const aFn = () => {
    const desc = 'moduleA fn';
    return new Promise((resolve, reject) => {
        console.log(desc);
        resolve(`promise - ${desc}`);
    });
};
const aConst = '这里是moduleA';

export { aConst, aFn as default };
//# sourceMappingURL=module-a.esm-bundler.js.map
