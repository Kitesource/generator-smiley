<template>
  <div class="flex h-screen w-screen flex-col items-center justify-center p-4">
    <SvgIcon svg-name="403" :size="200" />
    <div class="flex max-w-480 flex-col items-center gap-4 py-10">
      <h2 class="text-center text-2xl">Ooups, page forbidden</h2>
      <p class="text-center">
        We are very sorry for the inconvenience. It looks like you’re trying to
        access a page that you are not authorized.
      </p>
      <div class="flex items-center gap-4">
        <router-link :to="{ path: '/' }">
          <el-button type="primary"> BACK TO HOMEPAGE </el-button>
        </router-link>
        <el-button type="primary" @click="logout"> BACK TO LOGIN </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
function logout() {
  console.log('logout')
}
</script>
