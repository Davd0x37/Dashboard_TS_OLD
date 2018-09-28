module.exports = {
  chainWebpack: config => {
    config.module
      .rule("mjs")
      .test(/\.mjs$/)
      .include.add(/(node_modules|"..\/..\/node_modules)/)
      .end()
      .type("javascript/auto")
      .end();

    config.resolve.extensions.add(".mjs").end();
  },
  transpileDependencies: [/\bvue-awesome\b/]
};
