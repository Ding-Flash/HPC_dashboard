import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/buaa/hpc',
  name: 'buaa_hpc',
  meta,
  redirect: { name: 'buaa_hpc_stat' },
  component: layoutHeaderAside,
  children: [
    {
      path: 'stat',
      name: 'buaa_hpc_stat',
      component: _import('system/buaa_hpc/stat/stat.vue'),
      meta: { ...meta, title: '统计信息' }
    },
    {
      path: 'nodes',
      name: 'buaa_hpc_node_list',
      component: _import('system/buaa_hpc/nodes/nodes.vue'),
      meta: { ...meta, title: '节点列表' }
    },
    {
      path: 'jobs',
      name: 'buaa_hpc_job_list',
      component: _import('system/buaa_hpc/jobs/jobs.vue'),
      meta: { ...meta, title: '任务列表' }
    },
    {
      path: 'jobs_learn',
      name: 'buaa_hpc_job_list_learn',
      component: _import('system/buaa_hpc/jobs_learn/jobs_learn.vue'),
      meta: { ...meta, title: '任务列表_learn' }
    }
  ]
}
