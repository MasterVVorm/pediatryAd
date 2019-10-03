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
          <div class="upload_btn" @click="uploadBtnClickHandler">Обновить</div>
        </div>
        <div class="right_block">
          <div class="title_wrapper">
            <Preloader v-if="getUpdateLoading.title" />
            <input
              name="title"
              id="title"
              type="text"
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
                placeholder="Ссылка на ресурс рекламодателя"
                :value="getAd.product_url"
                @focus="focusHandler"
                @input="inputHandler"
                @blur="blurHandler"
              />
            </div>

            <div class="index_wrapper">
              <Preloader v-if="getUpdateLoading.index" />
              <select
                v-else
                name="index"
                id="index"
                ref="select"
                @focus="focusHandler"
                @input="inputHandler"
                @change="selectChangeHandler"
                :value="getAd.index"
              >
                <option value selected disabled hidden>Как часто показывать</option>
                <option value="1">редко</option>
                <option value="2">иногда</option>
                <option value="3">нормально</option>
                <option value="4">часто</option>
                <option value="5">очень часто</option>
              </select>
            </div>
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
export default {
  name: "edit_ad_form",
  components: {
    Preloader
  },
  data: () => ({
    title: "",
    description: "",
    product_url: "",
    video_url: "",
    start_time: null,
    end_time: null,
    index: null,
    image: {
      file: null,
      url: null
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
    }
  },
  methods: {
    focusHandler: focusHandler,
    inputHandler: inputHandler,
    blurHandler: blurHandler,
    selectChangeHandler: selectChangeHandler,
    uploadBtnClickHandler: uploadBtnClickHandler,
    changeHandler: changeHandler
  }
};
function focusHandler({ target }) {
  console.log(target.value);
  const { id, value } = target;
  this.$data[id] = value;
}

function inputHandler({ target }) {
  this.$data[target.id] = target.value;
}

function blurHandler({ target }) {
  const { id } = target;
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
</script>


<style lang="scss" src="./styles.scss">
</style>