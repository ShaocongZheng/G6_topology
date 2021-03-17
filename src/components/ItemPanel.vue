<style lang="scss">
$item-length: 60px;

.itemPanel {
  flex: 1 30px;
  // border: 1px solid #dcdee2;
  .panelContent {
    border-top: 1px solid #dcdee2;
    text-align: left;
  }
  .el-collapse .el-collapse-item {
    > div[role=tab] > div {
      padding-left: 10px;
      // border: 1px solid #e9e9e9;
      border-left: 0;
    }
  }
  .item {
    display: inline-block;
    padding: 5px;
    margin: 5px;
    border-radius: 5%;
    border: 1px solid transparent;
    cursor: move;
    img {
      height: $item-length;
      width: $item-length;
    }
    &:hover {
      // background-color: skyblue;
      border: 1px solid #dcdee2;
    }
  }
}
</style>
<template>
  <div class="itemPanel">
    <el-collapse>
      <el-collapse-item title="图标" name="1">
        <div class="panelContent">
          <div
            class="item"
            v-for="(item, index) in itemList"
            :key="index + item.name"
          >
            <img :src="item.url" />
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  data () {
    return {
      itemList: [
        // {
        //   name: 'server',
        //   url: require('../assets/images/icon/服务器_server.svg')
        // },
        {
          name: 'pc',
          url: require('../assets/images/icon/储存器_memory-one.svg')
        },
        {
          name: 'pc',
          url: require('../assets/images/icon/数据服务器_data-server.svg')
        },
        {
          name: 'pc',
          url: require('../assets/images/icon/云存储_cloud-storage.svg')
        },
        {
          name: 'pc',
          url: require('../assets/images/icon/储存器_memory-one.svg')
        },
        {
          name: 'pc',
          url: require('../assets/images/icon/数据服务器_data-server.svg')
        },
        {
          name: 'pc',
          url: require('../assets/images/icon/云存储_cloud-storage.svg')
        },
        {
          name: 'pc',
          url: require('../assets/images/icon/储存器_memory-one.svg')
        },
        {
          name: 'pc',
          url: require('../assets/images/icon/数据服务器_data-server.svg')
        }

      ]
    }
  }
}
</script>
