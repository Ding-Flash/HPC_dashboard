<template>
<!--  <d2-container type="card" class="page">-->
<!--    <template slot="header">使用率情况统计</template>-->
  <a-row>
    <a-col>
      <a-layout>
        <a-layout-header class="header">
          <p>使用率情况统计</p>
        </a-layout-header>
        <a-layout-content class="content">
          <el-row :gutter="24">
            <el-col :span="4">
              <el-card shadow="never" class="d2-card">
                <p slot="title">回调函数</p>
                <p slot="header" class="subheader">集群总体核心使用率:</p>
                <div class="group">
                  <d2-count-up :end="clusterCorePer" :callback="() => {className = 'end'}" :class="className"/>
                  <div class="percentage">%</div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card shadow="never" class="d2-card">
                <p slot="title">回调函数</p>
                <p slot="header" class="subheader">集群总体节点使用率:</p>
                <div class="group">
                  <d2-count-up :end="clusterNodePer" :callback="() => {className = 'end'}" :class="className"/>
                  <div class="percentage">%</div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card shadow="never" class="d2-card">
                <p slot="title">回调函数</p>
                <p slot="header" class="subheader">CPU核心使用率:</p>
                <div class="group">
                  <d2-count-up :end="cpuCorePer" :callback="() => {className = 'end'}" :class="className"/>
                  <div class="percentage">%</div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card shadow="never" class="d2-card">
                <p slot="title">回调函数</p>
                <p slot="header" class="subheader">CUP节点使用率:</p>
                <div class="group">
                  <d2-count-up :end="cpuNodePer" :callback="() => {className = 'end'}" :class="className"/>
                  <div class="percentage">%</div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card shadow="never" class="d2-card">
                <p slot="title">回调函数</p>
                <p slot="header" class="subheader">GPU核心使用率:</p>
                <div class="group">
                  <d2-count-up :end="gpuCorePer" :callback="() => {className = 'end'}" :class="className"/>
                  <div class="percentage">%</div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="4">
              <el-card shadow="never" class="d2-card">
                <p slot="title">回调函数</p>
                <p slot="header" class="subheader">GPU节点使用率:</p>
                <div class="group">
                  <d2-count-up :end="gpuNodePer" :callback="() => {className = 'end'}" :class="className"/>
                  <div class="percentage">%</div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </a-layout-content>
      </a-layout>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: 'PercentageDisplay',
  data () {
    return {
      // 回调函数使用
      className: '',
      // 更新数值用
      end: 50
    }
  },
  methods: {
    update () {
      setTimeout(() => {
        this.end = 100
      }, 1000)
    }
  },
  props: {
    clusterData: {
      type: Object,
      default () {
        return {}
      }
    },
    cpuData: {
      type: Object,
      default () {
        return {}
      }
    },
    gpuData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    clusterCorePer: function () {
      return Math.round(this.clusterData.rows[2].core / this.clusterData.total.one * 100)
    },
    clusterNodePer: function () {
      return Math.round(this.clusterData.rows[2].node / this.clusterData.total.two * 100)
    },
    cpuCorePer: function () {
      return Math.round(this.cpuData.rows[2].core / this.cpuData.total.one * 100)
    },
    cpuNodePer: function () {
      return Math.round(this.cpuData.rows[2].node / this.cpuData.total.two * 100)
    },
    gpuCorePer: function () {
      return Math.round(this.gpuData.rows[2].core / this.gpuData.total.one * 100)
    },
    gpuNodePer: function () {
      return Math.round(this.gpuData.rows[2].node / this.gpuData.total.two * 100)
    }
  }
}
</script>

<style lang="scss" scoped>
.group {
    display: flex;
    justify-content: center;
    align-items: center;
  span {
    font-size: 40px;
    &.end {
       padding: 0px 10px;
       border-radius: 4px;
       background-color: $color-success;
       color: #FFF;
    }
  }
}
.percentage {
  font-size: 40px;
  align-self: center;
  color: #999988;
}

.header{
  display: flex;
  background-color: #fff;
  p{
    font-size: 24px;
    margin: auto;
    display: block;
  }
}
.content {
  background-color: #fff;
  border-bottom: #e2e2e2 solid 2px;
  padding-bottom: 20px;
  .subheader {
    font-size: 18px;
    color: #595959;
  }
}
</style>
