# ES6 develop UMD plugin tool

## Info
用 ES6 语法开发 UMD 插件。

自动将 ES6 语法转换为 ES5，打包成 UMD 格式，兼容 AMD CMD 规范；将 less 转换为 css ；并生成压缩版本。

感谢 [webpack](https://webpack.github.io/)

## Usage
```bash
git clone git@github.com:boboidream/es6_develop_umd_plugin.git

yarn install
yarn run dev # 开发模式，打包文件到 demo，自动监听 src 文件夹进行热更新，http://localhost:9000/
yarn run build # 构建模式，打包插件到 lib 文件夹
yarn run clean # 清理 demo & lib 文件夹
```

## Description
1. 设置全局模式下导出变量名称
设置 webpack.config.js 文件里 `libraryName` 作为全局模式下变量名称。

2. 设置插件依赖
如果有其他依赖，请设置 `webpack.config.js` externals 选项，[webpack - Externals](https://webpack.js.org/configuration/externals/)

3. 文件说明
开发插件只需要关注 src 文件下内容

```bash
index.ejs # 主页模板，自动将生成插件（js|css）添加到页面引用，支持 [Lodash](https://lodash.com/) 模板语法。
index.js # 插件 js 部分代码
style.less # 插件 css 部分代码
style.js # 此文件可以忽略，为了单独打包 css 而不影响，index.js。
```

## Update log
```
2017.03.09 init
```
