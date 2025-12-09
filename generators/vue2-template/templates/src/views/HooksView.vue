<template>
  <div>
    <h4>useCount</h4>
    <p>Count: {{ count }}</p>
    <p>Double Count: {{ doubleCount }}</p>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
    <hr />

    <h4>useNamespace</h4>
    <div :class="ns.b()">
      <div>ns.b() - {{ ns.b() }}</div>
      <div>ns.b('view') - {{ ns.b('view') }}</div>
      <div>ns.e('title') - {{ ns.e('title') }}</div>
      <div>ns.bm('view', 'title') - {{ ns.bm('view', 'title') }}</div>
      <div>ns.em('text', 'active') - {{ ns.em('text', 'active') }}</div>
      <div>ns.bem('view', 'button') - {{ ns.bem('view', 'button', 'primary') }}</div>
      <div>ns.is('active', true) - {{ ns.is('active', true) }}</div>
      <div>ns.has('active', true) - {{ ns.has('active', true) }}</div>
      <div>ns.no('active') - {{ ns.no('active') }}</div>
      <div>ns.join('title') - {{ ns.join('title') }}</div>
      <div>ns.joinEl('title') - {{ ns.joinEl('title') }}</div>
      <div>ns.cssVar('color') - {{ ns.cssVar('color') }}</div>
      <div>ns.cssVarName('color') - {{ ns.cssVarName('color') }}</div>
      <div>ns.cssVarEl('color') - {{ ns.cssVarEl('color') }}</div>
      <div>ns.cssVarNameEl('color') - {{ ns.cssVarNameEl('color') }}</div>
    </div>
  </div>
</template>

<script>
import { useCount } from '@/hooks/use-count'
import { useNamespace } from '@/hooks/use-namespace'

export default {
  name: 'HooksView',
  data() {
    return {}
  },
  setup(props, { $attrs, $slots }) {
    const { count, increment, decrement, doubleCount } = useCount()
    const { b, e, m, be, bm, em, bem, is, has, no, join, cssVar, cssVarName, joinEl, cssVarEl, cssVarNameEl } =
      useNamespace('home')
    return {
      count,
      increment,
      decrement,
      doubleCount,
      ns: {
        b,
        e,
        m,
        bm,
        em,
        bem,
        no,
        is,
        has,
        join,
        cssVar,
        cssVarName,
        joinEl,
        cssVarEl,
        cssVarNameEl
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.gw-home {
  div {
    line-height: 1.5;
  }
}
</style>
