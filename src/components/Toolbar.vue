<style lang="scss" scoped>
$toolbar-height: 40px;
.toolbar {
  flex-basis: $toolbar-height;
  position: relative;
  box-shadow: 0 0 2px 2px rgb(0 0 0 / 10%);
  z-index: 999;
  height: $toolbar-height;
  ul {
    list-style-type: none;
    // padding: 6px;
    // left: 0px;
    // top: 0px;
    line-height: $toolbar-height;
    // background-color: rgba(255, 255, 255, 0.9);
    // border: 1px solid #e2e2e2;
    border-radius: 4px;
    font-size: 12px;
    color: #545454;
    // margin: 0;
    text-align: center;
    display: inline-block;

    li {
      float: left;
      text-align: center;
      width: 35px;
      height: 40px;
      cursor: pointer;
      list-style-type: none;
      list-style: none;
      margin-left: 0px;

      .iconfont {
        font-size: 20px;
        // opacity: .8;
        // line-height: 24px;
      }
      .iconfont:hover {
          // opacity: 1;
        }
    }
  }
}
</style>
<template>
  <div class="toolbar">
    <!-- <el-button-group>
        <el-button  code="undo" icon="el-icon-back"></el-button>
        <el-button code="redo" icon="el-icon-right"></el-button>
        <el-button  code="delete" icon="el-icon-delete"></el-button>
        </el-button-group> -->
    <ul id="toolbarList">
      <li v-for="(item, index) in toolList" :key="index" :code="item.code">
        <span :class="'iconfont ' + item.icon" style="line-height:40px"></span>
      </li>
      <li code="exportImg">
        <el-button plain size="small">导出图片</el-button>
      </li>
      <li>
        <el-button plain size="small">部署方案</el-button>
      </li>
    </ul>
  </div>
</template>
<script>
// import ToolBar from '../g6/plugins/toolbar.js'
export default {
  props: {
    graph: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      toolList: [
        {
          icon: 'icon-copy',
          code: 'copy'
        },
        {
          icon: 'icon-undo',
          code: 'undo'
        },
        {
          icon: 'icon-redo',
          code: 'redo'
        },
        {
          icon: 'icon-ZoomOut',
          code: 'zoomOut'
        },
        {
          icon: 'icon-ZoomIn',
          code: 'zoomIn'
        },
        {
          icon: 'icon-bringtotop',
          code: 'to-top'
        },
        {
          icon: 'icon-bringtobottom',
          code: 'to-bottom'
        },
        {
          icon: 'icon-bringtotop',
          code: 'realZoom'
        },
        {
          icon: 'icon-Exitfullscreen',
          code: 'autoZoom'
        },
        {
          icon: 'icon-trash',
          code: 'delete'
        }
      ],
      toolbar: null
    }
  },
  mounted () {
    this.initShortCuts()
  },
  methods: {
    // handleToolbarClick (code) {
    //   console.log(code)
    //   switch (code) {
    //     case 'undo':
    //       ToolBar.undo(this.graph)
    //       break
    //     case 'redo':
    //       ToolBar.redo(this.graph)
    //       break
    //     case 'delete':
    //       this.graph.clear()
    //       break
    //     default:
    //       console.log('default end')
    //   }
    // }
    initShortCuts () {
      document.onkeydown = function (e) {
        console.log(e)
        if (e.ctrlKey && e.key === 's') {
          console.log('aa')
        }
      }
    }
  }
}
</script>
