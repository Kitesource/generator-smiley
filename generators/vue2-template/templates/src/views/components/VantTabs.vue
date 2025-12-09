<template>
  <div>
    <van-tabs v-model="activeName" @change="handleChange">
      <van-tab v-for="item in list" :key="item.name" :title="item.title" :name="item.name" />
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'VantTabs',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    value: {
      type: String,
      default: 'a'
    },
    changing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeName: this.value
    }
  },
  watch: {
    value: {
      handler(newVal) {
        this.activeName = newVal
      },
      immediate: true
    }
  },
  methods: {
    handleChange(name) {
      // if (this.changing) return
      console.log('change', name)
    }
  }
}
</script>

<style lang="scss" scoped></style>
