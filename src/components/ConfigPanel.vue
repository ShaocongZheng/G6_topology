<style lang="scss" scoped>
$form-font-size: 8px;
.rightPanel {
  flex-grow: 1;
  flex-shrink: 0.8;
  flex-basis: 200px;
  min-width: 200px;
  position: relative;
  padding: 0 5px;
  z-index: 998;
  box-shadow: 0 2px 2px 2px rgb(0 0 0 / 10%);

  ::v-deep {
    .el-tabs__item {
      font-size: 12px;

    }

    .el-collapse-item__header {
      font-size: 10px;
      border: 0;
    }

    .el-collapse {
      border: 0;
    }
    .el-collapse-item__wrap {
        border: 0;
    }
    .el-form-item__label {
        font-size: $form-font-size;
    }
    .el-form-item__content {
        font-size: $form-font-size;
    }
  }
}
</style>
<template>
  <div class="rightPanel">
    <el-tabs value="1">
      <el-tab-pane label="配置" name="1">
        <el-collapse value="1">
            <!-- <el-collapse-item title="样式">

            </el-collapse-item> -->
            <el-collapse-item title="数据" name="1">
                <el-form size="mini" label-position="left" label-width="80px" v-if="selectedNode">
                    <el-form-item label="Sproject">
                        <label>Sproject</label>
                    </el-form-item>
                    <el-form-item label="环境">
                        <label>外围系统</label>
                    </el-form-item>
                    <el-form-item label="部署图名称">
                        <label>部署图名称</label>
                    </el-form-item>
                    <el-form-item label="模块名称">
                        <el-input v-model='selectedNode.label' @change="modelChange"></el-input>
                    </el-form-item>
                    <el-form-item label="英文名称">
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item label="ip">
                        <el-input ></el-input>
                    </el-form-item>
                </el-form>
            </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <!-- <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane> -->
    </el-tabs>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  computed: {
    graph () {
      return this.$store.state.graph.graph
    },
    selectedNode () {
      if (this.$store.state.graph.selectedItems.nodes.length === 1) {
        return this.$store.state.graph.selectedItems.nodes[0].getModel()
      }
      return null
    }
  },
  created () {},
  mounted () {
    console.log(this.selectedNode)
  },
  methods: {
    modelChange () {
      this.$store.state.graph.selectedItems.nodes[0].update(this.selectedNode)
    }
  }
}
</script>
