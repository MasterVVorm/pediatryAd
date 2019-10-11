<template>
  <div class="advertisement_wrapper" >
    <preloader v-if="isDeleting" />
    <div v-else class="advertisement"  role="img" alt="advertisement.id">
    <div class="description">
      <div
        class="img_desc"
        :class="{'active': advertisement.active}"
        :style="{backgroundImage: 'url(' + advertisement.images[0].url + ')'}"
      >
        <div class="point" :class="{'point-active': advertisement.active}"></div>
      </div>
      <div class="title">{{getTitle}}</div>
      <div class="desc">{{getDesc}}</div>
    </div>
    <div class="time">
      <div class="img_start"></div>
      <div class="date_start">{{getStartDate}}</div>
      <div class="hours_start">{{getStartTime}}</div>
      <div class="img_end"></div>
      <div class="date_end">{{getEndDate}}</div>
      <div class="hours_end">{{getEndTime}}</div>
      <div class="line"></div>
    </div>
    <div class="actions">
      <ButtonEdit :id="advertisement.id" />
      <ButtonPlay :active="advertisement.active" :id="advertisement.id.toString()" />
      <ButtonDelete :id="advertisement.id.toString()" />
    </div>
  </div>
  </div>
  
</template>

<script>
import { getFormatedDate, getFormatedTime } from "@/utils/common.utils.js";
import ButtonEdit from "../../components/buttons/edit/ButtonEdit";
import ButtonPlay from "../../components/buttons/play/ButtonPlay";
import ButtonDelete from "../../components/buttons/delete/ButtonDelete";
import Preloader from "../../components/preloader/Preloader";

export default {
  name: "home_page_item",
  props: {
    advertisement: Object
  },
  components: {
    ButtonEdit,
    ButtonPlay,
    ButtonDelete,
    preloader: Preloader
  },
  computed: {
    getTitle() {
      const title = this.advertisement.title;
      return title.length > 60 ? title.slice(0, 60) + "..." : title;
    },
    getDesc() {
      const desc = this.advertisement.description;
      return desc.length > 150 ? desc.slice(0, 150) + "..." : desc;
    },
    getStartDate() {
      return getFormatedDate(this.advertisement.start_time * 1000);
    },
    getStartTime() {
      return getFormatedTime(this.advertisement.start_time * 1000);
    },
    getEndDate() {
      return getFormatedDate(this.advertisement.end_time * 1000);
    },
    getEndTime() {
      return getFormatedTime(this.advertisement.end_time * 1000);
    },
    isDeleting() {
      const updating = this.$store.getters.AD_UPDATING;
      return updating.status && updating.id == this.advertisement.id;
    }
  }
};
</script>

<style lang="scss" src="./_home_page_item_styles.scss" scoped>
</style>