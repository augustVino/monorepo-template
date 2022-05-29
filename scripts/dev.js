const execa = require('execa'); // 开启子进程

const target = 'module-a';

async function build(target) {
  await execa('rollup', ['-wc', '--environment', `TARGET:${target}`], {
    stdio: 'inherit', // 子进程打包的信息共享给父进程
  });
}

build(target);
