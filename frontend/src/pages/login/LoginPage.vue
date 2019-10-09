<template>
  <section>
    <img id="logo" src="../../assets/images/logo.svg" alt />
    <LoginPageInputContainer @onSubmit="onSubmit">
      <h1>
        Lorem ipsum dolor sit
        amet, consectetur
        adipiscing.
      </h1>
      <h3>
        Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Tellus, pellentesque.
      </h3>
      <component
        :is="input_component"
        type="text"
        placeholder="Логин"
        :validator="validateLogin"
        :setUserData="setUserData"
      />
      <component
        :is="input_component"
        type="password"
        placeholder="Пароль"
        :validator="validatePassword"
        :setUserData="setUserData"
      />
      <component :is="button_component" title="Войти" styles="margin-top: 10px;" />
    </LoginPageInputContainer>
    <LoginPageRightSide />
  </section>
</template>

<script>
import InputBase from "../../components/input/InputBase";
import LoginPageInputContainer from "./LoginPageInputContainer";
import { userConstants } from "../../constants/user.constants";
import ButtonBase from "../../components/buttons/base/ButtonBase";
import LoginPageRightSide from "./LoginPageRightSide";
import toastr from 'toastr';

export default {
  name: "login",
  components: {
    LoginPageInputContainer,
    LoginPageRightSide,
    InputBase,
    ButtonBase
  },
  data: () => ({
    login: "",
    password: "",
    input_component: "inputBase",
    button_component: "buttonBase"
  }),
  methods: {
    validateLogin: validateData,
    validatePassword: validateData,
    setUserData: setUserData,
    onSubmit: onSubmit
  }
};

function validateData(text) {
  return text.length > 3;
}

function setUserData(id, value) {
  switch (id) {
    case userConstants.LOGIN:
      this.login = value;
      break;
    case userConstants.PASSWORD:
      this.password = value;
      break;
    default:
      break;
  }
}

function onSubmit() {
  if (validateData(this.login) && validateData(this.password)) {
    console.log("submit");
    this.$store.dispatch("login", {
      login: this.login,
      password: this.password
    });
  } else {
    toastr.info('Все поля должны быть заполнены')
  }
}
</script>

<style lang="scss" scoped>
section {
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 1280px;
  margin: auto;
  display: grid;
  grid-template-columns: 629px 651px;
  #logo {
    position: fixed;
    top: 1.3vw;
    left: 3.67vw;
    width: 3.2vw;
  }
  h1 {
    position: relative;
    width: 383px;
    height: 144px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 300;
    font-size: 40px;
    line-height: 120.19%;
    margin-top: 0;
    color: $textColor;
  }
  h3 {
    position: relative;
    width: 404px;
    height: 49px;
    max-width: 606px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 21px;
    color: $textColor;
  }
}
</style>
