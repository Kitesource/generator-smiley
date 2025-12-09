<script>
export default {
  name: 'BaseRender',
  props: {
    render: {
      type: Function,
      required: true
    },
    scope: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  render(h) {
    return this.render(h, this.scope, this)
  }
}
</script>

<style lang="scss" scoped></style>
