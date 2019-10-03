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
    console.log('submit')
    this.$store.dispatch("login", {
      login: this.login,
      password: this.password
    });
  }
}
</script>

<style lang="scss" scoped>
section {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1920px;
  display: grid;
  grid-template-columns: 50% 50%;
  #logo {
    position: fixed;
    top: 1.3vw;
    left: 3.67vw;
    width: 3.2vw;
  }
  h1 {
    position: relative;
    width: 29.9vw;
    max-width: 574.5px;
    font-weight: 300;
    margin: 0;
    line-height: 120.19%;
  }
  h3 {
    position: relative;
    width: 31.5vw;
    max-width: 606px;
    font-weight: 300;
    margin: 0;
  }
  @media (max-width: 1919px) {
    h1 {
      font-size: 3vw;
    }
    h3 {
      font-size: 1.4vw;
      margin-top: 1.2vw;
      margin-bottom: 2vw;
    }
  }
  @media (min-width: 1920px) {
    h1 {
      font-size: 40pt;
    }
    h3 {
      font-size: 20pt;
      margin-top: 19px;
      margin-bottom: 38px;
    }
  }
}
</style>
