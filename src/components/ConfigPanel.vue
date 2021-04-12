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
  overflow-y: scroll;

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
    .el-form {
      padding-left: 5px;
    }
    .el-input-number--mini {
      width: 100%;
    }
  }
}
</style>
<template>
  <div class="rightPanel">
    <el-tabs value="1">
      <el-tab-pane label="配置" name="1">
        <el-collapse :value="['1']" >
          <!-- <el-collapse-item title="样式">

            </el-collapse-item> -->
            <el-switch
              v-model="seriousState"
              active-text="严重告警">
            </el-switch>
          <el-collapse-item title="数据" name="1" v-if="selectedNode.id" >
            <el-form size="mini" label-position="left" label-width="80px" >
              <el-form-item label="Sproject">
                <label>Sproject</label>
              </el-form-item>
              <el-form-item label="环境">
                <label>外围系统</label>
              </el-form-item>
              <el-form-item label="部署图名称">
                <label>部署图名称</label>
              </el-form-item>
              <el-form-item label="id">
                <el-input v-model='selectedNode.id' disabled></el-input>
              </el-form-item>
              <el-form-item label="模块名称">
                <el-input v-model='selectedNode.label' @change="modelChange"></el-input>
              </el-form-item>
              <template v-for="(value, name) in selectedModel.data" >
                <el-form-item :label="zh_CN[name]" :key="name">
                  <el-input v-model='selectedNode.data[name]'>
                    <template slot="append" v-if="unitDict[name]">{{unitDict[name]}}</template>
                  </el-input>
                </el-form-item>
              </template>
            </el-form>
          </el-collapse-item>

        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="样式" name="2">
        <el-collapse :value="['1']">
          <el-collapse-item title="样式" name="1">
            <el-form size="mini" label-position="left" label-width="80px" v-if="selectedNode">
              <el-form-item label="x">
                <el-input-number v-model="selectedNode.x" controls-position="right" @change="modelChange">
                </el-input-number>
              </el-form-item>
              <el-form-item label="y">
                <el-input-number v-model="selectedNode.y" controls-position="right" @change="modelChange">
              </el-input-number>
              </el-form-item>
              <el-form-item label="r">
                <el-input-number v-model="selectedNode.size" controls-position="right" @change="modelChange">
                   </el-input-number>
              </el-form-item>
              <el-form-item label="fill">
                <el-color-picker v-model="selectedNode.style.fill" show-alpha @change="modelChange"></el-color-picker>
              </el-form-item>
              <el-form-item label="stroke">
                <el-color-picker v-model="selectedNode.style.stroke" show-alpha @change="modelChange"></el-color-picker>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import zh_CN from '../utils/zh_CN'
export default {
  data () {
    return {
      selectedNode: {
        label: '',
        id: '',
        size: '',
        x: 0,
        y: 0,
        data: {},
        style: {
          fill: '',
          stroke: ''
        }
      },
      zh_CN: zh_CN,
      unitDict: {
        cpu: '核',
        memory: 'GB',
        hardDrive: 'GB'
      }
    }
  },
  computed: {
    graph () {
      return this.$store.state.graph.graph
    },
    selectedModel () {
      if (this.$store.state.graph.selectedItems.nodes.length === 1) {
        return this.$store.state.graph.selectedItems.nodes[0].getModel()
      }
      return null
    },
    seriousState: {
      get () {
        if (this.$store.state.graph.selectedItems.nodes.length === 1) {
          return this.$store.state.graph.selectedItems.nodes[0].hasState('serious')
        }
        return false
      },
      set (newVal) {
        this.graph.setItemState(this.$store.state.graph.selectedItems.nodes[0], 'serious', newVal)
      }
    }
  },
  watch: {
    selectedModel: {
      handler (newVal, oldVal) {
        if (newVal) {
          const {
            ...tmp
          } = newVal
          this.selectedNode = tmp
        } else {
          this.selectedNode = {
            label: '',
            id: '',
            size: '',
            x: 0,
            y: 0,
            data: {},
            style: {
              fill: '',
              stroke: ''
            }
          }
        }
      },
      deep: true
    }
  },
  created () {},
  mounted () {
  },
  methods: {
    modelChange () {
      this.graph.updateItem(this.$store.state.graph.selectedItems.nodes[0], this.selectedNode)
      // this.graph.refresh()
    }
  }
}
</script>
