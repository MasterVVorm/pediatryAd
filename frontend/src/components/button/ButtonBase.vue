<template>
  <button
    :class="{['button-active']: pressed}"
    :style="getStyle"
    @mousedown="mouseDownHandler"
    @mouseup="mouseUpHandler"
    @mouseenter="mouseEnter"
    @mouseleave="mouseLeave"
  >{{title}}</button>
</template>

<script>
import { colors } from "../../constants/color.constants";

export default {
  name: "buttonBase",
  props: {
    title: String,
    styles: {
      type: String,
      default: ""
    }
  },
  data: () => ({
    pressed: false,
    hovered: false
  }),
  computed: {
    getStyle() {
      return `
        border:  1px solid ${colors.MAIN};
        color: ${this.hovered ? "white" : colors.MAIN};
        background: ${this.hovered ? colors.MAIN : 'white'};
        ${this.styles}
      `;
    }
  },
  methods: {
    mouseDownHandler: mouseDownHandler,
    mouseUpHandler: mouseUpHandler,
    mouseEnter: mouseEnter,
    mouseLeave: mouseLeave
  }
};

function mouseDownHandler() {
  this.pressed = true;
}

function mouseUpHandler() {
  this.pressed = false;
}

function mouseEnter() {
  this.hovered = true;
}
function mouseLeave() {
  this.hovered = false;
}
</script>

<style lang="scss" scoped>
button {
  position: relative;
  color: white;
  font-weight: bold;
  outline: none;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  background: white;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
  }
  @media (max-width: 1919px) {
    width: 15.625vw;
    height: 3.5vw;
    border-radius: 1.75vw;
    font-size: 1.56vw;
  }
  @media (min-width: 1920px) {
    width: 300px;
    height: 67.5px;
    border-radius: 33.75px;
    font-size: 30px;
  }
}

.button-active {
  transform: translateY(0);
  box-shadow: none;
  transition: 0.05s;
  &:hover {
    transform: none;
    box-shadow: none;
  }
}
</style>