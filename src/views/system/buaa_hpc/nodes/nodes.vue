<template>
  <d2-container>
    <a-table
      :columns="columns"
      :pagination="false"
      size="middle"
      :data-source="data"
      :loading="loading"
      @change="handleTableChange"
    >
    </a-table>
  </d2-container>
</template>

<script>
import { request } from '@/api/service'

const columns = [
  {
    title: 'node name',
    dataIndex: 'node_name',
    sorter: (a, b) => a.node_name.charCodeAt(0) - b.node_name.charCodeAt(0),
    width: '5%',
    align: 'center',
    slots: { customRender: 'job_name' }
  },
  {
    title: 'state',
    dataIndex: 'node_state',
    width: '5%',
    align: 'center',
    sorter: (a, b) => a.node_state.charCodeAt(0) - b.node_state.charCodeAt(0)
  },
  {
    title: 'all core',
    dataIndex: 'all_core',
    width: '5%',
    align: 'center',
    sorter: (a, b) => a.all_core - b.all_core
  },
  {
    title: 'used core',
    dataIndex: 'used_core',
    width: '5%',
    align: 'center',
    sorter: (a, b) => a.used_core - b.used_core
  },
  {
    title: 'free core',
    dataIndex: 'free_core',
    width: '5%',
    align: 'center',
    sorter: (a, b) => a.free_core - b.free_core
  },
  {
    title: 'cpu load',
    dataIndex: 'cpu_load',
    width: '5%',
    align: 'center',
    sorter: (a, b) => a.cpu_load - b.cpu_load
  },
  {
    title: 'memory',
    dataIndex: 'memory',
    width: '5%',
    align: 'center',
    sorter: (a, b) => a.memory - b.memory
  },
  {
    title: 'free memory',
    dataIndex: 'free_memory',
    width: '5%',
    align: 'center',
    sorter: (a, b) => a.free_memory - b.free_memory
  }
]

export default {
  name: 'job_list',
  data () {
    return {
      data: [],
      pagination: {},
      loading: false,
      columns
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    handleTableChange (filters, sorter) {
      // this.fetch({  })
    },
    fetch (params = {}) {
      this.loading = true
      request({
        url: 'node_list',
        method: 'get',
        type: 'json'
      }).then(data => {
        this.loading = false
        this.data = data
      })
    }
  }
}
</script>

<style scoped>

</style>
