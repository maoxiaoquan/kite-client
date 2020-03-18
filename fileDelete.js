const buildConfig = require('./kite.config')
const rimraf = require('rimraf')

rimraf(buildConfig.client.assetsRoot, function (err) { // 删除当前目录下的 test.txt
  if (err) throw err
})
