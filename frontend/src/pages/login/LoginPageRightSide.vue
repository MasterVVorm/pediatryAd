<template>
  <div class="login_right_side_container">
    <img src="../../assets/images/login/1.png" alt />
    <img src="../../assets/images/login/2.png" alt />
    <img src="../../assets/images/login/3.png" alt />
    <img src="../../assets/images/login/4.png" alt />
    <img src="../../assets/images/login/5.png" alt />
    <img src="../../assets/images/login/6.png" alt />
    <img src="../../assets/images/login/7.png" alt />
    <img src="../../assets/images/login/8.png" alt />
    <img src="../../assets/images/login/icons/1.png" alt />
    <img src="../../assets/images/login/icons/2.png" alt />
    <img src="../../assets/images/login/icons/3.png" alt />
    <img src="../../assets/images/login/icons/4.png" alt />
    <img src="../../assets/images/login/icons/5.png" alt />
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
  width: 651px;
  height: 600px;
  margin: 0;
  align-self: center;
  img {
    position: absolute;
    &:nth-of-type(1) {
      top: 50%;
      right: 551px;
      transform: translateY(-50%);
      width: 53px;
      height: 48px;
      animation: float 20s infinite linear;
    }
    &:nth-of-type(2) {
      top: 22%;
      right: 471px;
      width: 84px;
      height: 77px;
      animation: float 20s infinite linear;
    }
    &:nth-of-type(3) {
      top: 45%;
      right: 386px;
      transform: translateY(-50%);
      width: 125px;
      height: 116px;
      animation: float 15s infinite linear;
      animation-delay: -2s;
    }
    &:nth-of-type(4) {
      z-index: 1;
      top: 65%;
      right: 354px;
      width: 106px;
      height: 103px;
      animation: float 10s infinite linear;
      animation-delay: -5s;
    }
    &:nth-of-type(5) {
      z-index: 1;
      top: 80%;
      right: 236px;
      width: 58px;
      height: 54px;
      animation: float 25s infinite linear;
      animation-delay: -14s;
    }
    &:nth-of-type(6) {
      z-index: 1;
      top: 30%;
      right: 211px;
      width: 136px;
      height: 133px;
      animation: float 30s infinite linear;
      animation-delay: -20s;
    }
    &:nth-of-type(7) {
      z-index: 0;
      top: 45%;
      right: 108px;
      width: 123px;
      height: 117px;
      animation: float 35s infinite linear;
      animation-delay: -10s;
    }
    &:nth-of-type(8) {
      top: 25%;
      right: 109px;
      width: 73px;
      height: 68px;
      animation: float 35s infinite linear;
      animation-delay: -10s;
    }
    //icons
     &:nth-of-type(9) {
      top: 70%;
      right: 519px;
      animation: float 12s infinite linear;
      animation-delay: -13s;
    }
    &:nth-of-type(10) {
      top: 35%;
      right: 378px;
      animation: float 12s infinite linear;
      animation-delay: -13s;
    }
    &:nth-of-type(11) {
      top: 20%;
      right: 250px;
      animation: float 12s infinite linear;
      animation-delay: -13s;
    }
    &:nth-of-type(12) {
      top: 55%;
      right: 262px;
      animation: float 12s infinite linear;
      animation-delay: -20s;
    }
    &:nth-of-type(13) {
      top: 70%;
      right: 80px;
      animation: float 12s infinite linear;
      animation-delay: -2s;
    }
  }
  .bottom_line_container {
    position: absolute;
    left: 0;
    bottom: 50px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .line {
      position: relative;
      width: 0.5vw;
      max-width: 2.6px;
      height: 95px;
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