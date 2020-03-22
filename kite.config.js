// 此文件是 kite 的总配置文件
const path = require('path')

const NODE_ENV = process.env.NODE_ENV || 'development'
const IS_NODE_ENV = process.env.NODE_ENV === 'development'
const THEME_NAME = '_default'
function ProcessCwd(val) {
  return path.resolve(process.cwd(), val)
}

module.exports = {
  version: 0.9,
  theme: {
    'font-family': 'Microsoft YaHei'
  },
  env: NODE_ENV,
  THEME_NAME,
  publicStatic: ProcessCwd('static'),
  client: {
    port: 8081, // 前台调试端口号
    assetsSubDirectory: 'static',
    proxy: {
      target: `http://localhost:8086`, // client ssr
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api-client': '/api-client',
        '^/graphql': '/graphql',
        '^/default': '/default',
        '^/upload': '/upload'
      }
    },
    assetsRoot: IS_NODE_ENV
      ? ProcessCwd(`${THEME_NAME}`)
      : path.resolve(`../kite/static/theme/${THEME_NAME}`),
    publicPath: IS_NODE_ENV ? '/' : `/theme/${THEME_NAME}/`,
    devtool: IS_NODE_ENV ? 'cheap-module-eval-source-map' : '#source-map',
    dev: {
      notifyOnErrors: true,
      useEslint: true,
      showEslintErrorsInOverlay: false,
      cssSourceMap: true
    }
  },
  server: {
    // server
    default_avatar: '/default/img/avatar.jpeg', // 所有使用的默认头像
    port: 8086, // 生产环境运行端口号
    ininProt: 8085 // 初始化项目端口号
  }
}
