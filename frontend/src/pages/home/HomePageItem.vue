<template>
  <div class="advertisement">
    <div class="description">
      <div class="img_desc" :style="{backgroundImage: 'url(' + advertisement.images[0].url + ')'}"></div>
      <div class="title">{{advertisement.title}}</div>
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
      <ButtonEdit />
      <ButtonPlay :active="advertisement.active" />
      <ButtonDelete :id="advertisement.id.toString()" />
    </div>
  </div>
</template>

<script>
import { getFormatedDate, getFormatedTime } from "@/utils/common.utils.js";
import ButtonEdit from "../../components/buttons/edit/ButtonEdit";
import ButtonPlay from "../../components/buttons/play/ButtonPlay";
import ButtonDelete from "../../components/buttons/delete/ButtonDelete";

export default {
  name: "home_page_item",
  props: {
    advertisement: Object
  },
  components: {
    ButtonEdit,
    ButtonPlay,
    ButtonDelete
  },
  computed: {
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
    }
  }
};
</script>

<style lang="scss" scoped>
.advertisement {
  position: relative;
  width: 98%;
  display: flex;
  justify-content: space-between;

  @media (max-width: 1919px) {
    margin-bottom: 2em;
    min-height: 150px;
    height: 10.1vw;
  }
  @media (min-width: 1920px) {
    margin-bottom: 36px;
    height: 193.5px;
  }
  .description {
    position: relative;
    height: 100%;
    width: 77.8%;
    background: #ffffff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    border-radius: 20px;
    display: grid;
    grid-template-columns: 10.1vw auto;
    grid-template-rows: 45% 55%;
    .img_desc {
      position: relative;
      grid-row-start: 1;
      grid-row-end: 3;
      align-self: center;
      margin-left: 10%;
      width: 80%;
      height: 80%;
      border-radius: 20px;
      background-size: cover;
      background-position: 50% 50%;
    }
    .title {
      position: relative;
      align-self: center;
      font-weight: 400;
      @media (max-width: 1919px) {
        font-size: 1.56vw;
      }
      @media (min-width: 1920px) {
        font-size: 30px;
      }
    }
    .desc {
      position: relative;
      font-weight: 300;
      @media (max-width: 1919px) {
        font-size: 1.36vw;
      }
      @media (min-width: 1920px) {
        font-size: 26.25px;
      }
    }
  }
  .time {
    position: relative;
    height: 100%;
    width: 11%;
    background: #ffffff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    border-radius: 20px;
    display: grid;
    grid-template-rows: 10% repeat(5, 16%) 10%;
    grid-template-columns: 25% 75%;
    .img_start,
    .img_end {
      position: relative;
      background: url("../../assets/images/time.svg");
      background-size: contain;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      align-self: center;
      @media (max-width: 1919px) {
        width: 70%;
        height: 70%;
        // width: 1vw;
        // height: 1vw;
        margin-left: 15%;
      }
      @media (min-width: 1920px) {
        width: 15px;
        height: 15px;
        margin-left: calc(50% - 15px);
      }
    }
    .date_start,
    .date_end {
      position: relative;
      font-weight: 500;
      align-self: center;
      @media (max-width: 1919px) {
        font-size: 1.1vw;
      }
      @media (min-width: 1920px) {
        font-size: 24px;
      }
    }
    .hours_start,
    .hours_end {
      position: relative;
      font-weight: 400;
      @media (max-width: 1919px) {
        font-size: 1vw;
      }
      @media (min-width: 1920px) {
        font-size: 22px;
      }
    }
    .img_start {
      grid-row-start: 2;
    }
    .date_start {
      grid-row-start: 2;
    }
    .hours_start {
      grid-column-start: 2;
      grid-row-start: 3;
    }
    .img_end {
      grid-row-start: 5;
      grid-column-start: 1;
    }
    .date_end {
      grid-column-start: 2;
      grid-row-start: 5;
    }
    .hours_end {
      grid-column-start: 2;
      grid-row-start: 6;
    }
    .line {
      position: relative;
      background: url("../../assets/images/line.svg");
      grid-column-start: 1;
      grid-row-start: 3;
      grid-row-end: 5;
      background-size: contain;
      width: 4%;
      height: 100%;
      margin-left: 49%;
    }
  }
  .actions {
    position: relative;
    height: 100%;
    width: 4%;
    background: #ffffff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    border-radius: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
  }
}
</style>