<template>
  <header>
    <h1 class="title">Characters encyclopedia</h1>
  </header>
</template>
<script>
export default {};
</script>
<style scoped lang="scss">
  header {
    display: flex;
    align-items: center;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
      url("../assets/Rectangle 3.png");
    background-size: contain;
    height: 33.3vh;
    position: relative;
  }
  .title {
    position: relative;
    width: max-content;
    margin: 0 auto;
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 1rem;
    line-height: 28px;
    text-align: center;
    letter-spacing: 0.11em;
    text-transform: uppercase;
    font-feature-settings: "cpsp" on;
    color: #ffffff;

    &:before {
      content: "";
      background-image: url("../assets/star.png");
      width: 100%;
      height: 97px;
      position: absolute;
      background-size: contain;
      background-repeat: no-repeat;
      left: 0;
      right: 0;
      bottom: 0;
    }

    &:after {
      content: "";
      background-image: url("../assets/wars.png");
      width: 100%;
      height: 97px;
      position: absolute;
      background-size: contain;
      background-repeat: no-repeat;
      top: 30px;
      left: 0;
      right: 0;
    }
}
</style>