<template>
  <section id="not_found">
    <h1>
      Такой страницы не существует.
      <br />
      Вы будете перенаправлены на главную страницу через {{count}}...
    </h1>
  </section>
</template>

<script>
export default {
  name: "not_found_page",
  data: () => ({
    count: 3
  }),
  created() {
    setTimeout(
      function() {
        this.$router.push("/");
      }.bind(this),
      3000
    );
    setInterval(
      function() {
        this.count--;
      }.bind(this),
      1000
    );
  }
};
</script>

<style lang="scss" scoped>
#not_found {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    position: relative;
    color: $textColor;
    text-align: center;
  }
}
</style>