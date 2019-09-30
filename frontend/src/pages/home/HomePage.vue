<template>
  <section>
    <header>
      <h1>Рекламные компании</h1>
      <ButtonCreate />
    </header>
    <div class="content"></div>
  </section>
</template>

<script>
import Preloader from "../../components/preloader/Preloader";
import ButtonCreate from "../../components/buttons/create/ButtonCreate";
export default {
  name: "home",
  props: {
    url: String
  },
  components: {
    Preloader,
    ButtonCreate
  },
  computed: {
    getAds() {}
  },
  created() {
    console.log(this.$store.getters.ADS);
  }
};
</script>

<style lang="scss" scoped>
section {
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  @media (max-width: 1919px) {
    grid-template-rows: minmax(120px, 8.6vw) auto;
  }
  @media (min-width: 1920px) {
    grid-template-rows: 165px auto;
  }
  header {
    position: relative;
    padding: 0;
    width: 86.25vw;
    height: 100%;
    max-width: 1656px;
    margin: 0 auto;
    background: lightgreen;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    h1 {
      font-weight: 300;
      transition: 0.3s;
      @media (max-width: 1919px) {
        font-size: 3.2vw;
      }
      @media (min-width: 1920px) {
        font-size: 61px;
      }
    }
  }
  .content {
    position: relative;
    width: 86.25vw;
    max-width: 1656px;
    height: 100%;
    margin: 0 auto;
    background: lightcoral;
  }
}
</style>