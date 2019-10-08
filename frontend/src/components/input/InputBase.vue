<template>
  <div :class="{focused: focused}" class="input_wrapper">
    <img :class="isActive" src="../../assets/images/arrow.svg" />
    <input
      :type="type"
      :placeholder="placeholder"
      @input="inputHandler"
      @focus="onFocus"
      @blur="onBlur"
    />
  </div>
</template>

<script>
import { userConstants } from "../../constants/user.constants";

export default {
  name: "input",
  props: {
    type: String,
    placeholder: String,
    validator: Function,
    setUserData: Function
  },
  data: () => ({
    inputValue: "",
    correct: false,
    focused: false
  }),
  methods: {
    inputHandler: function({ target }) {
      this.inputValue = target.value;
      switch (this.type) {
        case "text":
          this.setUserData(userConstants.LOGIN, target.value);
          break;
        case "password":
          this.setUserData(userConstants.PASSWORD, target.value);
          break;
        default:
          break;
      }
    },
    onFocus: function() {
      this.focused = true;
    },
    onBlur: function() {
      this.focused = false;
    }
  },
  computed: {
    isActive: function() {
      return {
        ["image-active"]: this.validator(this.inputValue)
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.input_wrapper {
  position: relative;
  width: 350px;
  height: 42px;
  margin-top: 18px;
  margin-bottom: 18px;
  transition: 0.3s;

  img {
    position: absolute;
    z-index: 1;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    width: 0.86vw;
    max-width: 16.512px;
    opacity: 0.3;
    transition: 0.3s;
  }
  .image-active {
    opacity: 1;
  }
  input {
    position: relative;
    width: calc(100% - 40px);
    height: 42px;
    background: #ffffff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    border: none;
    outline: none;
    border-radius: 100px;
    padding-left: 20px;
    padding-right: 20px;
    transition: 0.3s;
    color: #6b5e6c;
    font-size: 16px;
    &::placeholder {
      color: #c0bbc7;
    }
  }
}
.focused {
  transform: translateY(-2px);
  input {
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
  }
}
</style>