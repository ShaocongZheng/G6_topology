export default function (G6) {
  G6.registerBehavior('hoverAnchorActived', {
    getEvents () {
      return {
        // 'node:dragstart': 'onAnchorEnter',
        // 'anchor:mousemove': 'onAnchorEnter',
        // 'anchor:mouseleave': 'onAnchorLeave'
      }
    },
    onAnchorEnter (e) {
      console.log('testdrag')
      // console.log(this.graph.get('edgeDragging'))
      // if (!this.graph.get('edgeDragging')) { this.graph.setItemState(e.item, 'active-anchor', true) }
    },
    onAnchorLeave (e) {
      if (!this.graph.get('edgeDragging')) {
        const node = e.item.getContainer().getParent()
        if (node) {
          this.graph.setItemState(e.item, 'active-anchor', false)
        }
      }
    }
  })
}
