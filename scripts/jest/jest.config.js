const { defaults } = require('jest-config');

module.exports = {
	...defaults,
	// process.cwd() 指向执行命令时的目录,也就是执行pnpm test时的项目根目录
	rootDir: process.cwd(),
	modulePathIgnorePatterns: ['<rootDir>/.history'],
	moduleDirectories: [
		// 对于 React ReactDOM
		'dist/node_modules',
		// 对于第三方依赖
		...defaults.moduleDirectories
	],
	testEnvironment: 'jsdom'
};
