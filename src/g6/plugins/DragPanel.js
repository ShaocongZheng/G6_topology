import Base from '@antv/g6-plugin/lib/base'
import { createDom } from '@antv/dom-util'

var __extends = this && this.__extends || (function () {
  var _extendStatics = function extendStatics (d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]
      }
    }

    return _extendStatics(d, b)
  }

  return function (d, b) {
    if (typeof b !== 'function' && b !== null) throw new TypeError('Class extends value ' + String(b) + ' is not a constructor or null')

    _extendStatics(d, b)

    function __ () {
      this.constructor = d
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __())
  }
}())

var getEventPath = function getEventPath (evt) {
  if (!evt) {
    return []
  }

  if (evt.composedPath) {
    return evt.composedPath()
  }

  var path = []
  var el = evt.target

  while (el) {
    path.push(el)

    if (el.tagName === 'HTML') {
      path.push(document, window)
      return path
    }

    el = el.parentElement
  }

  return path
}

var DragPanel =
  /** @class */
  (function (_super) {
    __extends(DragPanel, _super)

    function DragPanel () {
      return _super !== null && _super.apply(this, arguments) || this
    }

    DragPanel.prototype.getDefaultCfgs = function () {
      return {
        handleClick: undefined,
        // 指定菜单内容，function(e) {...}
        getContent: function getContent (graph) {
          return "\n          <ul class='g6-component-custom-toolbar'>\n            <li code='redo'>\n              <svg class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\">\n                <path d=\"M256 682.666667c0-102.741333 66.730667-213.333333 213.333333-213.333334 107.008 0 190.762667 56.576 230.570667 125.354667L611.968 682.666667H853.333333v-241.365334l-91.562666 91.562667C704.768 448.469333 601.130667 384 469.333333 384c-196.096 0-298.666667 150.229333-298.666666 298.666667h85.333333z\" fill=\"\" p-id=\"2041\"></path>\n              </svg>\n            </li>\n            <li code='undo'>\n              <svg class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\">\n                <path d=\"M170.666667 682.666667h241.365333l-87.936-87.978667C363.904 525.909333 447.658667 469.333333 554.666667 469.333333c146.602667 0 213.333333 110.592 213.333333 213.333334h85.333333c0-148.437333-102.570667-298.666667-298.666666-298.666667-131.797333 0-235.392 64.469333-292.48 148.821333L170.666667 441.301333V682.666667z\" fill=\"\" p-id=\"2764\"></path>\n              </svg>\n            </li>\n            <li  code='zoomOut'>\n              <svg class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\">\n                <path d=\"M658.432 428.736a33.216 33.216 0 0 1-33.152 33.152H525.824v99.456a33.216 33.216 0 0 1-66.304 0V461.888H360.064a33.152 33.152 0 0 1 0-66.304H459.52V296.128a33.152 33.152 0 0 1 66.304 0V395.52H625.28c18.24 0 33.152 14.848 33.152 33.152z m299.776 521.792a43.328 43.328 0 0 1-60.864-6.912l-189.248-220.992a362.368 362.368 0 0 1-215.36 70.848 364.8 364.8 0 1 1 364.8-364.736 363.072 363.072 0 0 1-86.912 235.968l192.384 224.64a43.392 43.392 0 0 1-4.8 61.184z m-465.536-223.36a298.816 298.816 0 0 0 298.432-298.432 298.816 298.816 0 0 0-298.432-298.432A298.816 298.816 0 0 0 194.24 428.8a298.816 298.816 0 0 0 298.432 298.432z\"></path>\n              </svg>\n            </li>\n            <li code='zoomIn'>\n              <svg class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\">\n                <path d=\"M639.936 416a32 32 0 0 1-32 32h-256a32 32 0 0 1 0-64h256a32 32 0 0 1 32 32z m289.28 503.552a41.792 41.792 0 0 1-58.752-6.656l-182.656-213.248A349.76 349.76 0 0 1 480 768 352 352 0 1 1 832 416a350.4 350.4 0 0 1-83.84 227.712l185.664 216.768a41.856 41.856 0 0 1-4.608 59.072zM479.936 704c158.784 0 288-129.216 288-288S638.72 128 479.936 128a288.32 288.32 0 0 0-288 288c0 158.784 129.216 288 288 288z\" p-id=\"3853\"></path>\n              </svg>\n            </li>\n            <li code='realZoom'>\n              <svg class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"24\">\n                <path d=\"M384 320v384H320V320h64z m256 0v384H576V320h64zM512 576v64H448V576h64z m0-192v64H448V384h64z m355.968 576H92.032A28.16 28.16 0 0 1 64 931.968V28.032C64 12.608 76.608 0 95.168 0h610.368L896 192v739.968a28.16 28.16 0 0 1-28.032 28.032zM704 64v128h128l-128-128z m128 192h-190.464V64H128v832h704V256z\"></path>\n              </svg>\n            </li>\n            <li code='autoZoom'>\n              <svg class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"24\">\n                <path d=\"M684.288 305.28l0.128-0.64-0.128-0.64V99.712c0-19.84 15.552-35.904 34.496-35.712a35.072 35.072 0 0 1 34.56 35.776v171.008h170.944c19.648 0 35.84 15.488 35.712 34.432a35.072 35.072 0 0 1-35.84 34.496h-204.16l-0.64-0.128a32.768 32.768 0 0 1-20.864-7.552c-1.344-1.024-2.816-1.664-3.968-2.816-0.384-0.32-0.512-0.768-0.832-1.088a33.472 33.472 0 0 1-9.408-22.848zM305.28 64a35.072 35.072 0 0 0-34.56 35.776v171.008H99.776A35.072 35.072 0 0 0 64 305.216c0 18.944 15.872 34.496 35.84 34.496h204.16l0.64-0.128a32.896 32.896 0 0 0 20.864-7.552c1.344-1.024 2.816-1.664 3.904-2.816 0.384-0.32 0.512-0.768 0.768-1.088a33.024 33.024 0 0 0 9.536-22.848l-0.128-0.64 0.128-0.704V99.712A35.008 35.008 0 0 0 305.216 64z m618.944 620.288h-204.16l-0.64 0.128-0.512-0.128c-7.808 0-14.72 3.2-20.48 7.68-1.28 1.024-2.752 1.664-3.84 2.752-0.384 0.32-0.512 0.768-0.832 1.088a33.664 33.664 0 0 0-9.408 22.912l0.128 0.64-0.128 0.704v204.288c0 19.712 15.552 35.904 34.496 35.712a35.072 35.072 0 0 0 34.56-35.776V753.28h170.944c19.648 0 35.84-15.488 35.712-34.432a35.072 35.072 0 0 0-35.84-34.496z m-593.92 11.52c-0.256-0.32-0.384-0.768-0.768-1.088-1.088-1.088-2.56-1.728-3.84-2.688a33.088 33.088 0 0 0-20.48-7.68l-0.512 0.064-0.64-0.128H99.84a35.072 35.072 0 0 0-35.84 34.496 35.072 35.072 0 0 0 35.712 34.432H270.72v171.008c0 19.84 15.552 35.84 34.56 35.776a35.008 35.008 0 0 0 34.432-35.712V720l-0.128-0.64 0.128-0.704a33.344 33.344 0 0 0-9.472-22.848zM512 374.144a137.92 137.92 0 1 0 0.128 275.84A137.92 137.92 0 0 0 512 374.08z\"></path>\n              </svg>\n            </li>\n          </ul>\n        "
        },
        zoomSensitivity: 2
      }
    }

    DragPanel.prototype.init = function () {
      var _this = this

      var graph = this.get('graph')

      const ghost = createDom('<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"' + ' style="opacity:0"/>')
      const panel = document.getElementsByClassName('itemPanel')[0]
      //   const children = panel.querySelectorAll('.itemBox > img')
      panel.addEventListener('dragstart', e => {
        if (e.target.tagName === 'IMG') {
          const addModel = e.target.dataset
          console.log(addModel)
          let model = {}
          if (addModel.moduletype === 'server') {
            model = {
              label: 'server',
              mainType: addModel.maintype,
              type: addModel.type,
              img: addModel.img,
              data: {
                ip: '',
                desc: '',
                enName: '',
                machineRoom: '',
                region: '',
                cpu: 4,
                memory: 8,
                hardDrive: 1024
              }
            }
          }
          e.dataTransfer.setDragImage(ghost, 0, 0)
          graph.set('addNodeDragging', true)
          graph.set('addModel', model)
        }
      })
      panel.addEventListener('dragend', e => {
        if (e.target.tagName === 'IMG') {
          graph.emit('canvas:mouseup', e)
          graph.set('addNodeDragging', false)
          graph.set('addModel', null)
        }
      })
    }

    // DragPanel.prototype.destroy = function () {
    //   var toolBar = this.get('toolBar')

    //   if (toolBar) {
    //     var container = this.get('container')

    //     if (!container) {
    //       container = this.get('graph').get('container')
    //     }

    //     container.removeChild(toolBar)
    //   }

    //   var handleClick = this.get('handleClick')

    //   if (handleClick) {
    //     toolBar.removeEventListener('click', handleClick)
    //   }
    // }

    return DragPanel
  }(Base))

export default DragPanel
