const fs = require('fs');
const path = require('path');
const execa = require('execa'); // 开启子进程

// 获取所有包
const targets = fs
  .readdirSync('packages')
  .filter((file) => fs.statSync(path.join('packages', file)).isDirectory());

// 并行打包
function runParallel(targets, iterator) {
  return Promise.all(targets.map(iterator));
}

async function build(target) {
  await execa('rollup', ['-c', '--environment', `TARGET:${target}`], {
    stdio: 'inherit', // 子进程打包的信息共享给父进程
  });
}

runParallel(targets, build);
