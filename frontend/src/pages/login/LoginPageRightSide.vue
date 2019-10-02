<template>
  <div class="login_right_side_container">
    <img src="../../assets/images/login/first.svg" alt />
    <img src="../../assets/images/login/second.svg" alt />
    <img src="../../assets/images/login/third.svg" alt />
    <img src="../../assets/images/login/fourth.svg" alt />
    <img src="../../assets/images/login/fifth.svg" alt />
    <img src="../../assets/images/login/sixth.svg" alt />
    <img src="../../assets/images/login/seventh.svg" alt />
    <div class="bottom_line_container">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login_right_side_container {
  position: relative;
  width: 100%;
  height: 35.5vw;
  max-height: 682.5px;
  img {
    position: absolute;
    &:nth-of-type(1) {
      left: 5%;
      top: 50%;
      transform: translateY(-50%);
      width: 5vw;
      max-width: 79.5px;
      animation: float 20s infinite linear;
    }
    &:nth-of-type(2) {
      left: 15%;
      top: 10%;
      width: 6.56vw;
      max-width: 126px;
      animation: float 20s infinite linear;
    }
    &:nth-of-type(3) {
      left: 20%;
      top: 50%;
      transform: translateY(-50%);
      width: 9.76vw;
      max-width: 187.5px;
      animation: float 15s infinite linear;
      animation-delay: -2s;
    }
    &:nth-of-type(4) {
      z-index: 1;
      left: 28%;
      top: 65%;
      width: 9.76vw;
      max-width: 187.5px;
      animation: float 30s infinite linear;
      animation-delay: -5s;
    }
    &:nth-of-type(5) {
      z-index: 1;
      left: 45%;
      top: 20%;
      width: 10.625vw;
      max-width: 204px;
      animation: float 25s infinite linear;
      animation-delay: -14s;
    }
    &:nth-of-type(6) {
      left: 68%;
      top: 10%;
      width: 5.7vw;
      max-width: 109.5px;
      animation: float 30s infinite linear;
      animation-delay: -20s;
    }
    &:nth-of-type(7) {
      left: 60%;
      top: 42%;
      width: 9.6vw;
      max-width: 184.5px;
      animation: float 35s infinite linear;
      animation-delay: -10s;
    }
  }
  .bottom_line_container {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .line {
      position: relative;
      width: 0.5vw;
      max-width: 2.6px;
      height: 10.31vw;
      max-height: 198px;
      background: #ededed;
      animation: jump 5s infinite linear;
      @for $i from 1 through 15 {
        &:nth-of-type(#{$i}) {
          animation-delay: -#{$i * 1}s;
        }
      }
    }
  }
}

@keyframes jump {
  0% {
    transform: translateY(0);
  }
  20% {
    transform: translateY(-28px);
  }
  25% {
    transform: translateY(-30px);
  }
  70% {
    transform: translateY(28px);
  }
  75% {
    transform: translateY(30px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes float {
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-10%);
  }
  75% {
    transform: translateY(10%);
  }
  100% {
    transform: translateY(0);
  }
}
</style>