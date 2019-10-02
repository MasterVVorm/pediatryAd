<template>
  <section>
    <header>
      <h1>Рекламные компании</h1>
      <ButtonCreate />
    </header>
    <div class="content_wrapper">
      <Preloader v-if="isLoading" />
      <div class="no_content" v-else-if="getAds.length === 0">
        <h1>У Вас пока что не создано ни одной рекламной компании.</h1>
      </div>
      <div class="content" v-else>
        <HomePageItem v-for="item in getAds" :key="item.id" :advertisement="item" />
      </div>
    </div>
  </section>
</template>

<script>
import Preloader from "../../components/preloader/Preloader";
import ButtonCreate from "../../components/buttons/create/ButtonCreate";
import HomePageItem from "./HomePageItem";
export default {
  name: "home",
  props: {
    url: String
  },
  components: {
    Preloader,
    ButtonCreate,
    HomePageItem
  },
  computed: {
    getAds() {
      return this.$store.getters.ADS;
    },
    isLoading() {
      return this.$store.getters.LOADING;
    }
  },
  created() {
    this.$store.dispatch("get_advertisements");
  }
};
</script>

<style lang="scss" scoped>
section {
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  max-height: 100vh;
  @media (max-width: 1919px) {
    grid-template-rows: minmax(120px, 8.6vw) calc(100vh - 120px);
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
  .content_wrapper {
    position: relative;
    width: 87.25vw;
    max-width: 1656px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    .no_content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
      color: $textColor;
    }
    .content {
      position: relative;
      width: calc(99.5% - 10px);
      height: calc(100% - 20px);
      display: flexbox;
      flex-wrap: wrap;
      overflow-y: auto;
      padding-top: 20px;
      padding-left: 10px;
      transition: 0.3s;
    }
  }
}
</style>