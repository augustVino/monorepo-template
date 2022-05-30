# pnpm

通过 pnpm 方式管理 monorepo 项目，并且通过 rollup 打包

## 关于 pnpm 使用

1. 初始化项目

```bash
pnpm init -y
```

2. 安装依赖

```bash
# -w 在根目录全局安装依赖
pnpm install vue -w

# 安装到本地 devDependencies 中
pnpm install typescript -D

# 1. 安装局部依赖(在项目根目录执行)
pnpm install vue -r --filter @vino/module-a @vino/module-b
# 2. 安装局部依赖（在局部目录执行：cd packages/module-a）
pnpm install vue
```

## 回到本案例

1. 初始化项目

```bash
pnpm init -y
```

2. 创建 pnpm-workspace.yaml 文件

```yaml
packages:
  - 'packages/*'
```

3. 在 module-b 中添加依赖 module-a

```bash
pnpm install @vino/module-a -r --filter @vino/module-b
```

这时候发现 @vino/module-b 中的 package.json 文件产生了以下变化：

```json
"dependencies": {
    "@vino/module-a": "workspace:^1.0.0"
}
```

这时你会有一个疑问：当这样的工具包被发布到平台后，如何识别其中的 workspace 呢？

实际上，当执行了 pnpm publish 后，会把基于的 workspace 的依赖变成外部依赖，如：

```json
// before
"dependencies": {
    "@vino/module-a": "workspace:^1.0.0"
}

// after
"dependencies": {
    "@vino/module-a": "^1.0.0"
}
```

这时候在 module-b 中使用 module-a ，直接写：

```js
import aFn from '@vino/module-a';
```

如果是 ts 项目，则会报类型错误

4. 配置 tsconfig.json

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

执行 pnpm run build 打包时，会读取包的 buildOptions 字段，然后提供给 rollup。
