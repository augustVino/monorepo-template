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

export { bFn as default };
//# sourceMappingURL=module-b.esm-bundler.js.map
