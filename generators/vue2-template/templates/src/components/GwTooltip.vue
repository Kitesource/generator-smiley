<template>
  <div class="tooltip-wrapper" ref="tooltipWrapper">
    <div
      v-show="visible"
      class="tooltip"
      :class="[`tooltip--${placement}`, { 'tooltip--visible': visible }]"
      :style="tooltipStyle"
    >
      <div class="tooltip__arrow" :style="arrowStyle"></div>
      <div class="tooltip__content" :style="contentStyle">
        <slot name="content">{{ content }}</slot>
      </div>
    </div>
    <div
      class="tooltip__reference"
      @click="trigger === 'click' && handleClick()"
      @mouseenter="trigger === 'hover' && handleMouseEnter()"
      @mouseleave="trigger === 'hover' && handleMouseLeave()"
    >
      <slot name="reference">
        <slot></slot>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    content: {
      type: String,
      default: ''
    },
    trigger: {
      type: String,
      default: 'click',
      validator: (value) => ['click', 'hover'].includes(value)
    },
    placement: {
      type: String,
      default: 'top',
      validator: (value) => ['top', 'bottom', 'left', 'right'].includes(value)
    },
    offset: {
      type: Number,
      default: 0
    },
    showArrow: {
      type: Boolean,
      default: true
    },
    // tooltip 与 reference 的距离
    distance: {
      type: Number,
      default: 16
    }
  },
  data() {
    return {
      visible: false,
      tooltipStyle: {},
      arrowStyle: {},
      contentStyle: {},
      safeMargin: 20 // 安全边距，防止箭头和内容分离
    }
  },
  computed: {
    maxOffsetX() {
      if (!this.$refs.tooltipWrapper) return 0
      const tooltip = this.$refs.tooltipWrapper.querySelector('.tooltip')
      if (!tooltip) return 0
      const tooltipRect = tooltip.getBoundingClientRect()
      // 临界值为 tooltip 宽度的一半减去安全边距
      return Math.floor(tooltipRect.width / 2) - 24
    },
    maxOffsetY() {
      if (!this.$refs.tooltipWrapper) return 0
      const tooltip = this.$refs.tooltipWrapper.querySelector('.tooltip')
      if (!tooltip) return 0
      const tooltipRect = tooltip.getBoundingClientRect()
      // 临界值为 tooltip 高度的一半减去安全边距
      return Math.floor(tooltipRect.height / 2) - 24
    }
  },
  methods: {
    handleClick() {
      this.visible = !this.visible
      this.updatePosition()
    },
    handleMouseEnter() {
      this.visible = true
      this.updatePosition()
    },
    handleMouseLeave() {
      this.visible = false
    },
    updatePosition() {
      this.$nextTick(() => {
        const reference = this.$refs.tooltipWrapper.querySelector('.tooltip__reference')
        const tooltip = this.$refs.tooltipWrapper.querySelector('.tooltip')
        const content = this.$refs.tooltipWrapper.querySelector('.tooltip__content')
        if (!reference || !tooltip || !content) return

        const referenceRect = reference.getBoundingClientRect()
        const tooltipRect = tooltip.getBoundingClientRect()

        // 根据 placement 选择对应的最大偏移值
        let isVertical = this.placement === 'top' || this.placement === 'bottom'
        const maxOffset = isVertical ? this.maxOffsetX : this.maxOffsetY

        // 计算实际的偏移值，确保不超过临界值
        const actualOffset = Math.min(Math.max(-maxOffset, this.offset), maxOffset)

        let top = 0
        let left = 0
        let arrowLeft = 0
        let arrowTop = 0

        switch (this.placement) {
          case 'top':
            top = referenceRect.top - tooltipRect.height - this.distance
            left = referenceRect.left + (referenceRect.width - tooltipRect.width) / 2
            arrowLeft = tooltipRect.width / 2
            break
          case 'bottom':
            top = referenceRect.bottom + this.distance
            left = referenceRect.left + (referenceRect.width - tooltipRect.width) / 2
            arrowLeft = tooltipRect.width / 2
            break
          case 'left':
            top = referenceRect.top + (referenceRect.height - tooltipRect.height) / 2
            left = referenceRect.left - tooltipRect.width - this.distance
            arrowTop = tooltipRect.height / 2
            break
          case 'right':
            top = referenceRect.top + (referenceRect.height - tooltipRect.height) / 2
            left = referenceRect.right + this.distance
            arrowTop = tooltipRect.height / 2
            break
        }

        this.tooltipStyle = {
          top: `${top}px`,
          left: `${left}px`
        }

        this.arrowStyle = {
          ...(isVertical ? { left: `${arrowLeft}px` } : { top: `${arrowTop}px` })
        }

        // 根据 placement 决定偏移方向
        this.contentStyle = {
          transform: isVertical ? `translateX(${actualOffset}px)` : `translateY(${actualOffset}px)`
        }
      })
    }
  },
  mounted() {
    window.addEventListener('scroll', this.updatePosition)
    window.addEventListener('resize', this.updatePosition)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.updatePosition)
    window.removeEventListener('resize', this.updatePosition)
  }
}
</script>

<style lang="scss" scoped>
.tooltip-wrapper {
  display: inline-block;
  position: relative;
}

.tooltip {
  position: fixed;
  z-index: 2000;
  color: #fff;
  font-size: 14px;
  line-height: 1.4;
  white-space: nowrap;
  opacity: 0;

  transition: opacity 0.2s ease-in-out;

  &--visible {
    opacity: 0.9;
  }
  &__reference {
    cursor: pointer;
  }

  &__content {
    position: relative;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.75);
    border-radius: 12px;
    padding: 12px;
    line-height: 20px;
    word-break: break-all;
    white-space: normal;
    max-width: 80vw;
    max-height: 80vh;
  }

  &__arrow {
    position: absolute;
    width: 0;
    height: 0;
    border: 10px solid transparent;
  }

  &--top &__arrow {
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-top-color: rgba(0, 0, 0, 0.75);
    border-width: 10px 10px 0 10px;
  }

  &--bottom &__arrow {
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-bottom-color: rgba(0, 0, 0, 0.75);
    border-width: 0 10px 10px 10px;
  }

  &--left &__arrow {
    right: -10px;
    top: 50%;
    transform: translateY(-50%);
    border-left-color: rgba(0, 0, 0, 0.75);
    border-width: 10px 0 10px 10px;
  }

  &--right &__arrow {
    left: -10px;
    top: 50%;
    transform: translateY(-50%);
    border-right-color: rgba(0, 0, 0, 0.75);
    border-width: 10px 10px 10px 0;
  }
}
</style>
