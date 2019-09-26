<template>
  <div>
    <tooltip />
  </div>
</template>

<script>
import Preloader from "../preloader/Preloader";

export default {
  name: "lazy_load",
  props: {
    url: String
  },
  components: {
    Tooltip: () => ({
      component: import("../../pages/home/Home.vue"),
      loading: Preloader,
      delay: 5000
    }),
    Preloader
  },
  data: () => ({}),
  mounted: function() {}
};
</script>