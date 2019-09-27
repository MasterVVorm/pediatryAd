<template>
  <section>
    <h1>home</h1>
    <Preloader />
  </section>
</template>

<script>
import Preloader from "../../components/preloader/Preloader";
export default {
  name: "home",
  props: {
    url: String
  },
  data: () => ({
    component: null
  }),
  components: {
    Preloader
  },
  mounted: function() {
    console.log(this.url);
    console.log(this.component);
  }
};
</script>