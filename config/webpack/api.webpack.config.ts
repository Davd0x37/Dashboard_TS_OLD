import webpackConfig from './webpack.config'

export default {
	...webpackConfig,
	// Idk why it is not working without `as "node"` LOL🙈
	target: 'node' as 'node',
	watch: true
};
