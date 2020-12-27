<template>
  <d2-container class="page">
    <div>首页</div>
  </d2-container>
</template>

<script>

import { menuAside } from '@/menu'

export default {
  components: {},
  created () {
    this.$store.commit('d2admin/menu/asideSet', menuAside)
  }
}
</script>

<style lang="scss" scoped>

</style>
