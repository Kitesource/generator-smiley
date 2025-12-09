<template>
  <van-swipe :init-swipe="page" show-indicators autoplay="3000">
    <van-swipe-item>
      <img :src="details.data.imgUrl" />
    </van-swipe-item>
  </van-swipe>

  <section class="info">
    <div>
      <span class="price">
        ￥<em>{{ details.data?.price }}.00</em>
      </span>
    </div>
    <div>
      <span>{{ details.data?.title }}}</span>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { detailsData } from '../data'
  const router = useRouter()
  const page = ref(1)

  const details = reactive<{ data: any }>({ data: {} })

  watch(
    () => router,
    (val) => {
      details.data = detailsData.find((_item, index) => index == parseInt(val.currentRoute.value.query.id as string))
    },
    { deep: true, immediate: true },
  )
</script>

<style lang="scss" scoped>
  .info {
    padding: 20px;

    .price {
      display: inline-block;
      color: #f2270c;
      font-size: 32px;

      em {
        font-size: 56px;
        font-style: normal;
      }
    }
  }
</style>
