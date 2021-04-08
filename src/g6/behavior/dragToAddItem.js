import editorStyle from '../config/defaultStyle'
// import { getShapeName } from '../config/clazz'

export default function (G6) {
  G6.registerBehavior('dragToAddItem', {
    getEvents () {
      return {
        dragover: 'onMouseMove',
        'canvas:mouseup': 'onMouseUp',
        'canvas:mouseleave': 'onMouseLeave'
      }
    },
    onMouseMove (e) {
      if (this.graph.get('addNodeDragging')) {
        let delegateShape = this.graph.get('addDelegateShape')
        // const addModel = this.graph.get('addModel')
        const width = 40
        const height = 40
        // const point = this.graph.getCanvasByPoint(e.x, e.y)
        const point = {
          x: e.x,
          y: e.y
        }
        const x = point.x
        const y = point.y
        if (!delegateShape) {
          const parent = this.graph.get('group')
          delegateShape = parent.addShape('rect', {
            attrs: {
              width,
              height,
              x: x - width / 2,
              y: y - height / 2,
              ...editorStyle.nodeDelegationStyle
            }
          })
          delegateShape.set('capture', false)
          this.graph.set('addDelegateShape', delegateShape)
        }
        delegateShape.attr({ x: x - width / 2, y: y - height / 2 })
        this.graph.paint()
        this.graph.emit('afternodedrag', delegateShape)
      }
    },
    onMouseUp (e) {
      if (this.graph.get('addNodeDragging')) {
        const p = this.graph.getPointByClient(e.clientX, e.clientY)

        this._addNode(p)
      }
    },
    onMouseLeave (e) {
      if (this.graph.get('addNodeDragging')) {
        this._clearDelegate()
        this.graph.emit('afternodedragend')
      }
    },
    _clearDelegate () {
      const delegateShape = this.graph.get('addDelegateShape')
      if (delegateShape) {
        delegateShape.remove()
        this.graph.set('addDelegateShape', null)
        this.graph.paint()
      }
      this.graph.emit('afternodedragend')
    },
    _addNode (p) {
      if (this.graph.get('addNodeDragging')) {
        const addModel = this.graph.get('addModel')
        // addModel.type = 'image'
        // addModel.img = addModel.modelName

        if (addModel.type === 'iconCircle') {
          addModel.icon = {
            img: addModel.img
          }
        }
        console.log(addModel)
        const { clazz = 'userTask' } = addModel
        // type、shape属性同时存在即兼容之前版本的数据，又兼容g6的升级
        // addModel.type = getShapeName(clazz)
        // addModel.shape = getShapeName(clazz)
        const timestamp = new Date().getTime()
        const id = clazz + timestamp
        const x = p.x
        const y = p.y

        this.graph.add(addModel.mainType, {
          ...addModel,
          x: x,
          y: y,
          id: id
        })

        this._clearDelegate()
      }
    }
  })
}
