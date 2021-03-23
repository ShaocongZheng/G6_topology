import { Marker } from '@antv/g-canvas/lib/shape'
export default function (G6) {
  G6.registerBehavior('hoverNodeActived', {
    getEvents () {
      return {
        'node:mouseenter': 'onNodeEnter',
        'node:mouseleave': 'onNodeLeave',
        'node:mousemove': 'onAnchorLeave'
      }
    },
    onAnchorLeave (e) {
      const node = e.item.getContainer().getParent()
      console.log('mouseenter', e.target.get('name'))
      if (node && !this.graph.get('edgeDragging')) {
        this.graph.setItemState(e.item, 'show-anchor', true)
      }
    },
    onNodeEnter (e) {
      if (!this.graph.get('edgeDragging')) {
        this.graph.setItemState(e.item, 'show-anchor', true)
      }
      if (e.target.get('name') === 'anchor-shape' && !this.graph.get('edgeDragging')) { this.graph.setItemState(e.item, 'active-anchor', true) }
    },
    onNodeLeave (e) {
      console.log('mouseleave', e.target.get('name'))
      if (!(e.target instanceof Marker) && !this.graph.get('edgeDragging') && e.target.get('name') !== 'anchor-shape') {
        this.graph.setItemState(e.item, 'show-anchor', false)
      }
    }
  })
}
