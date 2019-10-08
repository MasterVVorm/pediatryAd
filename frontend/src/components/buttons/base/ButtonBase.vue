<template>
  <button
    :class="{['button-active']: pressed}"
    :style="getStyle"
    @mousedown="mouseDownHandler"
    @mouseup="mouseUpHandler"
    @mouseenter="mouseEnter"
    @mouseleave="mouseLeave"
    @click="clickHandler"
  >{{title}}</button>
</template>

<script>
import { colors } from "@/constants/color.constants";

export default {
  name: "buttonBase",
  props: {
    title: String,
    styles: {
      type: String,
      default: ""
    },
    click: {
      type: Function,
      required: false
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
        background: ${this.hovered ? colors.MAIN : "white"};
        ${this.styles}
      `;
    }
  },
  methods: {
    mouseDownHandler: mouseDownHandler,
    mouseUpHandler: mouseUpHandler,
    mouseEnter: mouseEnter,
    mouseLeave: mouseLeave,
    clickHandler: clickHandler
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

function clickHandler() {
  if (this.click) this.click;
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
  text-transform: uppercase;
  transition: 0.3s;
  background: white;
  width: 200px;
  border-radius: 100px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 17px;
  line-height: 20px;

  text-align: center;
  letter-spacing: 0.065em;
  height: 45px;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
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