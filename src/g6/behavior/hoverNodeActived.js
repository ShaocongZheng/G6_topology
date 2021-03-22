import { Marker } from '@antv/g-canvas/lib/shape'
export default function (G6) {
  G6.registerBehavior('hoverNodeActived', {
    getEvents () {
      return {
        'node:mouseenter': 'onNodeEnter',
        'node:mouseleave': 'onNodeLeave',
        'anchor:mouseleave': 'onAnchorLeave'
      }
    },
    onAnchorLeave (e) {
      console.log(e)
      const node = e.item.getContainer().getParent()
      // if (node && !this.graph.get('edgeDragging')) {
      //   this.graph.setItemState(node.get('item'), 'show-anchor', false)
      // }
    },
    onNodeEnter (e) {
      console.log(e.item.getModel(), e.item.getContainer())
      if (!this.graph.get('edgeDragging')) {
        this.graph.setItemState(e.item, 'show-anchor', true)
      }
    },
    onNodeLeave (e) {
      if (!this.graph.get('edgeDragging')) {
        this.graph.setItemState(e.item, 'show-anchor', false)
      }
    }
  })
}
