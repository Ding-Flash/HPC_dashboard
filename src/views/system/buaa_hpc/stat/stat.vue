<template>
  <d2-container>
    <StateDisplay :clusterData="clusterData"
                  :cpu-data="cpuData"
                  :gpu-data="gpuData"
                  :total_title="'集群总体状态'"
                  :cpu_title="'CPU集群状态'"
                  :gpu_title="'GPU集群状态'"
                  :stat_one_title="'核心总计'"
                  :stat_two_title="'节点总计'"
                  :max_x="11000"
                  :loading="loading"/>
    <StateDisplay :clusterData="clusterQueueData"
                  :cpu-data="cpuQueueData"
                  :gpu-data="gpuQueueData"
                  :total_title="'集群所有任务状态'"
                  :cpu_title="'CPU集群任务状态'"
                  :gpu_title="'GPU集群任务状态'"
                  :stat_one_title="'任务总计'"
                  :stat_two_title="'用户总计'"
                  :max_x="400"
                  :loading="loading"/>
    <HistoryDisplay/>
    <JobHistoryDisplay/>
  </d2-container>
</template>

<script>
import { request } from '@/api/service'
import StateDisplay from '@/views/system/buaa_hpc/stat/components/StateDisplay'
import HistoryDisplay from '@/views/system/buaa_hpc/stat/components/HistoryDisplay'
import JobHistoryDisplay from '@/views/system/buaa_hpc/stat/components/JobHistoryDisplay'

export default {
  name: 'buaa_hpc_stat',
  data () {
    return {
      loading: false,
      clusterData: {
        columns: ['state', 'core', 'node'],
        rows: [
          { state: '不可用', core: 0, node: 0 },
          { state: '空闲', core: 0, node: 0 },
          { state: '运行中', core: 0, node: 0 }
        ],
        total: {
          one: 0,
          two: 0
        }
      },
      cpuData: {
        columns: ['state', 'core', 'node'],
        rows: [
          { state: '不可用', core: 0, node: 0 },
          { state: '空闲', core: 0, node: 0 },
          { state: '运行中', core: 0, node: 0 }
        ],
        total: {
          one: 0,
          two: 0
        }
      },
      gpuData: {
        columns: ['state', 'core', 'node'],
        rows: [
          { state: '不可用', core: 0, node: 0 },
          { state: '空闲', core: 0, node: 0 },
          { state: '运行中', core: 0, node: 0 }
        ],
        total: {
          one: 0,
          two: 0
        }
      },
      clusterQueueData: {
        columns: ['state', 'job', 'user'],
        rows: [
          { state: '等待中', job: 0, user: 0 },
          { state: '运行中', job: 0, user: 0 }
        ],
        total: {
          one: 0,
          two: 0
        }
      },
      cpuQueueData: {
        columns: ['state', 'job', 'user'],
        rows: [
          { state: '等待中', job: 0, user: 0 },
          { state: '运行中', job: 0, user: 0 }
        ],
        total: {
          one: 0,
          two: 0
        }
      },
      gpuQueueData: {
        columns: ['state', 'job', 'user'],
        rows: [
          { state: '等待中', job: 0, user: 0 },
          { state: '运行中', job: 0, user: 0 }
        ],
        total: {
          one: 0,
          two: 0
        }
      }
    }
  },
  created () {
    this.fetch()
  },
  components: {
    StateDisplay,
    HistoryDisplay,
    JobHistoryDisplay
  },
  methods: {
    fetch () {
      this.loading = true
      request({
        url: 'all',
        method: 'get',
        type: 'json'
      }).then(res => {
        this.update_cluster_data(res)
        this.update_cpu_data(res)
        this.update_gpu_data(res)

        this.update_cluster_job_data(res)
        this.update_cpu_job_data(res)
        this.update_gpu_job_data(res)
        this.loading = false
      })
    },
    update_cluster_job_data (data) {
      this.clusterQueueData.rows[0].job = data.entire.job.waiting
      this.clusterQueueData.rows[1].job = data.entire.job.running
      this.clusterQueueData.total.one = data.entire.job.total

      this.clusterQueueData.rows[0].user = data.entire.user.waiting
      this.clusterQueueData.rows[1].user = data.entire.user.running
      this.clusterQueueData.total.two = data.entire.user.total
    },
    update_cpu_job_data (data) {
      this.cpuQueueData.rows[0].job = data.queue.cpu.job.waiting
      this.cpuQueueData.rows[1].job = data.queue.cpu.job.running
      this.cpuQueueData.total.one = data.queue.cpu.job.total

      this.cpuQueueData.rows[0].user = data.queue.cpu.user.waiting
      this.cpuQueueData.rows[1].user = data.queue.cpu.user.running
      this.cpuQueueData.total.two = data.queue.cpu.user.total
    },
    update_gpu_job_data (data) {
      this.gpuQueueData.rows[0].job = data.queue.gpu.job.waiting
      this.gpuQueueData.rows[1].job = data.queue.gpu.job.running
      this.gpuQueueData.total.one = data.queue.gpu.job.total

      this.gpuQueueData.rows[0].user = data.queue.gpu.user.waiting
      this.gpuQueueData.rows[1].user = data.queue.gpu.user.running
      this.gpuQueueData.total.two = data.queue.gpu.user.total
    },
    update_cluster_data (data) {
      this.clusterData.rows[0].core = data.cluster.core.unavailable
      this.clusterData.rows[1].core = data.cluster.core.available
      this.clusterData.rows[2].core = data.cluster.core.running
      this.clusterData.total.one = data.cluster.core.total

      this.clusterData.rows[0].node = data.cluster.node.unavailable
      this.clusterData.rows[1].node = data.cluster.node.available
      this.clusterData.rows[2].node = data.cluster.node.running
      this.clusterData.total.two = data.cluster.node.total
    },
    update_cpu_data (data) {
      this.cpuData.rows[0].core = data.state.cpu.core.unavailable
      this.cpuData.rows[1].core = data.state.cpu.core.available
      this.cpuData.rows[2].core = data.state.cpu.core.running
      this.cpuData.total.one = data.state.cpu.core.total

      this.cpuData.rows[0].node = data.state.cpu.node.unavailable
      this.cpuData.rows[1].node = data.state.cpu.node.available
      this.cpuData.rows[2].node = data.state.cpu.node.running
      this.cpuData.total.two = data.state.cpu.node.total
    },
    update_gpu_data (data) {
      this.gpuData.rows[0].core = data.state.gpu.core.unavailable
      this.gpuData.rows[1].core = data.state.gpu.core.available
      this.gpuData.rows[2].core = data.state.gpu.core.running
      this.gpuData.total.one = data.state.gpu.core.total

      this.gpuData.rows[0].node = data.state.gpu.node.unavailable
      this.gpuData.rows[1].node = data.state.gpu.node.available
      this.gpuData.rows[2].node = data.state.gpu.node.running
      this.gpuData.total.two = data.state.gpu.node.total
    }
  }
}
</script>

<style lang="less" scoped>

</style>
