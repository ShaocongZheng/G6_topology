<style lang="scss" scoped>
#container {
  height: 100%;
  display:flex;
  flex-direction: column;
  align-items: stretch;
  .main {
    flex: 1;
    display:flex;
    flex-direction: row;
    height: 100%;
  }
}
</style>
<template>
  <div id="container">
      <tool-bar ref="toolbar" :graph="graph"></tool-bar>
      <div class="main">
        <item-panel ref="itemPanel"></item-panel>
        <div id="canvas" ref="canvas" class="canvasPanel" style="flex:4"></div>
      </div>
  </div>
</template>
<script>
import G6 from '@antv/g6'
import ItemPanel from './ItemPanel'
import ToolBar from './Toolbar'
import registerBehavior from '../g6/behavior'
import ToolBarPlugin from '../g6/plugins/Toolbar'
import DragPanelPlugin from '../g6/plugins/DragPanel'
registerBehavior(G6)
export default {
  components: {
    ItemPanel: ItemPanel,
    ToolBar: ToolBar
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
        { id: '10', label: 'n10', class: 'c1', x: 435, y: 69 },
        { id: '11', label: 'n11', class: 'c1', x: 23, y: 10 },
        { id: '12', label: 'n12', class: 'c1', x: -129, y: 39 },
        { id: '13', label: 'n13', class: 'c2', x: 234, y: 843 },
        { id: '14', label: 'n14', class: 'c2', x: -301, y: 129 },
        { id: '15', label: 'n15', class: 'c2', x: -20, y: -76 },
        { id: '16', label: 'n16', class: 'c2', x: 1220, y: -34 },
        { id: '17', label: 'n17', class: 'c2', x: -10, y: 954 },
        { id: '18', label: 'n18', class: 'c2', x: 492, y: 123 },
        {
          id: '1',
          x: 10,
          y: 10,
          anchorPoints: [
            [0, 0.5, { type: 'circle', style: { stroke: 'red', fill: 'white' } }],
            [1, 0.5, { type: 'rect', style: { stroke: 'blue', fill: 'white' } }]
          ]
        },
        { id: '19', label: 'server', class: 'c2', size: 30, type: 'image', img: require('../assets/images/icon/云存储_cloud-storage.svg') }

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
        { source: '0', target: '10', label: 'e0-10', weight: 1.5 },
        { source: '0', target: '11', label: 'e0-11', weight: 1 },
        { source: '0', target: '13', label: 'e0-13', weight: 10 },
        { source: '0', target: '14', label: 'e0-14', weight: 2 },
        { source: '0', target: '15', label: 'e0-15', weight: 0.5 },
        { source: '0', target: '16', label: 'e0-16', weight: 0.8 },
        { source: '2', target: '3', label: 'e2-3', weight: 1 },
        { source: '4', target: '5', label: 'e4-5', weight: 1.4 },
        { source: '4', target: '6', label: 'e4-6', weight: 2.1 },
        { source: '5', target: '6', label: 'e5-6', weight: 1.9 },
        { source: '7', target: '13', label: 'e7-13', weight: 0.5 },
        { source: '8', target: '14', label: 'e8-14', weight: 0.8 },
        { source: '9', target: '10', label: 'e9-10', weight: 0.2 }
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
      // getContent: () => {
      //   const _toolbar = this.$refs.toolbar.$el
      //   return _toolbar
      // }
      // handleClick: (code, graph) => {
      //   if (code === 'add') {
      //     graph.addItem('node', {
      //       id: 'node2',
      //       label: 'node2',
      //       x: 300,
      //       y: 150
      //     })
      //   } else if (code === 'undo') {
      //     console.log('undo')
      //     toolbar.undo()
      //   }
      // }
    })
    const dragpanel = new DragPanelPlugin()
    const grid = new G6.Grid()
    const width = document.getElementById('canvas').scrollWidth
    const height = document.getElementById('canvas').scrollHeight || 500
    this.graph = new G6.Graph({
      container: 'canvas', // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
      width: width, // Number，必须，图的宽度
      height: height,
      // layout: {
      //   // Object，可选，布局的方法及其配置项，默认为 random 布局。
      //   type: 'random', // 指定为力导向布局
      //   preventOverlap: true, // 防止节点重叠
      //   nodeSize: 50 // 节点大小，用于算法中防止节点重叠时的碰撞检测。由于已经在上一节的元素配置中设置了每个节点的 size 属性，则不需要在此设置 nodeSize。
      // },
      defaultNode: {
        type: 'image',
        label: 'AntV Team',
        size: 40,
        img: require('../../public/images/icon/云存储_cloud-storage.svg'),
        // img: 'https://yyb.gtimg.com/aiplat/page/product/visionimgidy/img/demo6-16a47e5d31.jpg?max_age=31536000',
        style: {
          // stroke: 'red',
          // lineWidth: 0,
          // shadowColor: 'red',
          // shadowBlur: 20
          // opacity: 0.1
        },
        anchorPoints: [
          [0, 0.5, { type: 'circle', style: { stroke: 'red', fill: 'white' } }],
          [0.5, 0, { type: 'rect', style: { stroke: 'blue', fill: 'white' } }],
          [1, 0.5],
          [0.5, 1]
        ],
        linkPoints: {
          top: true,
          bottom: true,
          left: true,
          right: true
        // ... 四个圆的样式可以在这里指定
        }
        // 其他配置
      },
      modes: {
        default: ['drag-canvas', 'clickSelected', 'drag-node', 'drag-combo', 'collapse-expand-combo', 'dragToAddItem'],
        view: [],
        edit: ['drag-canvas', 'hoverNodeActived', 'hoverAnchorActived', 'dragNode', 'dragEdge',
          'dragPanelItemAddNode', 'clickSelected', 'deleteItem', 'itemAlign', 'dragPoint', 'brush-select']
      },
      enabledStack: true,
      maxStep: 20,
      plugins: [toolbar, grid, dragpanel]
    })

    this.graph.data(data) // 读取 Step 2 中的数据源到图上
    this.graph.render() // 渲染图
    // this.initDragEvent()
  },
  methods: {
    initDragEvent () {
      const parentNode = this.$refs.itemPanel.$el
      // const ghost = createDom('<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"' + ' style="opacity:0"/>')
      const ghost = new Image()
      ghost.src = require('../assets/images/icon/云存储_cloud-storage.svg')
      const children = parentNode.querySelectorAll('.panelContent > .item > img')
      children.forEach(child => {
        child.addEventListener('dragstart', e => {
          e.dataTransfer.setDragImage(ghost, 0, 0)
        })
      })
    }
  }
}

</script>
