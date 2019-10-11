<template>
  <div class="logout_btn" @click="logout">
    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <title>Выйти</title>
      <path
        d="M20.4444 0H2.55556C1.87778 0 1.22776 0.269245 0.748505 0.748505C0.269245 1.22776 0 1.87778 0 2.55556V7.66667H2.55556V2.55556H20.4444V20.4444H2.55556V15.3333H0V20.4444C0 21.1222 0.269245 21.7722 0.748505 22.2515C1.22776 22.7308 1.87778 23 2.55556 23H20.4444C21.1222 23 21.7722 22.7308 22.2515 22.2515C22.7308 21.7722 23 21.1222 23 20.4444V2.55556C23 1.87778 22.7308 1.22776 22.2515 0.748505C21.7722 0.269245 21.1222 0 20.4444 0ZM9.05178 16.0821L10.8598 17.8889L17.2487 11.5L10.8598 5.11111L9.05178 6.91789L12.3561 10.2222H0V12.7778H12.3561L9.05178 16.0821Z"
        fill="#B3A0CC"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "button_logout",
  methods: {
    logout() {
      this.$store.dispatch('logout');
    }
  }
};
</script>

<style lang="scss" scoped>
.logout_btn {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%) translateX(50%);
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    svg {
      path {
        fill: white;
      }
    }
    background: $mainColor;
  }

  svg {
    transition: 0.3s;
  }
}
</style>