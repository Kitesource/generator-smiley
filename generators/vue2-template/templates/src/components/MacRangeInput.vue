<template>
  <div class="mac-input">
    <div v-for="(part, index) in macParts" :key="index">
      <input
        v-model="part.value"
        type="text"
        :ref="'ip' + index"
        maxlength="2"
        :placeholder="placeholder"
        @input="handleInput(index, part.value)"
        @keydown="handleKeyDown($event, index)"
      />
      <span class="mac-separator" v-if="index < inputNum - 1">-</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MacRangeInput',
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'XX'
    },
    inputNum: {
      type: Number,
      default: 6
    }
  },
  data() {
    return {
      macParts: Array(this.inputNum)
        .fill('')
        .map(() => ({ value: '' }))
    }
  },
  watch: {
    value: {
      handler(newVal) {
        this.initMacParts(newVal)
      },
      immediate: true // 初始化时立即执行
    }
  },
  methods: {
    initMacParts(value) {
      if (!value) {
        this.macParts.forEach((part) => (part.value = ''))
        return
      }
      const parts = value.split('-')
      if (parts.length === this.inputNum) {
        parts.forEach((part, index) => {
          this.macParts[index].value = part.toUpperCase().replace(/[^0-9A-F]/g, '')
        })
      }
    },
    handleInput(index, value) {
      // 输入验证：只允许十六进制字符
      const validValue = value.toUpperCase().replace(/[^0-9A-F]/g, '')
      this.macParts[index].value = validValue

      // 自动聚焦到下一个输入框
      if (validValue.length === 2 && index < this.inputNum - 1) {
        this.$nextTick(() => {
          this.$refs['ip' + (index + 1)][0].focus()
        })
      }

      this.emitMacAddress()
    },
    handleKeyDown(e, index) {
      // 支持退格键导航
      if (e.key === 'Backspace' && !this.macParts[index].value && index > 0) {
        this.$nextTick(() => {
          this.$refs['ip' + (index - 1)][0].focus()
        })
      }
      // 支持Tab键导航
      if (e.key === 'Tab') {
        e.preventDefault()
        const nextIndex = e.shiftKey ? index - 1 : index + 1
        if (nextIndex >= 0 && nextIndex < this.inputNum) {
          this.$refs['ip' + nextIndex][0].focus()
        }
      }
    },
    emitMacAddress() {
      const macAddress = this.macParts.map((part) => part.value).join('-')
      this.$emit('input', macAddress || '')
    }
  }
}
</script>

<style lang="scss" scoped>
.mac-input {
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid #e1dcdc;
  height: 36px; /* 增加高度提升可点击区域 */
  background-color: #ffffff;
  border-radius: 4px; /* 添加圆角提升视觉效果 */
  overflow: hidden;
}

.mac-input > div {
  display: flex;
  align-items: center;
}

.mac-input input {
  border: 0;
  width: 30px; /* 固定宽度 */
  height: 100%;
  text-align: center;
  padding: 0 4px;
  font-family: monospace; /* 使用等宽字体对齐 */
  font-size: 14px;
  &::placeholder {
    color: #c0c4cc;
  }
  &::-webkit-input-placeholder {
    color: #c0c4cc;
  }
}

.mac-input span {
  color: #999;
  padding: 0 4px;
  font-size: 20px;
  line-height: 20px;
}
</style>
