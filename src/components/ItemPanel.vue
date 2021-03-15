<style lang="scss" scoped>
$item-length: 60px;

.itemPanel {
  width: 30%;
  border: 1px solid #dcdee2;

  .item {
    display: inline-block;
    padding: 5px;
    margin: 5px;
    border-radius: 10%;
    cursor: pointer;
    img {
      height: $item-length;
      width: $item-length;

    }
    &:hover {
        background-color: skyblue;
      }
  }
}
</style>
<template>
  <div class="itemPanel">
    <Collapse simple>
      <Panel name="1">
          图标
          <div slot="content">
            <div class="item"  v-for="(item, index) in itemList" :key="index + item.name" >
              <img :src="item.url"/>
            </div>
          </div>
      </Panel>
      <Panel name="2">
          斯蒂夫·盖瑞·沃兹尼亚克
          <p slot="content">斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。</p>
      </Panel>
      <Panel name="3">
          乔纳森·伊夫
          <p slot="content">乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。</p>
      </Panel>
    </Collapse>
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
