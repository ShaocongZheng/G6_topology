import * as G6Util from '@antv/util'
import Anchor from '../item/anchor'
import editorStyle from '../config/defaultStyle'
export default function (G6) {
  G6.registerNode('imageBox', {
    options: {
      style: {
        fill: '#f9f9f9',
        stroke: '#bbb',
        cursor: 'default'
      },
      stateStyles: {
        selected: {
          fill: '#eee'
        },
        hover: {
          cursor: editorStyle.cursor.hoverNode
        }
      },
      linkPoints: {
        top: true,
        bottom: true,
        left: true,
        right: true,
        stroke: 'black',
        fill: '#fff',
        size: 5
      }
    },
    // draw (cfg, group) {
    //   const size = this.getSize(cfg) // 转换成 [width, height] 的模式
    //   const width = size[0]
    //   const height = size[1]
    //   const iconSize = cfg.iconSize
    //   //  / 1 \
    //   // 4     2
    //   //  \ 3 /
    //   //   const path = [
    //   //     ['M', 0, 0], // 上部顶点
    //   //     ['L', width, 0], // 右侧顶点
    //   //     ['L', width, height], // 下部顶点
    //   //     ['L', 0, height], // 左侧顶点
    //   //     ['Z'] // 封闭
    //   //   ]
    //   const path = [
    //     // 左顶点
    //     ['M', -width / 2, 0],
    //     // 上弧
    //     ['A', width / 4, height / 4, 0, 1, 0, width / 2, 0],
    //     // 下弧
    //     ['A', width / 4, height / 4, 0, 1, 0, -width / 2, 0]
    //   ]
    //   const style = G6Util.mix({}, cfg.style, {
    //     path: path,
    //     fill: cfg.style.fill || 'rgba(55,100,255,0)',
    //     cursor: 'pointer'
    //   })

    //   // 添加图片
    //   const image = group.addShape('image', {
    //     attrs: {
    //       x: -iconSize / 2,
    //       y: -iconSize / 2,
    //       width: iconSize,
    //       height: iconSize,
    //       img: cfg.img
    //     },
    //     // must be assigned in G6 3.3 and later versions. it can be any value you want
    //     name: 'image-shape'
    //   })
    //   // 增加一个 path 图形作为 keyShape
    //   const keyShape = group.addShape('path', {
    //     attrs: {
    //       ...style
    //     },
    //     draggable: true,
    //     name: 'custom-circle'
    //   })
    //   //   this.initAnchor(group)
    //   // 返回 keyShape
    //   return keyShape
    // },
    afterDraw (cfg, group) {
      const iconSize = cfg.iconSize
      // 添加图片
    //   const image = group.addShape('image', {
    //     attrs: {
    //       x: -iconSize / 2,
    //       y: -iconSize / 2,
    //       width: iconSize,
    //       height: iconSize,
    //       img: cfg.img
    //     },
    //     // must be assigned in G6 3.3 and later versions. it can be any value you want
    //     name: 'image-shape'
    //   })
    //   this.initAnchor(group)
    },
    // drawShape (cfg, group) {
    //   var style = this.getShapeStyle(cfg)
    //   delete style.height
    //   delete style.width
    //   var keyShape = group.addShape('circle', {
    //     attrs: style,
    //     className: 'circle-combo',
    //     name: 'image-circle',
    //     draggable: true
    //   })
    //   console.log(group)
    //   const tmp = group.get('children')[0]
    //   const iconSize = cfg.iconSize
    //   // 添加图片
    //   const image = group.addShape('image', {
    //     attrs: {
    //       x: -iconSize / 2,
    //       y: -iconSize / 2,
    //       width: iconSize,
    //       height: iconSize,
    //       img: cfg.img
    //     },
    //     // must be assigned in G6 3.3 and later versions. it can be any value you want
    //     name: 'icon'
    //   })
    //   this.initAnchor(group)
    //   return keyShape
    // },
    drawAnchor (group) {
      const bbox = group.get('children')[1].getBBox()
      this.getAnchorPoints().forEach((p, i) => {
        const anchorContainer = group.addGroup()
        const anchor = new Anchor({
          group: anchorContainer,
          index: i,
          model: {
            style: {
              x: bbox.minX + bbox.width * p[0],
              y: bbox.minY + bbox.height * p[1]
            }
          }
        })
        group.anchorShapes.push(anchorContainer)
      })
    },
    initAnchor (group) {
      group.anchorShapes = []
      group.showAnchor = () => {
        this.drawAnchor(group)
      }
      group.getAllAnchors = () => {
        return group.anchorShapes.map(c => {
          c.filter(a => a.isAnchor)
        })
      }
      group.getAnchor = (i) => {
        return group.anchorShapes.filter(a => a.get('index') === i)
      }
      group.clearAnchor = () => {
        group.anchorShapes && group.anchorShapes.forEach(a => a.remove())
        group.anchorShapes = []
      }
      group.clearHotpotActived = () => {
        group.anchorShapes && group.anchorShapes.forEach(a => {
          if (a.isAnchor) { a.setHotspotActived(false) }
        })
      }
    },
    setState (name, value, item) {
      const group = item.getContainer()
      const circle = group.getChildByIndex(1)
      if (value) {
        console.log(1)
        circle.attr('linkPoints',
          {
            top: true,
            bottom: true,
            left: true,
            right: true,
            fill: '#fff',
            size: 5
          })
      }
    //   if (name === 'show-anchor') {
    //     if (value) {
    //       group.showAnchor()
    //     } else {
    //       group.clearAnchor()
    //     }
    //   } else if (name === 'selected') {
    //     const rect = group.getChildByIndex(0)
    //     if (value) {
    //       rect.attr('fill', this.options.stateStyles.selected.fill)
    //     } else {
    //       rect.attr('fill', this.options.style.fill)
    //     }
    //   } else if (name === 'hover') {
    //     const rect = group.getChildByIndex(1)
    //     const text = group.getChildByIndex(2)
    //     if (value) {
    //       rect.attr('cursor', this.options.stateStyles.hover.cursor)
    //       if (text) { text.attr('cursor', this.options.stateStyles.hover.cursor) }
    //     } else {
    //       rect.attr('cursor', this.options.style.cursor)
    //       if (text) { text.attr('cursor', this.options.style.cursor) }
    //     }
    //   }
    //   this.setCustomState(name, value, item)
    },
    setCustomState (name, value, item) {

    },
    getAnchorPoints () {
      return [
        [0.5, 0], // top
        [1, 0.5], // right
        [0.5, 1], // bottom
        [0, 0.5] // left
      ]
    }
  },
  // 继承了 rect 节点
  'circle')
}
