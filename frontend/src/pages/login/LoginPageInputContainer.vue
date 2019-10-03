<template>
  <form class="login_form" @submit="onSubmit">
    <Preloader v-if="getLoginInStatus" />
    <slot v-else></slot>
  </form>
</template>

<script>
import Preloader from '../../components/preloader/Preloader'
export default {
  name: "login_page_input_container",
  props: {
    startLogin: Function
  },
  components:{
    Preloader
  },
  computed:{
    getLoginInStatus(){
      return this.$store.getters.LOGIN_IN
    }
  },
  methods: {
    onSubmit: function(e) {
      e.preventDefault();
      this.$emit("onSubmit");
    }
  }
};
</script>

<style lang="scss" scoped>
.login_form {
  position: relative;
  padding: 0;
  align-self: center;
  margin: 0 auto;
}
</style>