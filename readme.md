# yarn

通过 yarn 方式管理 monorepo 项目，并且通过 rollup 打包

1. 配置项目根目录的 package.json

```json
   "workspaces": {
        "packages": [
            "packages/*"
        ]
    }
```

此时通过 `yarn install`，则会把 packages 目录下的所有包都创建个软链，放到了根目录的 node_modules 中。这时候在 module-b 中引入 module-a ，直接写：

```js
import aFn from '@vino/module-a';
```

不需要在 module-b 中执行 `yarn install @vino/module-a`。但是如果是 ts 项目，则会报类型错误

2. 配置 tsconfig.json

```json
  "compilerOptions": {
    "baseUrl": ".",
    "moduleResolution": "node",
    "paths": {
      "@vino/*": ["packages/*/src"]
    }
  }
```

把 `@vino/*` 下的包引用指向当前项目的 `packages/*/src`。这时候 ts 报错消失。

3. 打包配置

由于涉及到了多个包，可能会出现自定义打包的场景（例如：module-a 按照 commonjs 规范打包，而 module-b 按照 esm 格式打包）。所以把打包配置放到了每个包中，本示例放到了每个包的 package.json 中，如下：

```json
"buildOptions": {
    "name": "VinoModuleA",
    "formats": [
      "cjs",
      "esm-bundler",
      "global"
    ]
}
```

在 package.json 中自定义了一个属性 buildOptions，里边配置当前包打包时的一些自定义配置。

```html
<!-- formats 字段表示当前包的打包规范（commonjs、esmodule、global等），对应 rollup.config.js 中的 outputConfig 映射。 -->

<!-- name 字段表示当按照 global 方式打包时，对外输出的全局变量。如下: -->
<script src="./module-a.global.js"></script>
<script>
  console.log(VinoModuleA); // {aConst: "这里是moduleA", __esModule: true, default: f}
</script>
```

执行 yarn run build 打包时，会读取包的 buildOptions 字段，然后提供给 rollup。

## 特点

方便调试，但不利于多包互相依赖时的管理。发包时候需要整体排查**引用包**和**被引用包**的版本号是否一致。
