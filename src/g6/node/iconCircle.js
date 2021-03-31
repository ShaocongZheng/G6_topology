import defaultStyle from '../config/defaultStyle'
import { mix } from '@antv/util'
var _tslib = require('tslib')

var _g6Core = require('@antv/g6-core')

var _util = require('@antv/util')
export default function (G6) {
  G6.registerNode('iconCircle', {
    options: {
      size: _g6Core.BaseGlobal.defaultNode.size,
      style: {
        x: 0,
        y: 0,
        stroke: _g6Core.BaseGlobal.defaultNode.style.stroke,
        fill: _g6Core.BaseGlobal.defaultNode.style.fill,
        lineWidth: _g6Core.BaseGlobal.defaultNode.style.lineWidth
      },
      labelCfg: {
        position: 'bottom',
        offset: 10,
        style: {
          fill: _g6Core.BaseGlobal.nodeLabel.style.fill,
          fontSize: _g6Core.BaseGlobal.nodeLabel.style.fontSize
        }
      },
      // 节点上左右上下四个方向上的链接circle配置
      linkPoints: {
        top: true,
        right: true,
        bottom: true,
        left: true,
        // circle的大小
        // size: _g6Core.BaseGlobal.defaultNode.linkPoints.size,
        size: 0,
        ...defaultStyle.anchor.default
        // lineWidth: _g6Core.BaseGlobal.defaultNode.linkPoints.lineWidth,
        // fill: _g6Core.BaseGlobal.defaultNode.linkPoints.fill,
        // stroke: _g6Core.BaseGlobal.defaultNode.linkPoints.stroke
      },
      // 节点中icon配置
      icon: {
        // 是否显示icon，值为 false 则不渲染icon
        show: false,
        // icon的地址，字符串类型
        img: 'https://gw.alipayobjects.com/zos/bmw-prod/5d015065-8505-4e7a-baec-976f81e3c41d.svg',
        width: 30,
        height: 30
      },
      // stateStyles: (0, _tslib.__assign)({}, _g6Core.BaseGlobal.nodeStateStyles)
      stateStyles: defaultStyle.nodeStateStyle
    },
    shapeType: 'iconCircle',
    drawShape: function drawShape (cfg, group) {
      var _a = this.getOptions(cfg).icon
      var defaultIcon = _a === undefined ? {} : _a
      var style = this.getShapeStyle(cfg)
      var icon = (0, _util.deepMix)({}, defaultIcon, cfg.icon)
      const r = cfg.size / 2
      // 第一个背景圆
      const back1 = group.addShape('circle', {
        zIndex: -3,
        attrs: {
          x: 0,
          y: 0,
          r,
          fill: cfg.color,
          opacity: 0.6
        },
        // must be assigned in G6 3.3 and later versions. it can be any value you want
        name: 'circle-shape1'
      })
      // 第二个背景圆
      const back2 = group.addShape('circle', {
        zIndex: -2,
        attrs: {
          x: 0,
          y: 0,
          r,
          fill: 'blue', // 为了显示清晰，随意设置了颜色
          opacity: 0.6
        },
        // must be assigned in G6 3.3 and later versions. it can be any value you want
        name: 'circle-shape2'
      })
      // 第三个背景圆
      const back3 = group.addShape('circle', {
        zIndex: -1,
        attrs: {
          x: 0,
          y: 0,
          r,
          fill: 'green',
          opacity: 0.6
        },
        // must be assigned in G6 3.3 and later versions. it can be any value you want
        name: 'circle-shape3'
      })
      var keyShape = group.addShape('circle', {
        zIndex: 1,
        attrs: mix(this.options, style),
        className: 'keyShape',
        draggable: true
      })
      console.log(mix(this.options, style))
      var width = icon.width
      var height = icon.height
      var show = icon.show

      if (show) {
        group.addShape('image', {
          zIndex: 2,
          attrs: (0, _tslib.__assign)({
            x: -width / 2,
            y: -height / 2
          }, icon),
          className: this.type + '-icon',
          name: this.type + '-icon',
          draggable: true
        })
      }

      this.drawLinkPoints(cfg, group)
      return keyShape
    },

    drawLinkPoints: function drawLinkPoints (cfg, group) {
      var _a = this.getOptions(cfg).linkPoints
      var linkPoints = _a === undefined ? {} : _a
      var top = linkPoints.top
      var left = linkPoints.left
      var right = linkPoints.right
      var bottom = linkPoints.bottom
      var markSize = linkPoints.size
      var markR = linkPoints.r
      var markStyle = (0, _tslib.__rest)(linkPoints, ['top', 'left', 'right', 'bottom', 'size', 'r'])
      var size = this.getSize(cfg)
      var r = size[0] / 2

      if (left) {
        // left circle
        group.addShape('circle', {
          zIndex: 2,
          attrs: (0, _tslib.__assign)((0, _tslib.__assign)({}, markStyle), {
            x: -r,
            y: 0,
            r: markSize / 2 || markR || 0
          }),
          index: 0,
          className: 'link-point-left',
          name: 'link-point-left',
          isAnchorPoint: true,
          draggable: true
        })
      }

      if (right) {
        // right circle
        group.addShape('circle', {
          zIndex: 2,
          attrs: (0, _tslib.__assign)((0, _tslib.__assign)({}, markStyle), {
            x: r,
            y: 0,
            r: markSize / 2 || markR || 0
          }),
          index: 2,
          className: 'link-point-right',
          name: 'link-point-right',
          isAnchorPoint: true,
          draggable: true
        })
      }

      if (top) {
        // top circle
        group.addShape('circle', {
          zIndex: 2,
          attrs: (0, _tslib.__assign)((0, _tslib.__assign)({}, markStyle), {
            x: 0,
            y: -r,
            r: markSize / 2 || markR || 0
          }),
          index: 1,
          className: 'link-point-top',
          name: 'link-point-top',
          isAnchorPoint: true,
          draggable: true
        })
      }

      if (bottom) {
        // bottom circle
        group.addShape('circle', {
          zIndex: 2,
          attrs: (0, _tslib.__assign)((0, _tslib.__assign)({}, markStyle), {
            x: 0,
            y: r,
            r: markSize / 2 || markR || 0
          }),
          index: 3,
          className: 'link-point-bottom',
          name: 'link-point-bottom',
          isAnchorPoint: true,
          draggable: true
        })
      }
    },
    setState (name, value, item) {
      const group = item.getContainer()
      if (name === 'show-anchor') {
        if (value) {
          for (let i = 5; i <= 8; i++) {
            const linkPoint = group.getChildByIndex(i)
            linkPoint.attr({ ...defaultStyle.anchor.show })
          }
          console.log('t', group)
          //   group.showAnchor()
        } else {
          //   group.clearAnchor()
          for (let i = 5; i <= 8; i++) {
            const linkPoint = group.getChildByIndex(i)
            linkPoint.attr({ ...defaultStyle.anchor.default })
          }
        }
      } else if (name === 'active-anchor') {
        if (value.active) {
          if (this.activeLinkPoint) {
            const oldPoint = group.find(i => i.cfg.name === this.activeLinkPoint)
            if (oldPoint) {
              oldPoint.attr({ ...defaultStyle.anchor.show })
            }
          }
          this.activeLinkPoint = value.linkPoint
          const point = group.find(i => i.cfg.name === value.linkPoint)
          point.attr({ ...defaultStyle.anchor.hover })
        } else {
          if (this.activeLinkPoint) {
            console.log(this.activeLinkPoint)
            const point = group.find(i => i.cfg.name === this.activeLinkPoint)
            console.log(point)
            if (point) {
              point.attr({ ...defaultStyle.anchor.show })
              this.activeLinkPoint = null
            }
          }
        }
        // const rect = group.getChildByIndex(0)
        // if (value) {
        //   rect.attr('fill', this.options.stateStyles.selected.fill)
        // } else {
        //   rect.attr('fill', this.options.style.fill)
        // }
      } else if (name === 'hover') {
        if (value) {
          console.log(group)
          const keyShape = group.getChildByIndex(3)
          keyShape.attr('cursor', { ...defaultStyle.nodeStateStyle.hover })
        }
        // const rect = group.getChildByIndex(1)
        // const text = group.getChildByIndex(2)
        // if (value) {
        //   rect.attr('cursor', this.options.stateStyles.hover.cursor)
        //   if (text) { text.attr('cursor', this.options.stateStyles.hover.cursor) }
        // } else {
        //   rect.attr('cursor', this.options.style.cursor)
        //   if (text) { text.attr('cursor', this.options.style.cursor) }
        // }
      } else if (name === 'warning') {
        const shape = item.get('keyShape')
        const cfg = this.options
        if (value) {
          let r = cfg.size + 10
          if (isNaN(r)) {
            r = cfg.size[0] + 10
          }
          const back1 = group.getChildByIndex(0)
          const back2 = group.getChildByIndex(1)
          const back3 = group.getChildByIndex(2)

          // 第一个背景圆逐渐放大，并消失
          back1.animate(
            {
              r: r + 10,
              opacity: 0.1
            },
            {
              repeat: true, // 循环
              duration: 2000,
              easing: 'easeCubic',
              delay: 0 // 无延迟
            }
          )

          // 第二个背景圆逐渐放大，并消失
          back2.animate(
            {
              r: r + 10,
              opacity: 0.1
            },
            {
              repeat: true, // 循环
              duration: 2000,
              easing: 'easeCubic',
              delay: 1000 // 1 秒延迟
            }
          ) // 1 秒延迟

          // 第三个背景圆逐渐放大，并消失
          back3.animate(
            {
              r: r + 10,
              opacity: 0.1
            },
            {
              repeat: true, // 循环
              duration: 2000,
              easing: 'easeCubic',
              delay: 2000 // 2 秒延迟
            }
          )
        } else {
          // running 状态为 false 时
          // 结束动画
          shape.stopAnimate()
        }
      }
    }

  }, 'circle')
}
