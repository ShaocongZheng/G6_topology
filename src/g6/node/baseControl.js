import defaultStyle from '../config/defaultStyle'
import { mix } from '@antv/util'
var _tslib = require('tslib')

var _g6Core = require('@antv/g6-core')

var _util = require('@antv/util')
export default function (G6) {
  G6.registerNode('baseControl', {
    options: {
      size: [_g6Core.BaseGlobal.defaultNode.size],
      style: {
        x: 0,
        y: 0,
        // stroke: _g6Core.BaseGlobal.defaultNode.style.stroke,
        // fill: _g6Core.BaseGlobal.defaultNode.style.fill,
        stroke: defaultStyle.nodeStateStyle.default.stroke,
        // fill: defaultStyle.nodeStateStyle.default.fill,
        lineWidth: _g6Core.BaseGlobal.defaultNode.style.lineWidth,
        lineDash: [5, 5]
      },
      labelCfg: {
        // position: 'bottom',
        // offset: 10,
        // style: {
        //   fill: _g6Core.BaseGlobal.nodeLabel.style.fill,
        //   fontSize: _g6Core.BaseGlobal.nodeLabel.style.fontSize
        // }
      },

      // stateStyles: (0, _tslib.__assign)({}, _g6Core.BaseGlobal.nodeStateStyles)
      stateStyles: defaultStyle.nodeStateStyle
    },
    shapeType: 'baseControl',
    draw: function drawShape (cfg, group) {
      var _a = this.getOptions(cfg).icon
      var defaultIcon = _a === undefined ? {} : _a
      var style = this.getShapeStyle(cfg)
      var icon = (0, _util.deepMix)({}, defaultIcon, cfg.icon)
      const r = cfg.size / 2
      //   // 第一个背景圆
      //   const back1 = group.addShape('circle', {
      //     zIndex: -3,
      //     attrs: {
      //       x: 0,
      //       y: 0,
      //       r,
      //       fill: cfg.color,
      //       opacity: 0.6
      //     },
      //     // must be assigned in G6 3.3 and later versions. it can be any value you want
      //     name: 'circle-shape1'
      //   })
      //   // 第二个背景圆
      //   const back2 = group.addShape('circle', {
      //     zIndex: -2,
      //     attrs: {
      //       x: 0,
      //       y: 0,
      //       r,
      //       // fill: 'blue', // 为了显示清晰，随意设置了颜色
      //       opacity: 0.6
      //     },
      //     // must be assigned in G6 3.3 and later versions. it can be any value you want
      //     name: 'circle-shape2'
      //   })
      //   // 第三个背景圆
      //   const back3 = group.addShape('circle', {
      //     zIndex: -1,
      //     attrs: {
      //       x: 0,
      //       y: 0,
      //       r,
      //       // fill: 'green',
      //       opacity: 0.6
      //     },
      //     // must be assigned in G6 3.3 and later versions. it can be any value you want
      //     name: 'circle-shape3'
      //   })
      var keyShape = group.addShape('rect', {
        zIndex: 1,
        attrs: mix(this.options.style, style),
        className: 'keyShape',
        draggable: true
      })
      var width = icon.width
      var height = icon.height
      var show = icon.show

      //   if (show) {
      //     group.addShape('image', {
      //       zIndex: 2,
      //       attrs: (0, _tslib.__assign)({
      //         x: -width / 2,
      //         y: -height / 2
      //       }, icon),
      //       className: this.type + '-icon',
      //       name: this.type + '-icon',
      //       draggable: true
      //     })
      //   }

      //   this.drawControlPoints(cfg, group)
      return keyShape
    },

    drawControlPoints: function drawLinkPoints (cfg, group) {
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
        group.addShape('rect', {
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
    }
  }, 'rect')
}
