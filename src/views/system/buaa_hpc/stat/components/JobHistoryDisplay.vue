<template>
  <a-layout class="block">
    <a-layout-header class="block header">
      <p>用户及作业在线数量历史</p>
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
  name: 'JobHistoryDisplay',
  created () {
    this.fetch({})
  },
  data () {
    this.extend = {
      xAxis: {
        axisLabel: {
          margin: 20,
          rotate: 45
        }
      }
    }
    this.clusterSettings = {
      metrics: ['all_total_job', 'all_total_user'],
      dimesion: ['time'],
      xAxisType: 'time',
      labelMap: {
        all_total_job: '集群作业总数',
        all_total_user: '集群用户总数'
      }
    }
    this.cpuSettings = {
      metrics: ['cpu_total_job', 'cpu_total_user'],
      dimesion: ['time'],
      xAxisType: 'time',
      labelMap: {
        cpu_total_job: 'CPU集群作业总数',
        cpu_total_user: 'CPU集群用户总数'
      }
    }
    this.gpuSettings = {
      metrics: ['gpu_total_job', 'gpu_total_user'],
      dimesion: ['time'],
      xAxisType: 'time',
      labelMap: {
        gpu_total_job: 'GPU集群作业总数',
        gpu_total_user: 'GPU集群用户总数'
      }
    }
    return {
      historyData: {
        columns: [
          'time',
          'all_total_job', //'all_running_job', 'all_waiting_job',
          'all_total_user', //'all_running_user', 'all_waiting_user',

          'cpu_total_job', //'cpu_running_job', 'cpu_waiting_job',
          'cpu_total_user', //'cpu_running_user', 'cpu_waiting_user',

          'gpu_total_job', //'gpu_running_job', 'gpu_waiting_job',
          'gpu_total_user'// 'gpu_running_user', 'gpu_waiting_user'
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
        url: 'queue_data',
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
