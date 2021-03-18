<style lang="scss">
$itemBox-length: 20%;
$img-length: 30px;

.itemPanel {
  flex: 1;
  min-width: 250px;
  // border: 1px solid #dcdee2;
  position: relative;
  z-index: 998;
  box-shadow: 0 2px 2px 2px rgb(0 0 0 / 10%);
  .panelContent {
    border-top: 1px solid #dcdee2;
    text-align: left;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: left;
    .itemBox {
      // display: inline-block;
      padding: 5px;
      // margin: 5px;
      border-radius: 5%;
      border: 1px solid transparent;
      cursor: move;
      flex-basis: 20%;
      img {
        width: 100%;
      }
      &:hover {
        // background-color: skyblue;
        border: 1px solid #dcdee2;
      }
    }
  }
  .el-collapse .el-collapse-item {
    > div[role='tab'] > div {
      padding-left: 10px;
      // border: 1px solid #e9e9e9;
      border-left: 0;
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
            class="itemBox"
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
