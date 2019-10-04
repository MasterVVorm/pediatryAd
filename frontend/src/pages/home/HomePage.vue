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

<style lang="scss" src="./_home_page_styles.scss" scoped>

</style>