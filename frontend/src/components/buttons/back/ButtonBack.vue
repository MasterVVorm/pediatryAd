<template>
  <div class="back_btn" @click="clickHandler">
    <svg width="25" height="21" viewBox="0 0 25 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25 9V12H6.25L12.5 18L10.9375 21L0 10.5L10.9375 0L12.5 3L6.25 9H25Z" fill="#B3A0CC" />
    </svg>
  </div>
</template>

<script>
export default {
  name: "button_back",
  methods: {
    clickHandler() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.back_btn {
  position: absolute;
  top: 50%;
  left: 5%;
  transform: translateY(-50%);
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background: $mainColor;
    svg {
      path {
        fill: white;
      }
    }
  }
  svg {
    position: relative;
    path {
      transition: 0.3s;
    }
  }
}
</style>