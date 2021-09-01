<template>
  <div class="list_view_box">
    <List class="list_view"></List>
  </div>
</template>
<script>
import List from '@/components/List/List.vue'
export default {
  components: {
    List
  }
}
</script>
<style lang="less" scoped>
.list_view {
  width: 936px;
  margin: 0 auto;
}
</style>
