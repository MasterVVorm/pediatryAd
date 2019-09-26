<template>
  <h1>home</h1>
</template>

<script>
export default {
  name: "home",
  props: {
    url: String
  },
  data: () => ({
    component: null
  }),
  mounted: function() {
    console.log(this.url);
    console.log(this.component)
  }
};
</script>