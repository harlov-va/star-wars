<template>
  <a class="character-card" @click="toggleModal">
    <div class="character-card__content">
      <i class="avatar" :style="{ background: colorAvatar}">
        <b class="avatar__text">{{ avatarText }}</b>
      </i>
      <h2 class="character-card__title">{{ name }}</h2>
      <p class="character-card__description">{{species}}</p>
    </div>
  </a>
</template>
<script>
export default {
  props: [`name`, `species`, `avatarText`, `url`],
  data() {
    return {
      colorAvatar:
        "#" +
        Math.random()
          .toString(16)
          .substr(-6)
    };
  },
  methods: {
    async toggleModal() {
      await this.$store.dispatch(`getCharacter`, this.url);
      this.$store.dispatch(`toggleModal`, false);
      this.$store.dispatch(`setCurrentColorAvatar`, this.colorAvatar);
    }
  }
};
</script>
<style scoped lang="scss">
.character-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #1a1a1a;
  height: 250px;
  border-radius: 8px;
  color: #ffffff;
  cursor: pointer;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;  
  animation-name: bounceInUp;
  -webkit-animation-name: bounceInUp;

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;

    .avatar {
      position: relative;
      background: $color-avatar;
      width: 80px;
      min-height: 80px;
      border-radius: 50%;
      margin: 0 auto;

      &__text {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        font-style: normal;
        font-size: 48px;
        line-height: 80px;
      }
    }
  }

  &__title {
    margin: 0;
    margin-top: 10px;
  }

  &__description {
    color: $color-text;
  }

  @-webkit-keyframes bounceInUp {
    0% {
      opacity: 0;
      -webkit-transform: translateY(10px);
    }    
    100% {
      opacity: 1;
      -webkit-transform: translateY(0);
    }
  }

  @keyframes bounceInUp {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>