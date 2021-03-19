const path = require('path')
const debug = process.env.NODE_ENV !== 'production'
module.exports = {
  // publicPath: '/G6-topology' // 这个路劲表示url前缀，往往需要部署配置的就是这个路径
//   outputDir: 'dist', // 编译后输入目录
  assetsDir: './static' // 资源文件目录，为空字符串表示 js css 等目录结构和index.html一个层级
}
