<template>
  <form @submit="onSubmit">
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: "login_page_input_container",
  props: {
    startLogin: Function
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
form {
  position: relative;
  padding: 0;
  align-self: center;
  margin: 0 auto;
}
</style>