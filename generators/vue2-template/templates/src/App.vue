<template>
  <div id="app">
    <nav>
      <span v-for="(route, index) in routes" :key="route.path">
        <router-link :to="route.path">
          {{ route.name }}
        </router-link>
        <span v-if="index < routes.length - 1"> | </span>
      </span>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {}
  },
  computed: {
    routes() {
      return this.$router.options.routes
    }
  },
  methods: {}
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px 10px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
