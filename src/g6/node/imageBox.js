import * as G6Util from '@antv/util'
export default function (G6) {
  G6.registerNode('imageBox', {
    draw (cfg, group) {
      const size = this.getSize(cfg) // 转换成 [width, height] 的模式
      const width = size[0]
      const height = size[1]
      const iconSize = cfg.iconSize
      //  / 1 \
      // 4     2
      //  \ 3 /
      //   const path = [
      //     ['M', 0, 0], // 上部顶点
      //     ['L', width, 0], // 右侧顶点
      //     ['L', width, height], // 下部顶点
      //     ['L', 0, height], // 左侧顶点
      //     ['Z'] // 封闭
      //   ]
      const path = [
        // 左顶点
        ['M', -width / 2, 0],
        // 上弧
        ['A', width / 4, height / 4, 0, 1, 0, width / 2, 0],
        // 下弧
        ['A', width / 4, height / 4, 0, 1, 0, -width / 2, 0]
      ]
      const style = G6Util.mix({}, cfg.style, { path: path })

      // 增加一个 path 图形作为 keyShape
      const keyShape = group.addShape('path', {
        attrs: {
          ...style
        },
        draggable: true,
        name: 'diamond-keyShape'
      })

      // 添加图片
      const image = group.addShape('image', {
        attrs: {
          x: -iconSize / 2,
          y: -iconSize / 2,
          width: iconSize,
          height: iconSize,
          img: cfg.img
        },
        // must be assigned in G6 3.3 and later versions. it can be any value you want
        name: 'image-shape'
      })
      // 返回 keyShape
      return keyShape
    }
  },
  // 继承了 rect 节点
  'single-circle')
}
