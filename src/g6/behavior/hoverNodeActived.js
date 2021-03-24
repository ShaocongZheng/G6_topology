import { Marker, Circle } from '@antv/g-canvas/lib/shape'
export default function (G6) {
  G6.registerBehavior('hoverNodeActived', {
    getEvents () {
      return {
        'node:mouseenter': 'onNodeEnter',
        'node:mouseleave': 'onNodeLeave',
        'node:mousemove': 'onAnchorMove'
        // 'canvas:mousemove': 'onCanvasMove'
      }
    },
    onAnchorMove (e) {
      // const node = e.item.getContainer().getParent()
      // console.log(e.type, e.name, e.target, e.target.cfg.className)
      console.log(e.type, e.name, e.target.cfg.className)
      const node = e.item
      const group = node.getContainer()
      if (String(e.target.cfg.className).indexOf('link-point') !== -1 && !this.graph.get('edgeDragging')) {
        console.log('group', group)
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
      console.log(e.type, e.name, e.target, e.target.cfg.className, e.item)
      if (!this.graph.get('edgeDragging')) {
        this.graph.setItemState(e.item, 'show-anchor', true)
        // this.graph.setItemState(e.item, 'active-anchor', true)
      }
      if (e.target.get('name') === 'anchor-shape' && !this.graph.get('edgeDragging')) {
        this.graph.setItemState(e.item, 'active-anchor', true)
      }
    },
    onNodeLeave (e) {
      // console.log('mouseleave', e.item.getModel(), e.target)
      console.log(e.type, e.name, e.target, e.target.cfg.className)
      if (!this.graph.get('edgeDragging')) {
        const node = e.item
        const group = node.getContainer()
        console.log('group', group)
        this.graph.setItemState(group.cfg.item, 'active-anchor', {
          linkPoint: e.target.cfg.className,
          active: false
        })
        this.graph.setItemState(e.item, 'show-anchor', false)
      }
    }
  })
}
