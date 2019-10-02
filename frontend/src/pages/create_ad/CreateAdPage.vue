<template>
  <section id="create_ad">
    <header>
      <ButtonBack />
      <h1>Созать рекламную компанию</h1>
    </header>
    <CreateAdPageForm ref="form" />
    <ButtonBase title="Создать" style="align-self: center; margin: 0 auto;" :click="create" />
  </section>
</template>

<script>
import ButtonBack from "../../components/buttons/back/ButtonBack";
import ButtonBase from "../../components/buttons/base/ButtonBase";
import CreateAdPageForm from "./CreateAdPageForm";
export default {
  name: "create_ad",
  components: {
    ButtonBase,
    ButtonBack,
    CreateAdPageForm
  },
  methods: {
    create: function() {
      this.$refs.form.createAd();
    }
  }
};
</script>

<style lang="scss" scoped>
#create_ad {
  position: relative;
  display: grid;
  height: 100%;
  grid-template-rows: 140px calc(100% - 280px) 140px;
  header {
    position: relative;
    width: 100%;
    max-width: 1920px;
    height: 100%;
    align-self: center;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>