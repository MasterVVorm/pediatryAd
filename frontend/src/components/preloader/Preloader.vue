<template>
  <div id="preloader">
    <div class="container">
      <div class="dot_wrap">
        <div class="dot"></div>
      </div>
      <div class="dot_wrap">
        <div class="dot"></div>
      </div>
      <div class="dot_wrap">
        <div class="dot"></div>
      </div>
      <div class="dot_wrap">
        <div class="dot"></div>
      </div>
      <div class="dot_wrap">
        <div class="dot"></div>
      </div>
      <div class="dot_wrap">
        <div class="dot"></div>
      </div>
      <div class="dot_wrap">
        <div class="dot"></div>
      </div>
      <div class="dot_wrap">
        <div class="dot"></div>
      </div>
      <div class="dot_wrap">
        <div class="dot"></div>
      </div>
      <div class="dot_wrap">
        <div class="dot"></div>
      </div>
      <div class="dot_wrap">
        <div class="dot"></div>
      </div>
      <div class="dot_wrap">
        <div class="dot"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$color: #b3a0cc;
$containerDim: 50px;
$dotDim: 8px;

#preloader {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .container {
    position: relative;
    width: $containerDim;
    height: $containerDim;

    .dot_wrap {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .dot {
        position: relative;
        width: $dotDim;
        height: $dotDim;
        border-radius: 50%;
        transform: translateY(-20px);
        background: $color;
        animation: blink 1s infinite;
      }

      @for $i from 1 through 18 {
        &:nth-child(#{$i}) {
          transform: rotateZ(-#{$i * 30}deg);
          .dot {
            animation-delay: #{$i * -0.08}s;
          }
        }
      }
    }
  }

  @keyframes blink {
    0% {
      opacity: 1;
    }
    80% {
      opacity: 0;
    }
  }
}
</style>