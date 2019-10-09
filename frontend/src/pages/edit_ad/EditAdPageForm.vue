<template>
  <div class="edit_ad_container">
    <div class="preloader_wrapper" v-if="getLoadingState">
      <Preloader />
    </div>
    <div class="edit_ad_wrapper" v-else-if="getAd">
      <form class="create_form">
        <div class="left_block">
          <input
            type="file"
            name="fileUpload"
            id="file_upload"
            ref="file_upload"
            @change="changeHandler"
          />
          <div class="drop_zone">
            <Preloader v-if="getUpdateLoading.image" />
            <img
              v-else
              id="edit_img"
              :src="this.image.url ? this.image.url : getAd.images[0].url"
              alt
            />
          </div>
          <div class="upload_btn" @click="uploadBtnClickHandler">Загрузить</div>
        </div>
        <div class="right_block">
          <div class="title_wrapper">
            <Preloader v-if="getUpdateLoading.title" />
            <input
              name="title"
              id="title"
              type="text"
              :class="{'error': error.title}"
              placeholder="Заголовок..."
              @focus="focusHandler"
              @input="inputHandler"
              @blur="blurHandler"
              :value="getAd.title"
            />
          </div>
          <div class="description_wrapper">
            <Preloader v-if="getUpdateLoading.description" />
            <textarea
              v-else
              name="description"
              id="description"
              :class="{'error': error.description}"
              cols="50"
              rows="5"
              placeholder="Рекламный текст..."
              :value="getAd.description"
              @focus="focusHandler"
              @input="inputHandler"
              @blur="blurHandler"
            ></textarea>
          </div>
          <div class="create_fields_wrapper">
            <div class="product_url_wrapper">
              <Preloader v-if="getUpdateLoading.product_url" />
              <input
                v-else
                type="url"
                name="product_url"
                id="product_url"
                :class="{'error': error.product_url}"
                placeholder="Ссылка на ресурс рекламодателя"
                :value="getAd.product_url"
                @focus="focusHandler"
                @input="inputHandler"
                @blur="blurHandler"
              />
            </div>
            <selector-base
              :updating="getUpdateLoading.index"
              :setIndex="setIndex"
              :error="error.index"
              :currentValue="getAd.index"
            />
          </div>
          <div class="create_fields_wrapper">
            <div class="video_url_wrapper">
              <Preloader v-if="getUpdateLoading.video_url" />
              <input
                v-else
                type="url"
                name="video_url"
                id="video_url"
                placeholder="Добавить видео (URL)"
                :value="getAd.video_url"
                @focus="focusHandler"
                @input="inputHandler"
                @blur="blurHandler"
              />
            </div>
            <input-date
              :width="'calc(30% - 14px)'"
              :updating="getUpdateLoading.time"
              :error="error.time"
              :set_value="setTimes"
              :onBlur="onTimeChange"
              :defaultValue="getDefaultTimes"
            />
          </div>
        </div>
      </form>
    </div>

    <div class="not_exists" v-else>
      <h3>Данной рекламной компании не существует</h3>
    </div>
  </div>
</template>

<script>
import Preloader from "../../components/preloader/Preloader";
import InputDate from "../../components/input/date/InputDate";
import SelectorBase from "../../components/selectors/SelectorBase";
import {
  stringToTimestamp,
  clearNumbers,
  timestampToString
} from "../../utils/common.utils";
import toastr from "toastr";

