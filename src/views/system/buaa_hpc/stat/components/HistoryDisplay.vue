<template>
  <a-layout class="block">
    <a-layout-header class="block header">
      <p>集群节点及核心使用历史</p>
    </a-layout-header>
    <a-layout-content>
      <div class="date-search">
        <div class="date-picker">
          <a-range-picker
            :ranges="{ '近两天': [moment().subtract(2,'days'), moment()],
            '近一周': [moment().subtract(7,'days'), moment()],
            '近一月': [moment().subtract(1,'months'), moment()],
            '近两月': [moment().subtract(2,'months'), moment()],
            '近六月': [moment().subtract(6,'months'), moment()],
            '近一年': [moment().subtract(1,'years'), moment()],
          }"
            @change="onChange"
            :locale="locale"/>
        </div>
        <a-button type="primary" icon="search" class="searchBtn" @click="searchHistory">
          查询
        </a-button>
      </div>

      <a-row class="bottom">
        <a-col :span="8">
          <ve-line :data="historyData" :settings="clusterSettings" :extend="extend" :loading="loading"></ve-line>
        </a-col>
        <a-col :span="8">
          <ve-line :data="historyData" :settings="cpuSettings" :extend="extend" :loading="loading"></ve-line>
        </a-col>
        <a-col :span="8">
          <ve-line :data="historyData" :settings="gpuSettings" :extend="extend" :loading="loading"></ve-line>
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>

</template>

<script>
import { request } from '@/api/service'
import moment from 'moment'
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN'

moment.locale('zh-cn')
export default {
  name: 'HistoryDisplay',
  created () {
    this.fetch({})
  },
  data () {
    this.extend = {
      yAxis (item) {
        Object.assign(item[0], {
          max: 1
        })
        return item
      },
      xAxis: {
        axisLabel: {
          margin: 20,
          rotate: 45
        }
      }
    }
    this.clusterSettings = {
      metrics: ['all_running_core_pec', 'all_running_node_pec'],
      dimesion: ['time'],
      yAxisType: ['percent'],
      xAxisType: 'time',
      labelMap: {
        all_running_core_pec: '核心总体使用率',
        all_running_node_pec: '节点总体使用率'
      },
      yAxismax: 1
    }
    this.cpuSettings = {
      metrics: ['cpu_running_core_pec', 'cpu_running_node_pec'],
      dimesion: ['time'],
      yAxisType: ['percent'],
      xAxisType: 'time',
      labelMap: {
        cpu_running_core_pec: 'CPU核心使用率',
        cpu_running_node_pec: 'CPU节点使用率'
      }
    }
    this.gpuSettings = {
      metrics: ['gpu_running_core_pec', 'gpu_running_node_pec'],
      dimesion: ['time'],
      yAxisType: ['percent'],
      xAxisType: 'time',
      labelMap: {
        gpu_running_core_pec: 'GPU核心使用率',
        gpu_running_node_pec: 'GPU节点使用率'
      }
    }
    return {
      historyData: {
        columns: [
          'time',
          'all_running_core_pec', 'all_running_node_pec',
          'cpu_running_core_pec', 'cpu_running_node_pec',
          'gpu_running_core_pec', 'gpu_running_node_pec'
        ],
        rows: []
      },
      locale,
      dateFormat: 'YYYY-MM-DD',
      dateFrom: '',
      dateTo: '',
      loading: false
    }
  },
  methods: {
    moment,
    searchHistory () {
      this.fetch({ from: this.dateFrom, to: this.dateTo })
    },
    onChange (dates, dateStrings) {
      // console.log('From: ', dateStrings[0], ', to: ', dateStrings[1])
      this.dateFrom = dateStrings[0]
      this.dateTo = dateStrings[1]
    },
    fetch (params) {
      this.loading = true
      request({
        url: 'node_data',
        method: 'get',
        type: 'json',
        params: {
          from: typeof (params.from) === 'undefined' ? moment().subtract(7, 'days').format(this.dateFormat).toString() : params.from,
          to: typeof (params.to) === 'undefined' ? moment().format(this.dateFormat).toString() : params.to
        }
      }).then(res => {
        this.historyData.rows = res.info
        this.loading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.block {
  background-color: #fff;
  border-top: #e2e2e2 solid 1px;
}

.header {

  p {
    text-align: center;
    font-size: 24px;
  }
}

.date-search {
  margin: 20px;
  margin-left: 50px;
  display: flex;

  .date-picker {
    margin-right: 10px;
  }

  .searchBtn {

  }
}
</style>
