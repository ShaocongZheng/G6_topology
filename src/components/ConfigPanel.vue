<style lang="scss" scoped>
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
    }

    .el-collapse {
      border: 0;
    }
  }
}
</style>
<template>
  <div class="rightPanel">
    <el-tabs value='1'>
      <el-tab-pane label="配置" name="1">
        <el-collapse>
            <el-collapse-item title="样式">

            </el-collapse-item>
            <el-collapse-item title="数据">

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
  props: {

  },
  data () {
    return {

    }
  },
  created () {},
  mounted () {},
  methods: {

  }
}
</script>
