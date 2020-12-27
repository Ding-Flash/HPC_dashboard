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
    title: 'job name',
    dataIndex: 'job_name',
    sorter: (a, b) => a.job_name.charCodeAt(0) - b.job_name.charCodeAt(0),
    width: '10%',
    slots: { customRender: 'job_name' }
  },
  {
    title: 'account',
    dataIndex: 'account',
    sorter: (a, b) => a.account.charCodeAt(0) - b.account.charCodeAt(0),
    // filters: [
    //   { text: 'Male', value: 'male' },
    //   { text: 'Female', value: 'female' }
    // ],
    width: '8%'
  },
  {
    title: 'user',
    dataIndex: 'user',
    sorter: (a, b) => a.user.localeCompare(b.user),
    width: '8%'
  },
  {
    title: 'state',
    dataIndex: 'state',
    width: '5%',
    sorter: (a, b) => a.state.charCodeAt(0) - b.state.charCodeAt(0)
  },
  {
    title: 'time',
    dataIndex: 'time_string',
    width: '5%',
    align: 'center',
    sorter: (a, b) => a.time - b.time
  },
  {
    title: 'qos',
    dataIndex: 'qos',
    sorter: (a, b) => a.qos.charCodeAt(0) - b.qos.charCodeAt(0),
    width: '10%',
    align: 'center'
  },
  {
    title: 'des',
    dataIndex: 'des',
    width: '20%',
    sorter: (a, b) => a.des.charCodeAt(0) - b.des.charCodeAt(0)
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
        url: 'job_list',
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
