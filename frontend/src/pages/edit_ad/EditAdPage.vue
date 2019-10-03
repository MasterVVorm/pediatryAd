<template>
  <section id="edit_ad">
    <EditAdPageHeader />
    <EditAdPageForm />
  </section>
</template>

<script>
import EditAdPageHeader from "./EditAdPageHeader";
import EditAdPageForm from "./EditAdPageForm";
export default {
  name: "edit_ad",
  components: {
    EditAdPageHeader,
    EditAdPageForm
  },
  created() {
    this.$store.dispatch("get_ad", this.$route.params.id);
  }
};
</script>

<style lang="scss" src="./styles.scss" scoped>

</style>