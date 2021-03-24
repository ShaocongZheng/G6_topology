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
        lineWidth: _g6Core.BaseGlobal.defaultNode.linkPoints.lineWidth,
        fill: _g6Core.BaseGlobal.defaultNode.linkPoints.fill,
        stroke: _g6Core.BaseGlobal.defaultNode.linkPoints.stroke
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
      stateStyles: (0, _tslib.__assign)({}, _g6Core.BaseGlobal.nodeStateStyles)
    },
    shapeType: 'iconCircle',
    drawShape: function drawShape (cfg, group) {
      var _a = this.getOptions(cfg).icon
      var defaultIcon = _a === undefined ? {} : _a
      var style = this.getShapeStyle(cfg)
      var icon = (0, _util.deepMix)({}, defaultIcon, cfg.icon)
      var keyShape = group.addShape('circle', {
        attrs: style,
        className: this.type + '-keyShape',
        draggable: true
      })
      var width = icon.width
      var height = icon.height
      var show = icon.show

      if (show) {
        group.addShape('image', {
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
          attrs: (0, _tslib.__assign)((0, _tslib.__assign)({}, markStyle), {
            x: -r,
            y: 0,
            r: markSize / 2 || markR || 0
          }),
          className: 'link-point-left',
          name: 'link-point-left',
          isAnchorPoint: true
        })
      }

      if (right) {
        // right circle
        group.addShape('circle', {
          attrs: (0, _tslib.__assign)((0, _tslib.__assign)({}, markStyle), {
            x: r,
            y: 0,
            r: markSize / 2 || markR || 0
          }),
          className: 'link-point-right',
          name: 'link-point-right',
          isAnchorPoint: true
        })
      }

      if (top) {
        // top circle
        group.addShape('circle', {
          attrs: (0, _tslib.__assign)((0, _tslib.__assign)({}, markStyle), {
            x: 0,
            y: -r,
            r: markSize / 2 || markR || 0
          }),
          className: 'link-point-top',
          name: 'link-point-top',
          isAnchorPoint: true
        })
      }

      if (bottom) {
        // bottom circle
        group.addShape('circle', {
          attrs: (0, _tslib.__assign)((0, _tslib.__assign)({}, markStyle), {
            x: 0,
            y: r,
            r: markSize / 2 || markR || 0
          }),
          className: 'link-point-bottom',
          name: 'link-point-bottom',
          isAnchorPoint: true
        })
      }
    },
    setState (name, value, item) {
      const group = item.getContainer()
      console.log('setState')
      if (name === 'show-anchor') {
        if (value) {
          for (let i = 2; i <= 5; i++) {
            const linkPoint = group.getChildByIndex(i)
            linkPoint.attr('r', 4)
          }

        //   group.showAnchor()
        } else {
        //   group.clearAnchor()
          for (let i = 2; i <= 5; i++) {
            const linkPoint = group.getChildByIndex(i)
            linkPoint.attr('r', 0)
          }
        }
      } else if (name === 'active-anchor') {
        console.log(value)
        if (value.active) {
          this.activeLinkPoint = value.linkPoint
          const point = group.find(i => i.cfg.name === value.linkPoint)
          point.attr('fill', 'red')
        } else {
          const point = group.find(i => i.cfg.name === this.activeLinkPoint)
          if (point) {
            point.attr('fill', _g6Core.BaseGlobal.defaultNode.linkPoints.fill)
          }
          this.activeLinkPoint = ''
        }
        // const rect = group.getChildByIndex(0)
        // if (value) {
        //   rect.attr('fill', this.options.stateStyles.selected.fill)
        // } else {
        //   rect.attr('fill', this.options.style.fill)
        // }
      } else if (name === 'hover') {
        // const rect = group.getChildByIndex(1)
        // const text = group.getChildByIndex(2)
        // if (value) {
        //   rect.attr('cursor', this.options.stateStyles.hover.cursor)
        //   if (text) { text.attr('cursor', this.options.stateStyles.hover.cursor) }
        // } else {
        //   rect.attr('cursor', this.options.style.cursor)
        //   if (text) { text.attr('cursor', this.options.style.cursor) }
        // }
      }
    }

  }, 'circle')
}
