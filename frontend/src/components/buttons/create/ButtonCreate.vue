<template>
  <div class="create_btn" @click="goToCreatePage"></div>
</template>

<script>
import { colors } from "@/constants/color.constants";
export default {
  name: "button_create",
  methods: {
    goToCreatePage() {
      this.$router.push("/create");
    }
  }
};
</script>

<style lang="scss" scoped>
.create_btn {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%) translateX(50%);
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 2px solid $mainColor;
  transition: 0.3s;
  cursor: pointer;
  &::before,
  &::after {
    position: absolute;
    content: "";
    top: 50%;
    left: 50%;
    width: 80%;
    height: 3px;
    color: inherit;
    background: $mainColor;
    transition: 0.3s;
  }
  &::before {
    transform: translateY(-50%) translateX(-50%) rotateZ(90deg);
  }
  &::after {
    transform: translateY(-50%) translateX(-50%);
  }
  &:hover {
    background: $mainColor;
    &::before,
    &::after {
      background: white;
    }
  }
}
</style>