<template>
  <svg :class="[$attrs.class, 'app-svg-icon']" :style="getStyle" aria-hidden="true" @click="$emit('click')">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    prefix?: string
    svgName: string
    size?: number | string
    color?: string
  }>(),
  {
    prefix: 'icon',
    size: 24,
    color: '#333',
  },
)
defineEmits(['click'])

const symbolId = computed(() => `#${props.prefix}-${props.svgName}`)
const getStyle = computed(() => {
  const { size } = props
  let s = `${size}`

  s = `${s.replace('px', '')}px`
  return {
    width: s,
    height: s,
  }
})
</script>

<style lang="scss" scoped>
.app-svg-icon {
  display: inline-block;
  overflow: hidden;
  use {
    fill: currentColor;
  }
}
</style>
