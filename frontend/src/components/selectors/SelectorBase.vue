<template>
  <div id="selector" ref="selector" :style="getStyles" @click="openOptions">
    <preloader v-if="updating" />
    <div class="wrapper" :class="{'error': error}" v-else>
      {{this.options[this.getCurrentValue -1]}}
      <div class="options" v-if="showOptions" :style="getPosition">
        <div data-id="1" class="option" @click="pickHandler">{{this.options[0]}}</div>
        <div data-id="2" class="option" @click="pickHandler">{{this.options[1]}}</div>
        <div data-id="3" class="option" @click="pickHandler">{{this.options[2]}}</div>
        <div data-id="4" class="option" @click="pickHandler">{{this.options[3]}}</div>
        <div data-id="5" class="option" @click="pickHandler">{{this.options[4]}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Preloader from "../preloader/Preloader";

export default {
  name: "selector-base",
  components: {
    preloader: Preloader
  },
  props: {
    currentValue: {
      required: false,
      default: null
    },
    error: {
      type: Boolean
    },
    setIndex: {
      type: Function,
      required: true
    },
    updating: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: () => ({
    value: null,
    showOptions: false,
    options: [
      "Редко",
      "Иногда",
      "Нормально",
      "Часто",
      "Очень часто",
      "Как часто показывать"
    ]
  }),
  computed: {
    getCurrentValue() {
      if (!this.value) {
        if (!this.currentValue) {
          return 6;
        } else {
          return this.currentValue;
        }
      } else {
        return this.value;
      }
    },
    getStyles() {
      let style =
        this.value == null && this.currentValue == null
          ? "color: #d2d2d2;"
          : "color: #6b5e6c;";
      style += this.error ? "border-color: #b3a0cc;" : "border-color:#ececec;";
      return style;
    },
    getPosition() {
      let domRect = this.$refs.selector.getBoundingClientRect();
      return `left: ${domRect.left}px; top: ${domRect.top}px; width: ${domRect.width}px;`;
    }
  },
  methods: {
    openOptions() {
      this.showOptions = !this.showOptions;
    },
    pickHandler({ target }) {
      const index = target.getAttribute("data-id");
      this.value = index;
      this.setIndex(index);
    }
  }
};
</script>

<style lang="scss" scoped>
#selector {
  position: relative;
  width: calc(30% - 14px);
  height: 43px;
  background: transparent;
  border-radius: 10px;
  margin-left: 14px;
  text-indent: 1px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  transition: 0.3s;
  &:hover {
    box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
  }

  .wrapper {
    position: relative;
    width: 100%;
    height: 39px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid $blurColor;
    border-radius: 10px;
    transition: 0.3s;
    .options {
      position: fixed;
      z-index: 100;
      transform: translateY(56px);
      height: 172px;
      background: #ffffff;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      overflow: hidden;
      .option {
        position: relative;
        width: 100%;
        height: 20%;
        display: flex;
        justify-content: flex-start;
        padding-left: 20px;
        align-items: center;
        font-size: 16px;
        color: $textColor;
        &:hover {
          background: $placeholderColor;
        }
      }
    }
  }
  .error {
    border-color: $mainColor;
  }
}
</style>