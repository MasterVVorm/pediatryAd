<template>
  <div class="create_ad_container">
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
          <img
            id="create_img"
            v-if="this.photo.url"
            :src="this.photo.url"
            alt="Так изображение будет выглядеть в приложении"
          />
          <svg
            v-else
            width="39"
            height="39"
            viewBox="0 0 39 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M29.8185 34.4594H4.42735V9.06825H20.7502V5.44095H4.42735C2.43233 5.44095 0.800049 7.07324 0.800049 9.06825V34.4594C0.800049 36.4544 2.43233 38.0867 4.42735 38.0867H29.8185C31.8135 38.0867 33.4458 36.4544 33.4458 34.4594V18.1365H29.8185V34.4594ZM15.6901 28.7101L12.1354 24.4299L7.14783 30.8321H27.098L20.6777 22.2898L15.6901 28.7101ZM33.4458 5.44095V0H29.8185V5.44095H24.3775C24.3956 5.45909 24.3775 9.06825 24.3775 9.06825H29.8185V14.4911C29.8366 14.5092 33.4458 14.4911 33.4458 14.4911V9.06825H38.8867V5.44095H33.4458Z"
              fill="#DCDCDC"
            />
          </svg>
        </div>
        <div class="upload_btn" @click="uploadBtnClickHandler">Загрузить</div>
      </div>
      <div class="right_block">
        <input name="title" id="title" type="text" placeholder="Заголовок..." @input="inputHandler" />
        <textarea
          name="description"
          id="description"
          cols="50"
          rows="5"
          placeholder="Рекламный текст..."
          @input="inputHandler"
        ></textarea>
        <div class="create_fields_wrapper">
          <input
            type="url"
            name="owner_url"
            id="owner_url"
            placeholder="Ссылка на ресурс рекламодателя"
            @input="inputHandler"
          />
          <select name="index" id="index" @input="inputHandler">
            <option value selected disabled hidden>Как часто показывать</option>
            <option value="1">редко</option>
            <option value="2">иногда</option>
            <option value="3">нормально</option>
            <option value="4">часто</option>
            <option value="5">очень часто</option>
          </select>
          <input
            type="url"
            name="video_url"
            id="video_url"
            placeholder="Добавить видео (URL)"
            @input="inputHandler"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "create_ad_form",
  data: () => ({
    title: "",
    description: "",
    owner_url: "",
    video_url: "",
    index: "",
    photo: {
      file: null,
      url: null
    }
  }),
  methods: {
    inputHandler({ target }) {
      const { id, value } = target;
      switch (id) {
        case "title":
          this.title = value;
          break;
        case "description":
          this.description = value;
          break;
        case "owner_url":
          this.owner_url = value;
          break;
        case "video_url":
          this.video_url = value;
        case "index":
          this.index = value;
        default:
          break;
      }
    },
    uploadBtnClickHandler() {
      this.$refs.file_upload.click();
    },
    changeHandler({ target }) {
      const file_upload = this.$refs.file_upload;
      if (file_upload.files && file_upload.files[0]) {
        let reader = new FileReader();
        reader.onload = e => {
          this.photo = {
            file: file_upload.files[0],
            url: e.target.result
          };
        };
        reader.readAsDataURL(file_upload.files[0]);
      }
    },
    createAd: createAd
  },
  created() {
    this.$on("submit_creation", () => {
      console.log("create");
    });
  }
};

function createAd() {
  let formData = new FormData();
  formData.append("token", JSON.parse(localStorage.getItem("TOKEN")));
  formData.append("title", this.title);
  formData.append("description", this.description);
  formData.append("video_url", this.video_url);
  formData.append("product_url", this.owner_url);
  formData.append("image", this.photo.file);
  formData.append("start_time", 1567987200);
  formData.append("end_time", 1567987200);
  formData.append("index", this.index);
  formData.append("active", true);
  formData.append("show_image", true);
  this.$store.dispatch("create_ad", formData);
}
</script>

<style lang="scss" scoped>
.create_ad_container {
  position: relative;
  align-self: center;
  margin-left: calc(50% - 542px);
  width: 1084px;

  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  padding: 20px;
  .create_form {
    position: relative;
    display: grid;
    grid-template-columns: 20% 80%;
    width: 100%;
    height: auto;
    min-height: 458px;
    max-height: 90%;
    overflow-y: auto;
    input,
    textarea {
      border: 2px solid $blurColor;
      box-sizing: border-box;
      border-radius: 10px;
      outline: none;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 21px;
      padding-left: 10px;
      padding-right: 10px;
      color: $textColor;
      background: #ffffff;
      transition: 0.3s;
      box-shadow: none;
      &::placeholder {
        color: $placeholderColor;
      }
      &:focus {
        box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.1);
      }
    }
    input {
      height: 43px;
    }
    .left_block {
      position: relative;
      display: flex;
      justify-content: center;
      align-content: flex-start;
      flex-wrap: wrap;
      #file_upload {
        display: none;
      }

      .drop_zone {
        position: relative;
        width: 197px;
        height: 170px;
        border: 2px solid $blurColor;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        #create_img {
          position: relative;
          max-width: 100%;
          max-height: 100%;
        }
      }
      .upload_btn {
        position: relative;
        width: 197px;
        height: 38px;
        background: $mainColor;
        border-radius: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        text-transform: uppercase;
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        line-height: 15px;
        margin-top: 14px;
        cursor: pointer;
        transition: 0.3s;
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
        }
      }
      input[type="url"] {
        position: relative;
        width: 197px;
        margin-top: 14px;
      }
    }
    .right_block {
      display: flex;
      justify-content: center;
      align-content: flex-start;
      flex-wrap: wrap;
      #title {
        width: 95%;
      }
      #description {
        width: 95%;
        height: 231px;
        margin-top: 14px;
        outline: none;
        resize: none;
        padding: 10px;
        font-family: "Roboto";
      }
      .create_fields_wrapper {
        position: relative;
        width: 95%;
        display: flex;
        justify-content: flex-start;
        align-content: center;
        flex-wrap: wrap;
        margin-top: 14px;
        #video_url,
        #owner_url {
          width: 75%;
        }
        #video_url {
          margin-top: 14px;
        }
        #index {
          position: relative;
          background: transparent;
          border: 2px solid $blurColor;
          border-radius: 10px;
          color: $placeholderColor;
          outline: none;
          margin-left: 14px;
          padding-left: 10px;
          padding-right: 10px;
          -webkit-appearance: none;
          -moz-appearance: none;
          text-indent: 1px;
          text-overflow: "";
          cursor: pointer;
          option {
            border: 2px solid $blurColor;
          }
        }
      }
    }
  }
}
</style>