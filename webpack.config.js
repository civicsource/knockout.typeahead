module.exports = {
	entry: "./example/index.js",
	output: {
		path: "./example",
		filename: "build.js"
	},
	resolve: {
		extensions: [
			"",
			".js",
			".less"
		],
		modulesDirectories: [
			"node_modules"
		]
	},
	module: {
		loaders: [{
			test: /\.less$/,
			loader: "style!css!less"
		}]
	}
};