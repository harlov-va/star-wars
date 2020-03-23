<template>
  <div class="modal">
    <a class="overlay"></a>
    <div class="popup">
      <a class="popup__close" title="Закрыть" @click="toggleModal">&#10799;</a>
      <div class="popup__header">
        <i class="avatar" :style="{ background: currentColorAvatar}">
          <b class="avatar__text">{{character.name.charAt(0)}}</b>
        </i>
        <span class="header-title">{{character.name}}</span>
      </div>
      <ul class="popup__details">
        <li class="item">
          <div class="item__prop">
            <img src="@/assets/birthyear-icon.svg" alt="Birth year" /> Birth year
          </div>
          <div class="item__value">{{character.birth_year}}</div>
        </li>
        <li class="item">
          <div class="item__prop">
            <img src="@/assets/species-icon.svg" alt="Species" /> Species
          </div>
          <div class="item__value">{{character.species}}</div>
        </li>
        <li class="item">
          <div class="item__prop">
            <img src="@/assets/gender-icon.svg" alt="Gender" /> Gender
          </div>
          <div class="item__value">{{character.gender}}</div>
        </li>
        <li class="item">
          <div class="item__prop">
            <img src="@/assets/homeworld-icon.svg" alt="Homeworld" /> Homeworld
          </div>
          <div class="item__value">{{character.homeworld}}</div>
        </li>
        <li>
          <div class="prop-film">
            <img src="@/assets/films-icon.svg" alt="Films" /> Films
          </div>
          <div class="value-film" v-for="film of character.films" :key="film">{{film}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters([`character`,`currentColorAvatar`])
  },
  methods: {
    toggleModal() {
      this.$store.dispatch(`toggleModal`, true);
    }
  }
};
</script>
<style scoped lang="scss">
.hidden {
  display: none;
}
.modal {
  .overlay {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    display: block;
    background-color: rgba(0, 0, 0, 0.65);
    position: fixed;
    cursor: default;
  }

  .popup {
    display: block;
    opacity: 1;
    position: fixed;
    top: 0;
    right: 0;
    right: 0;
    left: 0;
    bottom: 0;
    font-size: 14px;
    z-index: 20;
    margin: 0;
    padding: 24px;
    background: $color-bg;
    color: $color-text;
    border-radius: 4px;

    @media (min-width: 768px) {
      top: 20%;
      bottom: 20%;
      margin: 0 auto;
      padding-left: 80px;
      padding-right: 80px;
      min-width: 320px;
      max-width: 600px;
      min-height: max-content;
    }

    &__close {
      position: absolute;
      top: 22px;
      right: 22px;
      width: 12px;
      height: 12px;
      font-size: 20px;
      color: white;
      text-decoration: none;
      cursor: pointer;
    }

    &__header {
      display: flex;
      margin-top: 40px;
      line-height: 80px;
      padding-bottom: 48px;
      border-bottom: 2px solid $color-text;

      .avatar {
        position: relative;
        display: block;
        background: $color-avatar;
        width: 80px;
        height: 80px;
        border-radius: 50%;

        &__text {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          text-align: center;
          color: white;
          font-style: normal;
          font-size: 48px;
        }
      }

      .header-title {
        flex-grow: 1;
        padding-left: 20px;
        font-size: 22px;
        color: #ffffff;
        font-weight: bold;
      }
    }

    .popup__details {
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: 20px;
      width: 100%;
      font-size: 16px;
      padding-top: 40px;
      padding-inline-start: 0;
      list-style-type: none;

      @media (min-width: 768px) {
        grid-template-columns: 1fr 1fr;
      }

      .item {
        display: flex;
        line-height: 40px;

        .item__prop {
          width: 50%;
          line-height: 40px;

          img {
            margin-right: 10px;
          }
        }

        .item__value {
          width: 50%;
          color: white;
          font-weight: bold;
        }
      }
    }
  }
  .value-film {
    color: white;
    font-weight: bold;
  }
  .prop-film {
    width: 50%;
    line-height: 40px;

    img {
      margin-right: 10px;
    }
  }
}
</style>