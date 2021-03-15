<style lang="scss" scoped>
$item-length: 60px;

.itemPanel {
  width: 30%;
  // border: 1px solid #dcdee2;
  .panelContent {
    border-top: 1px solid #dcdee2;
  }
  .item {
    display: inline-block;
    padding: 5px;
    margin: 5px;
    border-radius: 10%;
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
    <el-collapse >
      <el-collapse-item title="图标" name="1">
          <div class="panelContent">
            <div class="item"  v-for="(item, index) in itemList" :key="index + item.name" >
              <img :src="item.url"/>
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
        {
          name: 'server',
          url: require('../assets/images/clipart/Server_Tower_128x128.png')
        },
        {
          name: 'pc',
          url: require('../assets/images/clipart/Laptop_128x128.png')
        },
        {
          name: 'pc',
          url: require('../assets/images/clipart/Laptop_128x128.png')
        },
        {
          name: 'pc',
          url: require('../assets/images/clipart/Laptop_128x128.png')
        }
      ]
    }
  }
}
</script>
