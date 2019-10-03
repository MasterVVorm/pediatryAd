<template>
  <div class="control_btn" @click="clickHandler" >
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.9642 1.55031C11.1386 1.37584 11.3458 1.23744 11.5737 1.14302C11.8017 1.0486 12.046 1 12.2927 1C12.5394 1 12.7838 1.0486 13.0117 1.14302C13.2397 1.23744 13.4468 1.37584 13.6213 1.55031C13.7957 1.72477 13.9341 1.9319 14.0286 2.15985C14.123 2.38781 14.1716 2.63212 14.1716 2.87886C14.1716 3.1256 14.123 3.36991 14.0286 3.59787C13.9341 3.82582 13.7957 4.03295 13.6213 4.20741L4.65353 13.1752L1 14.1716L1.99642 10.518L10.9642 1.55031Z"
        stroke="#C0BBC7"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "button_edit",
  props: {
    id: Number
  },
  methods:{
    clickHandler(){
      this.$router.push({name: 'edit', params: {id: this.id}})
    }
  }
};
</script>
