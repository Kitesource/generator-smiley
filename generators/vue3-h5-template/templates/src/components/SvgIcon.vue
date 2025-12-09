<!--
 * @Description:
 * @Author: kexin
 * @Date: 2021-06-07 14:14:44
-->
<template>
  <div v-if="isExternalIcon" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-bind="$attrs" />
  <svg v-else :class="['svg-icon', props.className]" :style="sizeStyle" aria-hidden="true" v-bind="$attrs">
    <use :href="iconName" :fill="color" />
  </svg>
</template>

<script lang="ts" setup>
  import { isExternal } from '@/utils/utils'

  const props = withDefaults(
    defineProps<{
      svg: string
      className?: string
      color?: string
      size?: string | number
    }>(),
    {
      className: '',
      color: '',
      size: 14,
    },
  )
  const isExternalIcon = computed(() => isExternal(props.svg))
  const iconName = computed(() => `#icon-${props.svg}`)
  const sizeStyle = computed(() => {
    return { width: props.size + 'px', height: props.size + 'px' }
  })
  const styleExternalIcon = computed(() => {
    return {
      ...sizeStyle.value,
      mask: `url(${props.svg}) no-repeat 50% 50%`,
      '-webkit-mask': `url(${props.svg}) no-repeat 50% 50%`,
    }
  })
</script>

<style scoped>
  .svg-icon {
    width: 1em;
    height: 1em;
    overflow: hidden;
    fill: currentcolor;
    vertical-align: -0.15em;
  }

  .svg-external-icon {
    display: inline-block;
    background-color: currentcolor;
    mask-size: cover !important;
  }
</style>
