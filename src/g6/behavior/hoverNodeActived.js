import { Marker, Circle } from '@antv/g-canvas/lib/shape'
export default function (G6) {
  G6.registerBehavior('hoverNodeActived', {
    getEvents () {
      return {
        'node:mouseenter': 'onNodeEnter',
        'node:mouseleave': 'onNodeLeave',
        'node:mousemove': 'onAnchorMove',
        'node:dragenter': 'onNodeEnter'
        // 'canvas:mousemove': 'onCanvasMove'
      }
    },
    onAnchorMove (e) {
      // console.log(e.type, e.name, e.target, e.target.cfg.className)
      // console.log(this, this.graph)
      const node = e.item
      const group = node.getContainer()
      if (String(e.target.cfg.className).indexOf('link-point') !== -1) {
        this.graph.setItemState(group.cfg.item, 'active-anchor', {
          linkPoint: e.target.cfg.className,
          active: true
        })
      } else {
        this.graph.setItemState(group.cfg.item, 'active-anchor', {
          linkPoint: e.target.cfg.className,
          active: false
        })
      }
    },
    onNodeEnter (e) {
      // if (!this.graph.get('edgeDragging')) {
      this.graph.setItemState(e.item, 'show-anchor', true)
      // this.graph.setItemState(e.item, 'active-anchor', true)
      // }
      if (e.target.get('name') === 'anchor-shape' && !this.graph.get('edgeDragging')) {
        this.graph.setItemState(e.item, 'active-anchor', true)
      }
    },
    onNodeLeave (e) {
      // console.log('mouseleave', e.item.getModel(), e.target)
      if (!this.graph.get('edgeDragging')) {
        const node = e.item
        const group = node.getContainer()
        this.graph.setItemState(group.cfg.item, 'active-anchor', {
          linkPoint: e.target.cfg.className,
          active: false
        })
        this.graph.setItemState(e.item, 'show-anchor', false)
      }
    }

  })
}
