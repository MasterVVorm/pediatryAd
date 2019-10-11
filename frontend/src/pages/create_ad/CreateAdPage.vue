<template>
  <section id="create_ad">
    <header>
      <button-back />
      <h1>Создать рекламную компанию</h1>
    </header>
    <form-create ref="form" />
    <div class="submit_btn" @click="create">Создать</div>
  </section>
</template>

<script>
import ButtonBack from "../../components/buttons/back/ButtonBack";
import CreateAdPageForm from "./CreateAdPageForm";

export default {
  name: "create_ad",
  components: {
    'button-back': ButtonBack,
    'form-create': CreateAdPageForm
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