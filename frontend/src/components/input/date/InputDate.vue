<template>
  <container :width="width">
    <preloader v-if="updating" />
    <input-date
      v-else
      ref="input"
      :placeholder="placeholder"
      :value="defaultValue"
      @blur="onBlur"
      @input="inputHandler"
      type="text"
      :error="isError"
    />
  </container>
</template>
<script>
import styled from "vue-styled-components";
import { colors } from "@/constants/color.constants.js";
import Preloader from "../../preloader/Preloader";
import { formatDate } from "@/utils/common.utils.js";

const containerProps = {
  width: String
};
const inputProps = {
  error: Boolean
};

const Container = styled("div", containerProps)`
  position: relative;
  width: ${props => props.width};
  height: 42px;
  margin-left: 14px;
`;

const StyledInput = styled("input", inputProps)`
  position: relative;
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  border: 2px solid $blurColor;
  box-sizing: border-box;
  border-radius: 10px;
  outline: none;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  padding-left: 10px;
  padding-right: 10px;
  color: ${colors.TEXT};
  background: #ffffff;
  transition: 0.3s;
  box-shadow: none;
  border: 2px solid ${props => (props.error ? colors.MAIN : colors.BLUR)};
  &::placeholder {
    color: ${colors.PLACEHOLDER};
  }
  &:focus {
    box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
  }
`;

export default {
  name: "date_input",
  props: {
    width: {
      type: String,
      required: false,
      default: "100%"
    },
    updating: {
      type: Boolean,
      required: false,
      default: true
    },
    placeholder: {
      type: String,
      required: false,
      default: "ГГГГ.ММ.ДД - ГГГГ.ММ.ДД",
      input: ""
    },
    defaultValue: {
      type: String,
      required: false,
      default: ""
    },
    set_value: {
      type: Function,
      required: true
    },
    onBlur: {
      type: Function,
      required: false,
      default: function() {}
    },
    error: { type: Boolean }
  },
  data: () => ({
    value: ""
  }),
  components: {
    container: Container,
    "input-date": StyledInput,
    preloader: Preloader
  },
  computed: {
    correctDate() {
      return this.input;
    },
    isError() {
      return this.error;
    }
  },
  methods: {
    inputHandler({ target }) {
      const { value } = target;
      target.value = formatDate(value);
      this.value = formatDate(value);
      this.set_value(value);
    },
  }
};
</script>