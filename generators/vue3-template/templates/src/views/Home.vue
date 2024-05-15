<template>
  <div>
    <h1>hello, vue3 + ts</h1>
    <el-button @click="showTime">show time</el-button>
  </div>
</template>

<script lang="ts" setup>
import { formatDate } from '@/utils/day'

function showTime() {
  ElMessage.success(
    `${formatDate(new Date().toString(), 'YYYY-MM-DD HH:mmss')}`,
  )
}
</script>
