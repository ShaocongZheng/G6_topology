<style lang="scss" scoped>
#container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  .main {
    flex: 1;
    display: flex;
    flex-direction: row;
    position: relative;
    height: 100%;
    align-items: stretch;
    #canvas {
      flex-grow: 4;
      flex-basis: 50%;
    }
  }
}
</style>
<template>
  <div id="container">
    <tool-bar ref="toolbar" :graph="graph"></tool-bar>
    <div class="main">
      <item-panel ref="itemPanel"></item-panel>
      <div id="canvas" ref="canvas" class="canvasPanel"></div>
      <config-panel :graph="graph"></config-panel>
    </div>
  </div>
</template>
<script>
import G6 from '@antv/g6'
import ItemPanel from './ItemPanel'
import ToolBar from './Toolbar'
import ConfigPanel from './ConfigPanel'
import G6Register from '../g6'
import defaultStyle from '../g6/config/defaultStyle'
import ToolBarPlugin from '../g6/plugins/Toolbar'
import DragPanelPlugin from '../g6/plugins/DragPanel'
G6Register(G6)
export default {
  components: {
    ItemPanel: ItemPanel,
    ToolBar: ToolBar,
    ConfigPanel: ConfigPanel
  },
  data () {
    return {
      graph: null
    }
  },
  mounted () {
    const data = {
      nodes: [
        { id: '0', label: 'n0', class: 'c0' },
        { id: '1', label: 'n1', class: 'c0' },
        { id: '2', label: 'n2', class: 'c0' },
        { id: '3', label: 'n3', class: 'c0' },
        { id: '4', label: 'n4', class: 'c0' },
        { id: '5', label: 'n5', class: 'c0' },
        { id: '6', label: 'n6', class: 'c1' },
        { id: '7', label: 'n7', class: 'c1', x: 543, y: -100 },
        { id: '8', label: 'n8', class: 'c1', x: 1, y: 0 },
        { id: '9', label: 'n9', class: 'c1', x: 0, y: -222 },

        {
          id: '19',
          label: 'server',
          class: 'c2',
          size: 30,
          type: 'image',
          img: require('../assets/images/icon/云存储_cloud-storage.svg')
        }
      ],
      edges: [
        { source: '0', target: '1', label: 'e0-1', weight: 1 },
        { source: '0', target: '2', label: 'e0-2', weight: 2 },
        { source: '0', target: '3', label: 'e0-3', weight: 3 },
        { source: '0', target: '4', label: 'e0-4', weight: 1.4 },
        { source: '0', target: '5', label: 'e0-5', weight: 2 },
        { source: '0', target: '7', label: 'e0-7', weight: 2 },
        { source: '0', target: '8', label: 'e0-8', weight: 2 },
        { source: '0', target: '9', label: 'e0-9', weight: 1.3 },
        { source: '2', target: '3', label: 'e2-3', weight: 1 },
        { source: '4', target: '5', label: 'e4-5', weight: 1.4 },
        { source: '4', target: '6', label: 'e4-6', weight: 2.1 },
        { source: '5', target: '6', label: 'e5-6', weight: 1.9 }
      ],
      combos: [
        {
          id: '21',
          padding: 30
        }
      ]
    }
    const toolbar = new ToolBarPlugin({
      container: this.$refs.canvas
    })
    const dragpanel = new DragPanelPlugin()
    const grid = new G6.Grid()
    const width = document.getElementById('canvas').clientWidth
    const height = document.getElementById('canvas').scrollHeight || 500
    this.graph = new G6.Graph({
      container: 'canvas', // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
      width: width, // Number，必须，图的宽度
      height: height,
      defaultNode: {
        type: 'iconCircle',
        // 其他配置
        size: 60,
        iconSize: 30,
        // img: require('../../public/images/icon/云存储_cloud-storage.svg'),
        anchorPoints: [
          [0, 0.5],
          [0.5, 0],
          [1, 0.5],
          [0.5, 1]
        ],
        icon: {
          show: true,
          img: require('../../public/images/icon/云存储_cloud-storage.svg')
        },
        labelCfg: {
          position: 'bottom',
          offset: 10
        },
        style: {
          ...defaultStyle.nodeStateStyle.default
        }
      },
      defaultCombo: defaultStyle.defaultCombo,
      modes: {
        default: [
          'drag-canvas',
          'clickSelected',
          'drag-node',
          'drag-combo',
          'dragEdge',
          'collapse-expand-combo',
          'dragToAddItem',
          'hoverNodeActived',
          {
            type: 'click-select',
            multiple: true,
            trigger: 'shift'
          }
        ],
        view: [],
        edit: [
          // 'drag-canvas',
          // 'hoverNodeActived',
          // 'hoverAnchorActived',
          // 'dragNode',
          // 'dragEdge'
          // 'dragPanelItemAddNode',
          // 'clickSelected',
          // 'deleteItem',
          // 'itemAlign',
          // 'dragPoint',
          // 'brush-select'
        ]
      },
      enabledStack: true,
      maxStep: 20,
      plugins: [toolbar, grid, dragpanel]
    })

    this.graph.data(data) // 读取 Step 2 中的数据源到图上
    this.graph.render() // 渲染图
    this.$store.commit('graph/setGraph', this.graph)
    this.showAlertNodes('class', ['c1'], 'serious')
    // 不明原因导致锚点拖拽后capture为false，需要重新设置
    this.graph.on('node:dragend', e => {
      e.item.getContainer().set('capture', true)
    })
    window.onresize = () => {
      this.graph.changeSize(document.getElementById('canvas').clientWidth, document.getElementById('canvas').scrollHeight || 500)
    }
  },
  methods: {
    initDragEvent () {
      const parentNode = this.$refs.itemPanel.$el
      // const ghost = createDom('<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"' + ' style="opacity:0"/>')
      const ghost = new Image()
      ghost.src = require('../assets/images/icon/云存储_cloud-storage.svg')
      const children = parentNode.querySelectorAll(
        '.panelContent > .item > img'
      )
      children.forEach((child) => {
        child.addEventListener('dragstart', (e) => {
          e.dataTransfer.setDragImage(ghost, 0, 0)
        })
      })
    },
    showAlertNodes (key, list, state) {
      for (const i of list) {
        this.graph.find('node', (node) => {
          if (node.get('model')[key] === i) {
            this.graph.setItemState(node, state, true)
            return true
          }
        })
      }
    }
  }
}
</script>
