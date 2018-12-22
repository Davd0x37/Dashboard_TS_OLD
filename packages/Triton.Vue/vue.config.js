module.exports = {
  outputDir: "build",

  pwa: {
    name: "Dashboard"
  },

  devServer: {
    port: 3030
  },

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: true
    }
  }
};
