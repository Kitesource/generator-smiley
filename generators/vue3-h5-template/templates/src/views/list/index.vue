<template>
  <van-card
    v-for="(item, index) in list"
    :key="index"
    :thumb="item.imgUrl"
    :title="item.title"
    :origin-price="item.price"
    :price="item.vipPrice"
    :desc="item.shopName"
    :tag="item.shopDesc"
    @click="(_e) => toDetails(index)"
  />
</template>

<script lang="ts" setup name="ListPage">
  import { listData } from './data'

  const router = useRouter()

  const list = ref(listData)

  const toDetails = (index) => {
    router.push({ path: '/details', query: { id: index } })
  }
</script>
