'use strict';

const path = require('path');
const eslintrc = require('./.eslintrc.js');
const babel = require('rollup-plugin-babel');
const eslint = require('rollup-plugin-eslint');
const cjs = require('rollup-plugin-commonjs');
const uglify = require('rollup-plugin-uglify');

const resolve = p => path.join(__dirname, p);

// 打包后生成 js 的顶部注释说明
const banner =
	'/*!\n' +
	' * vue-project-resumption\n' +
	' * (c) 2018-' + new Date().getFullYear() + ' H_VK\n' +
	' * This is the source code of vue source code analysis series.\n' +
	' */';

// 设置打包工具中所使用的插件
const plugins = [
	cjs(),
	babel({
		exclude: 'node_modules/**' // 忽略 node_modules 的代码
	}),
	eslint(eslintrc)
];

// 设置 Rollup 基础打包配置
const config = {
	input: resolve('src/index.js'),
	output: {
		file: '',
		banner: banner,
		format: 'umd',
		name: "Vue"
	},
	plugins: plugins
};

// 获取打包配置的方法
function getConfig(target) {
	config.output.file = resolve('dist/vue.js');
	if (target === 'min') {
		config.output.file = resolve('dist/vue.min.js');
		plugins.push(uglify());
	}
	return config;
};

export default getConfig(process.env.TARGET);
