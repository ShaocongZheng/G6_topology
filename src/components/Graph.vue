<template>
  <div>
      <item-panel></item-panel>
      <div id="canvas" ref="canvas" class="canvasPanel"></div>
  </div>
</template>
<script>
import G6 from '@antv/g6'
import ItemPanel from './ItemPanel'
export default {
  components: {
    ItemPanel: ItemPanel
  },
  data () {
    return {}
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
        { id: '19', label: 'n19', class: 'c2', x: 123, y: -241 }
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
        { source: '9', target: '10', label: 'e9-10', weight: 0.2 },
        { source: '10', target: '14', label: 'e10-14', weight: 1 },
        { source: '10', target: '12', label: 'e10-12', weight: 1.2 },
        { source: '11', target: '14', label: 'e11-14', weight: 1.2 },
        { source: '12', target: '13', label: 'e12-13', weight: 2.1 },
        { source: '16', target: '17', label: 'e16-17', weight: 2.5 },
        { source: '16', target: '18', label: 'e16-18', weight: 3 },
        { source: '17', target: '18', label: 'e17-18', weight: 2.6 },
        { source: '18', target: '19', label: 'e18-19', weight: 1.6 }
      ]
    }
    const graph = new G6.Graph({
      container: 'canvas', // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
      width: 800, // Number，必须，图的宽度
      height: 500,
      layout: {
        // Object，可选，布局的方法及其配置项，默认为 random 布局。
        type: 'force', // 指定为力导向布局
        preventOverlap: true, // 防止节点重叠
        nodeSize: 50 // 节点大小，用于算法中防止节点重叠时的碰撞检测。由于已经在上一节的元素配置中设置了每个节点的 size 属性，则不需要在此设置 nodeSize。
      },
      modes: {
        default: ['drag-canvas', 'clickSelected', 'drag-node', 'zoom-canvas'],
        view: [],
        edit: ['drag-canvas', 'hoverNodeActived', 'hoverAnchorActived', 'dragNode', 'dragEdge',
          'dragPanelItemAddNode', 'clickSelected', 'deleteItem', 'itemAlign', 'dragPoint', 'brush-select']
      }
    })
    const treeData = {
      id: '1',
      children: [
        {
          id: '2',
          children: [{ id: '3' }, { id: '4' }]
        },
        {
          id: '5',
          children: [
            { id: '6' },
            {
              id: '7',
              children: [{ id: '8' }, { id: '9' }]
            }
          ]
        },
        {
          id: '10',
          children: [{ id: '11' }]
        }
      ]
    }

    G6.Util.traverseTree(treeData, (subTree) => {
      subTree.color = '#f00'
      return true
    })
    graph.data(data) // 读取 Step 2 中的数据源到图上
    graph.render() // 渲染图
  }
}
</script>
