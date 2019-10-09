<template>
  <div class="control_btn" :class="{active, 'paused': !active}" @click="clickHandler">
    <svg v-if="active" viewBox="-1 -1 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 0C4.032 0 0 4.032 0 9C0 13.968 4.032 18 9 18C13.968 18 18 13.968 18 9C18 4.032 13.968 0 9 0ZM9 16.2C5.031 16.2 1.8 12.969 1.8 9C1.8 5.031 5.031 1.8 9 1.8C12.969 1.8 16.2 5.031 16.2 9C16.2 12.969 12.969 16.2 9 16.2Z"
        fill="#C0BBC7"
      />
      <path
        d="M7.11563 5.09502L12.6156 8.43785C13.1281 8.72528 13.1281 9.4657 12.6156 9.74999L7.11563 12.9054C6.61875 13.1803 6 12.8242 6 12.2493V5.75109C6 5.17313 6.62187 4.8201 7.11563 5.09502Z"
        fill="#C0BBC7"
      />
    </svg>
    <svg
      v-else
      width="18"
      height="18"
      viewBox="-1 -1 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.2 12.6C7.695 12.6 8.1 12.195 8.1 11.7V6.3C8.1 5.805 7.695 5.4 7.2 5.4C6.705 5.4 6.3 5.805 6.3 6.3V11.7C6.3 12.195 6.705 12.6 7.2 12.6ZM9 0C4.032 0 0 4.032 0 9C0 13.968 4.032 18 9 18C13.968 18 18 13.968 18 9C18 4.032 13.968 0 9 0ZM9 16.2C5.031 16.2 1.8 12.969 1.8 9C1.8 5.031 5.031 1.8 9 1.8C12.969 1.8 16.2 5.031 16.2 9C16.2 12.969 12.969 16.2 9 16.2ZM10.8 12.6C11.295 12.6 11.7 12.195 11.7 11.7V6.3C11.7 5.805 11.295 5.4 10.8 5.4C10.305 5.4 9.9 5.805 9.9 6.3V11.7C9.9 12.195 10.305 12.6 10.8 12.6Z"
        fill="#C0BBC7"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "button_play",
  props: {
    active: Boolean,
    id: String
  },
  methods: {
    clickHandler: function() {
      this.$store.dispatch("update_active", this.id);
    }
  }
};
</script>

<style lang="scss" scoped>
.control_btn {
  
  &:hover {
    svg {
      path {
        fill: white;
      }
    }
  }
}
.active{
    background: $activeColor;
  }
.paused{
    background: $pausedColor;
}
</style>
