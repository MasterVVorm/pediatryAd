<template>
  <section id="create_ad">
    <header>
      <ButtonBack />
      <h1>Создать рекламную компанию</h1>
    </header>
    <CreateAdPageForm ref="form" />
    <div class="submit_btn" @click="create">Создать</div>
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

<style lang="scss" src="./style.scss" scoped>

</style>