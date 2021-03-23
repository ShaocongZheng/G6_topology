import { Marker, Circle } from '@antv/g-canvas/lib/shape'
export default function (G6) {
  G6.registerBehavior('hoverNodeActived', {
    getEvents () {
      return {
        'node:mouseenter': 'onNodeEnter',
        'node:mouseleave': 'onNodeLeave'
        // 'marker:mousemove': 'onAnchorMove'
        // 'canvas:mousemove': 'onCanvasMove'
      }
    },
    onAnchorMove (e) {
      const node = e.item.getContainer().getParent()
      console.log('move', e.target.get('name'), e.target.get('name') === 'anchor-shape')
      if (e.target.get('name') === 'anchor-shape' && node && !this.graph.get('edgeDragging')) {
        // this.graph.setItemState(e.item, 'show-anchor', true)
        this.graph.setItemState(e.item, 'active-anchor', true)
      }
    },
    onNodeEnter (e) {
      console.log('mouseenter', e.target.get('name'))
      if (!this.graph.get('edgeDragging')) {
        this.graph.setItemState(e.item, 'show-anchor', true)
      }
      if (e.target.get('name') === 'anchor-shape' && !this.graph.get('edgeDragging')) {
        this.graph.setItemState(e.item, 'active-anchor', true)
      }
    },
    onNodeLeave (e) {
      // console.log('mouseleave', e.target.get('name'), e.target.__proto__)
      if (!(e.target.__proto__.constructor.name === 'Marker') && !this.graph.get('edgeDragging')) {
        this.graph.setItemState(e.item, 'show-anchor', false)
      }
      this.graph.setItemState(e.item, 'active-anchor', true)
    }
  })
}
