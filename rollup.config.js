import path from 'path';
import tsPlugin from 'rollup-plugin-typescript2';
import jsonPlugin from '@rollup/plugin-json';
import resolvePlugin from '@rollup/plugin-node-resolve';

// 根据环境变量中的TARGET 来获取对应模块的package.json
const packagesDir = path.resolve(__dirname, 'packages');
// 找到要打包的某个包 - 打包的基准目录
const packageDir = path.resolve(packagesDir, process.env.TARGET);

const resolve = (p) => path.resolve(packageDir, p);

const pkg = require(resolve('package.json'));

const name = path.basename(packageDir);

// 对打包类型做一个映射表，根据pkg中的formats来格式化打包
const outputConfig = {
  'esm-bundler': {
    file: resolve(`dist/${name}.esm-bundler.js`),
    format: 'es',
  },
  cjs: {
    file: resolve(`dist/${name}.cjs.js`),
    format: 'cjs',
  },
  global: {
    file: resolve(`dist/${name}.global.js`),
    format: 'umd', // 'iife'
  },
};

const options = pkg.buildOptions || {};

function createConfig(format, output) {
  output.name = options.name;
  output.sourcemap = true;

  return {
    input: resolve('src/index.ts'),
    output,
    plugins: [
      jsonPlugin(),
      tsPlugin({ tsconfig: path.resolve(__dirname, 'tsconfig.json') }),
      resolvePlugin(),
    ],
  };
}

export default options.formats?.map((format) =>
  createConfig(format, outputConfig[format])
);