export default {
  name: "edit_ad_form",
  components: {
    Preloader,
    "input-date": InputDate,
    "selector-base": SelectorBase
  },
  data: () => ({
    title: "",
    description: "",
    product_url: "",
    video_url: "",
    time: {
      start_time: null,
      end_time: null
    },
    index: null,
    image: {
      file: null,
      url: null
    },
    error: {
      title: false,
      description: false,
      product_url: false,
      start_time: false,
      end_time: false,
      image: false,
      time: false
    }
  }),
  computed: {
    getLoadingState() {
      return this.$store.getters.LOADING;
    },
    getAd() {
      return this.$store.getters.CURRENT_AD;
    },
    getUpdateLoading() {
      return this.$store.getters.UPDATING;
    },
    getDefaultTimes() {
      const currentAd = this.$store.getters.CURRENT_AD;
      console.log(timestampToString(currentAd.start_time, currentAd.end_time));
      return timestampToString(currentAd.start_time, currentAd.end_time);
    }
  },
  methods: {
    focusHandler: focusHandler,
    inputHandler: inputHandler,
    blurHandler: blurHandler,
    selectChangeHandler: selectChangeHandler,
    uploadBtnClickHandler: uploadBtnClickHandler,
    changeHandler: changeHandler,
    setTimes: setTimes,
    onTimeChange: onTimeChange,
    setIndex: setIndex
  }
};

function setIndex(index) {
  if (this.$store.getters.CURRENT_AD.index != index) {
    const id = this.$store.getters.CURRENT_AD.id;
    this.$store.dispatch("update_index", { id, payload: index });
  }
}

function focusHandler({ target }) {
  console.log(target.value);
  const { id, value } = target;
  this.$data[id] = value;
}

function inputHandler({ target }) {
  const { id } = target;
  this.$data.error[id] = false;
  this.$data[id] = target.value;
}

function blurHandler({ target }) {
  const { id, value } = target;
  if (value.length == 0 && id !== "video_url") {
    this.$data.error[id] = true;
    toastr.error("Поле не может быть пустым");
    return;
  }
  if (this.$store.getters.CURRENT_AD[id] !== this.$data[id]) {
    const id = this.$store.getters.CURRENT_AD.id;
    const payload = this.$data[target.id];
    this.$store.dispatch("update_" + target.id, {
      id,
      payload
    });
  }
}

function selectChangeHandler({ target }) {
  const id = this.$store.getters.CURRENT_AD.id;
  const index = this.$store.getters.CURRENT_AD.index;
  const payload = target.value;

  if (payload !== index) {
    this.$store.dispatch("update_index", {
      id,
      payload
    });
  }
}

function uploadBtnClickHandler() {
  this.$refs.file_upload.click();
}

function changeHandler({ target }) {
  const file_upload = this.$refs.file_upload;
  if (file_upload.files && file_upload.files[0]) {
    let reader = new FileReader();
    reader.onload = e => {
      this.image = {
        file: file_upload.files[0],
        url: e.target.result
      };
      let form = new FormData();
      form.append("image", file_upload.files[0]);
      form.append(
        "image_id",
        this.$store.getters.CURRENT_AD.images[0].image_id
      );
      this.$store.dispatch("update_image", form);
    };
    reader.readAsDataURL(file_upload.files[0]);
  }
}
function setTimes(time) {
  this.error.time = time.length == 0;

  const { start_time, end_time } = stringToTimestamp(time);
  this.time = {
    text: clearNumbers(time),
    start_time: start_time ? start_time : null,
    end_time: end_time ? end_time : null
  };
}

function onTimeChange() {
  console.log(this.time.text);
  const { start_time, end_time } = this.$store.getters.CURRENT_AD;
  console.log(this.time.start_time + " " + start_time);
  if (!this.time.text) {
    return;
  }
  if (this.time.text.length < 16) {
    this.error.time = true;
    toastr.error("Новые даты введены некорректно");
    return;
  }
  if (validateTime(this.time, { start_time, end_time })) {
    this.$store.dispatch("update_time", {
      id: this.$store.getters.CURRENT_AD.id,
      time: this.time
    });
  }
}

function validateTime(newTime, oldTime) {
  return (
    (newTime.start_time && newTime.start_time != oldTime.start_time) ||
    (newTime.end_time && newTime.end_time != oldTime.end_time)
  );
}
</script>


<style lang="scss" src="./styles.scss">
</style>