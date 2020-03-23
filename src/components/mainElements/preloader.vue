<template>
  <div class="preloader">
    <div class="preloader__falcon"></div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped lang="scss">
.preloader {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 10%;
  animation: fadeOut ease 4s;

  .preloader__falcon {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 0 auto;
    transform: rotate(360deg);
    animation-name: circle;
    animation-duration: 2s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-direction: normal;
    animation-delay: 0;
    animation-play-state: running;
    animation-fill-mode: forwards;

    &:after {
      display: block;
      content: url("../../assets/falcon-icon.png");
      transform: rotate(115deg);
    }
  }

  @keyframes circle {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
}
</style>