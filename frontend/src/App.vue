<template>
  <div id="router_wrapper">
    <router-view v-if="!isStartingApp" />
    <Preloader v-else />
  </div>
</template>

<script>
import Preloader from "./components/preloader/Preloader";
export default {
  name: "App",
  components: {
    Preloader
  },
  created: function() {
    this.$store.dispatch("startApp");
  },
  computed: {
    isStartingApp() {
      return this.$store.state.startingApp;
    }
  }
};
</script>

<style lang="scss">
$mainColor: #3412;
html,
body {
  width: 100%;
  height: 100%;
}
body {
  position: relative;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Roboto", sans-serif;
  color: #6b5e6c;
}
#router_wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
.toast{
  background: green;
  color: white;
  border-radius: 50px;
}
</style>
