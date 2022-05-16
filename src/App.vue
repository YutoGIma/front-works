<template>
  <div id="app">
    <BasePage msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import BasePage from "./components/BasePage.vue";

export default {
  name: "App",
  components: {
    BasePage,
  },
};
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
