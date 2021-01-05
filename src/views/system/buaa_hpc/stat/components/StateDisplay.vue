<template>
  <a-row class="top">
    <a-col :span="8" class="left">
      <a-layout class="block">
        <a-layout-header class="block header">
          <p>{{ total_title }}</p>
        </a-layout-header>
        <a-layout-content>
          <ve-bar :data="clusterData"
                  :settings="chartSettings"
                  :judge-width="true"
                  :loading="loading"/>
        </a-layout-content>
        <a-layout-footer class="block footer">
          <div><p>{{ stat_one_title }}: {{ this.clusterData.total.one }}</p></div>
          <div><p>{{ stat_two_title }}: {{ this.clusterData.total.two }}</p></div>
        </a-layout-footer>
      </a-layout>
    </a-col>
    <a-col :span="8" class="top-mid">
      <a-layout class="block">
        <a-layout-header class="block header">
          <p>{{ cpu_title }}</p>
        </a-layout-header>
        <a-layout-content>
          <ve-bar :data="cpuData"
                  :settings="chartSettings"
                  :loading="loading"/>
        </a-layout-content>
        <a-layout-footer class="block footer">
          <div>
            <p>{{ stat_one_title }}: {{ this.cpuData.total.one }}</p>
          </div>
          <div>
            <p>{{ stat_two_title }}: {{ this.cpuData.total.two }}</p>
          </div>
        </a-layout-footer>
      </a-layout>
    </a-col>
    <a-col :span="8" class="right">
      <a-layout class="block">
        <a-layout-header class="block header">
          <p>{{ gpu_title }}</p>
        </a-layout-header>
        <a-layout-content>
          <ve-bar :data="gpuData"
                  :settings="chartSettings"
                  :loading="loading"/>
        </a-layout-content>
        <a-layout-footer class="block footer">
          <div>
            <p>{{ stat_one_title }}: {{ this.gpuData.total.one }}</p>
          </div>
          <div>
            <p>{{ stat_two_title }}: {{ this.gpuData.total.two }}</p>
          </div>
        </a-layout-footer>
      </a-layout>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: 'StateDisplay',
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
    },
    total_title: String,
    cpu_title: String,
    gpu_title: String,
    stat_one_title: String,
    stat_two_title: String,
    max_x: Number,
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    this.chartSettings = {
      label: {
        show: true,
        position: 'right'
      },
      max: [this.max_x]
    }
    return {}
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.block {
  background-color: #fff;
}

.header {
  p {
    text-align: center;
    font-size: 24px;
  }

}

.footer {
  display: flex;
  justify-content: space-between;
  padding-top: 0;

  div {
    flex: 1;
    justify-items: center;

    p {
      margin: auto;
      text-align: center;
      font-size: 18px;
    }
  }

  .corePercentage {
    color: #18c9a5;
    text-align: center;

  }

  .nodePercentage {
    color: #56a7e3;
    text-align: center;

  }
}
</style>
