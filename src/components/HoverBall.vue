<style scoped>
.hover-ball {
    height: 45px;
    width: 45px;
    background-color:#53A8FF;
    border-radius: 50%;
    position: fixed;
    font-size: 30px;
    cursor: pointer;
    z-index: 999;
}
.el-icon-message {
    border-radius: 50%;
    color: #E9E9EB;
}
.hover-ball ::v-deep .el-badge__content.is-dot {
    height: 10px;
    width: 10px;
}
</style>
<template>
    <div class="hover-ball" :style="position" ref="hoverBall" draggable="false"
    @mousedown="onMouseDown" >
        <el-badge is-dot :hidden="hidden">
            <i class="el-icon-message"></i>
        </el-badge>
    </div>
</template>
<script>
export default {
  props: {
    // 通过position来设置初始定位
    position: {
      type: Object,
      default: function () {
        return {
          bottom: '30px',
          right: '30px'
        }
      }
    },
    // 通过fixed来禁用自由移动
    fixed: {
      type: Boolean,
      default: false
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      moving: false,
      positionTemp: {
        x: 0,
        y: 0
      },
      x: '',
      y: '',
      dx: '',
      dy: ''
    }
  },
  mounted () {
    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.onMouseUp)
  },
  methods: {
    onMouseDown (e) {
      this.moving = true
      // 记录初始元素位置
      this.positionTemp.x = this.$refs.hoverBall.offsetLeft
      this.positionTemp.y = this.$refs.hoverBall.offsetTop
      this.x = e.clientX
      this.y = e.clientY
    },
    onMouseUp (e) {
      this.moving = false
    },
    onMouseMove (e) {
      if (this.moving) {
        this.dx = e.clientX - this.x
        this.dy = e.clientY - this.y
        // this.x = e.clientX
        // this.y = e.clientY
        console.log(this.dx, this.dy)
        console.log(this.$refs)
        this.$refs.hoverBall.style.left = (this.positionTemp.x + this.dx) + 'px'
        this.$refs.hoverBall.style.top = (this.positionTemp.y + this.dy) + 'px'
        // this.position = {
        //   top: clientY,
        //   left: clientX
        // }
        e.preventDefault()
      }
    }
  }
}
</script>
