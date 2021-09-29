export default {
  proxy: {
    '/api': {
      target: '',
      changeOrigin: true,
      // pathRewrite: { '^/api': '' },
    },
  },
};
