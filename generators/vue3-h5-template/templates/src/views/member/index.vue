<template>
  <div class="avatar-wrap">
    <van-image round width="10rem" height="10rem" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
    <div class="member-detail">
      <p class="nickname">
        <span v-if="getUserInfo">用户名:{{ getUserInfo }}</span>
        <van-button v-else shape="square" size="small" type="default" @click="goLogin"> 去登录 </van-button>
      </p>
      <p class="info">个人其他信息，后续补充....</p>
    </div>
  </div>
  <van-grid direction="vertical">
    <van-grid-item v-for="item in 10" :key="item" text="文字" icon="photo-o"> </van-grid-item>
  </van-grid>
</template>

<script lang="ts" setup name="MemberPage">
  import { useUserStore } from '@/store/modules/user'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const userStore = useUserStore()
  const getUserInfo = computed(() => {
    const { name = '' } = userStore.getUserInfo || {}
    return name
  })
  const goLogin = () => {
    router.push('/login')
  }
</script>

<style lang="scss">
  .avatar-wrap {
    display: flex;
    align-items: center;
    margin: 10px 40px;

    .member-detail {
      margin-left: 20px;

      .nickname {
        font-size: 32px;
        font-weight: bold;
      }

      .info {
        margin-top: 10px;
        font-size: 24px;
      }
    }
  }
</style>
