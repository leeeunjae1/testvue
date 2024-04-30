const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    proxy: {
      '/api': {
        target: 'https://jejurang.site:8080',
        changeOrigin: true,
        pathRewrite: { '^/api': '/api' }
      }
    }
  }
});
