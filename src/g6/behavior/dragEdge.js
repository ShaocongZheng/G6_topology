import editorStyle from '../config/defaultStyle'
// import { Marker } from '@antv/g6-core/lib/element/shape'

import { Marker } from '@antv/g-canvas/lib/shape'
import store from '../../store'

export default function (G6) {
  G6.registerBehavior('dragEdge', {
    getEvents () {
      return {
        // 'node:click': 'onAnchorClick',
        // mousemove: 'onDrag'

        'node:dragstart': 'onDragStart',
        'node:drag': 'onDrag',
        'node:dragover': 'onDragOver',
        'node:drop': 'onDragStart',
        'node:dragend': 'onDragEnd'

      }
    },
    onDragStart (e) {
      const node = e.item
      const group = node.getContainer()
      console.log('dragstart')
      if (String(e.target.cfg.className).indexOf('link-point') !== -1) {
        this.__showAllAnchors()
        const nodeModel = group.cfg.item.getModel()
        const anchorModel = e.target.cfg
        const point = {
          x: e.x,
          y: e.y
        }
        if (!this.graph.get('edgeDragging')) {
          this.graph.edge = this.graph.addItem('edge', {
            sourceAnchor: anchorModel.index,
            source: nodeModel.id,
            target: point
          })
          this.graph.set('edgeDragging', true)
        } else {
          this.graph.updateItem(this.graph.edge, {
            targetAnchor: anchorModel.index,
            target: nodeModel.id
          })
          this.graph.edge = null
          this.graph.set('edgeDragging', false)
          this._clearAllAnchors()
        }
      } else if (this.graph.get('edgeDragging')) {
        this.graph.removeItem(this.graph.edge)
        this.graph.edge = null
        this.graph.set('edgeDragging', false)
        this._clearAllAnchors()
      }
    },
    onDragEnter (e) {
      if (!this.origin) {
        return
      }
      if (!this.sameNode(e)) {
        e.item.setHotspotActived(true)
        this.origin.targetNode = e.target.getParent().getParent().get('item')
        this.origin.targetAnchor = e.item.get('index')
      }
    },
    onDrag (e) {
      const point = {
        x: e.x,
        y: e.y
      }

      if (this.graph.get('edgeDragging') && this.graph.edge) {
        this.graph.updateItem(this.graph.edge, {
          target: point
        })
      } else {
        if (e.item === store.state.graph.selectedItems.nodes[0]) {
          store.commit('graph/setSelectedNodes', [e.item])
        }
      }
    },
    onDragOver (e) {
      if (String(e.target.cfg.className).indexOf('link-point') !== -1) {
        const node = e.item
        const group = node.getContainer()
        this.graph.setItemState(group.cfg.item, 'active-anchor', {
          linkPoint: e.target.cfg.className,
          active: true
        })
      }
    },
    onDragEnd (e) {
      if (this.graph.get('edgeDragging')) {
        this.graph.removeItem(this.graph.edge)
        this.graph.edge = null
        this.graph.set('edgeDragging', false)
        this._clearAllAnchors()
      }
    },
    __showAllAnchors () {
      this.graph.getNodes().forEach(node => {
        this.graph.setItemState(node, 'show-anchor', true)
      })
    },
    _clearAllAnchors () {
      this.graph.getNodes().forEach(node => {
        this.graph.setItemState(node, 'show-anchor', false)
      })
    }
  })
}
