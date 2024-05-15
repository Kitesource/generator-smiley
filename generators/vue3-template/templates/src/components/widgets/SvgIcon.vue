<template>
  <svg
    :class="[$attrs.class, 'svg-icon']"
    :style="getStyle"
    aria-hidden="true"
    @click="$emit('click')"
  >
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script lang="ts" setup>
interface PropsType {
  prefix?: string
  svgName: string
  size?: number | string
  color?: string
}
const props = withDefaults(defineProps<PropsType>(), {
  prefix: 'icon',
  size: 24,
  color: '#333',
})
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
.svg-icon {
  display: inline-block;
  overflow: hidden;
  use {
    fill: currentColor;
  }
}
</style>
