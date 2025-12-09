<template>
  <div class="home">
    <div><img alt="Vue logo" src="../assets/logo.png" /></div>
    <button @click="$router.push('/about')">Go to About</button>
    <div v-html="obj.htmlContent"></div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    // HelloWorld
  },
  data() {
    return {
      obj: {
        htmlContent: 'please contact <giftcamera001@outlook.com> with your purchase ID'
      }
    }
  },
  mounted() {
    console.log(document.readyState)
    console.log('js', JSON.stringify(this.obj))
    if (document.readyState !== 'complete') {
      history.pushState(null, '', location.href)
    }
    // window.location.href = 'http://localhost:8080/about'
    // window.location.replace('http://localhost:8080/about')
  }
}
</script>
