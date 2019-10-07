<template>
  <div id="date_wrapper">
    <preloader v-if="updating" />
    <input :class="{'error': error}" v-else v-model="date" type="text" @blur="onBlur" :placeholder="placeholder" />
  </div>
</template>
<script>
import styled from "vue-styled-components";
import { colors } from "@/constants/color.constants.js";
import Preloader from "../../preloader/Preloader";
import { formatDate } from "@/utils/common.utils.js";

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
    date: ""
  }),
  components: {
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
  watch: {
    date: function(val) {
      this.date = formatDate(val);
      this.set_value(val);
    },
    defaultValue: function(val, old) {
      console.log(val + "||" + old);
      this.date = val;
    }
  },
  created: function() {
    this.date = this.defaultValue;
  },
  methods: {
    inputHandler({ target }) {
      const { value } = target;
      target.value = formatDate(value);
      this.value = formatDate(value);
    }
  }
};
</script>

<style lang="scss" src="./style.scss">
</style>