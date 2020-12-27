<template>
  <d2-container class="page">
    <template slot="header">
      <h1> 北京航空航天大学 校级高算 性能监控平台</h1>
    </template>
    <div class="article">
      <d2-markdown :source="content"/>
    </div>

  </d2-container>
</template>

<script>

import { menuAside } from '@/menu'
import content from './md/content.md'

export default {
  data () {
    return {
      content
    }
  },
  components: {},
  created () {
    this.$store.commit('d2admin/menu/asideSet', menuAside)
  }
}
</script>

<style lang="less" scoped>
.title {
  font-size: 36px;
}

.article {
  transition: opacity .3s;
}
</style>
