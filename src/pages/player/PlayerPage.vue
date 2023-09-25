<template>
  <div class="wrapper">
    <img src="@/assets/img/backgroundImage.svg" alt="Логотип" />

    <div class="player">
      <div class="player__box">
        <audio
          ref="audio"
          :src="activeAudioUrl"
          @timeupdate="updateProgress"
          @canplay="autoPlay"
          @ended="setTrack('next', true)"
        ></audio>

        <img
          class="player__cover"
          :class="{
            player__cover_animationPause: !isPlay,
            player__cover_animationReset: isAnimationReset,
          }"
          :src="activeCoverUrl"
          :alt="activeTrackName"
        />

        <div class="content">
          <img
            class="content__prevBtn clickElement"
            src="@/assets/icons/prevBtn.svg"
            alt="Предыдущий трек"
            title="Предыдущий трек"
            @click="setTrack('prev')"
          />

          <img
            class="content__playPause clickElement"
            :src="playBtn.icon"
            :alt="playBtn.title"
            :title="playBtn.title"
            @click="togglePlay"
          />

          <img
            class="content__nextBtn clickElement"
            src="@/assets/icons/nextBtn.svg"
            alt="Следующий трек"
            title="Следующий трек"
            @click="setTrack('next')"
          />

          <div class="content__volume">
            <img
              class="clickElement"
              src="@/assets/icons/volumeNull.svg"
              alt="Громкость 0%"
              title="Убрать громкость"
              @click="setVolume(0)"
            />

            <SliderBar
              title="Изменить громкость"
              :value-bar="volumeBarValue"
              :is-need-dot="true"
              @on-change-bar="setVolume"
            />

            <img
              class="clickElement"
              src="@/assets/icons/volumeFull.svg"
              alt="Громкость 100%"
              title="Сделать громкость 100%"
              @click="setVolume(100)"
            />
          </div>

          <div class="content__title" v-text="activeTrackName" />

          <div class="content__progressBar">
            <SliderBar
              v-if="isPlay"
              title="Перемотать трек"
              :value-bar="progressBarValue"
              @on-change-bar="setProgressBar"
            />
          </div>
        </div>
        <img class="player__logo" src="@/assets/img/logo.svg" alt="Логотип" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import { TRACKS } from "../../data/audio/tracs";

import { TAudioTarget, TSetTrack, TPlayBtn } from "./types";
import SliderBar from "@/components/ui/SliderBar.vue";

import playBtnIcon from "@/assets/icons/playBtn.svg";
import pauseBtnIcon from "@/assets/icons/pauseBtn.svg";

const volumeBarValue = ref(100);
const progressBarValue = ref(0);
const audio = ref<HTMLAudioElement>();
const isPlay = ref(false);
const autoStart = ref(false);
const isAnimationReset = ref(false);
const activeIndTrack = ref(0);

// const getLinkOnSrc = (path: string) => path;

const activeAudioUrl = computed(() => TRACKS[activeIndTrack.value].file);

const activeCoverUrl = computed(() => TRACKS[activeIndTrack.value].cover);

const activeTrackName = computed(() => TRACKS[activeIndTrack.value].name);

const playBtn: TPlayBtn = computed(() =>
  isPlay.value
    ? { icon: pauseBtnIcon, title: "Пауза" }
    : { icon: playBtnIcon, title: "Play" }
);

const setProgressBar = (newValue: number) => {
  if (!audio.value) {
    return;
  }

  audio.value.currentTime = (audio.value.duration * newValue) / 100;
};

const updateProgress = (e: Event) => {
  const { duration, currentTime } = e.target as TAudioTarget;

  if (!duration) return;
  progressBarValue.value = (currentTime * 100) / duration;
};

const autoPlay = () => {
  if (autoStart.value) {
    autoStart.value = false;
    togglePlay();
  }
};

const togglePlay = () => {
  if (audio.value?.paused) {
    isAnimationReset.value = false;

    audio.value.play();

    isPlay.value = true;
  } else {
    audio.value?.pause();

    isPlay.value = false;
  }
};

const setVolume = (newVolume: number) => {
  if (!audio.value) {
    return;
  }

  volumeBarValue.value = newVolume;
  audio.value.volume = newVolume / 100;
};

const setTrack: TSetTrack = (direction, playNext = false) => {
  const isPlayNext = !audio.value?.paused || playNext;

  const lastIndexOfTracks = TRACKS.length - 1;

  if (isPlayNext) {
    autoStart.value = true;
  } else {
    isAnimationReset.value = true;
  }

  if (direction === "next") {
    if (activeIndTrack.value === lastIndexOfTracks) {
      activeIndTrack.value = 0;
    } else {
      activeIndTrack.value++;
    }
  } else {
    if (activeIndTrack.value === 0) {
      activeIndTrack.value = lastIndexOfTracks;
    } else {
      activeIndTrack.value--;
    }
  }

  progressBarValue.value = 0;
};
</script>

<style scoped lang="scss">
.wrapper {
  width: 100vw;
  height: 56.25vw;
  position: relative;
  display: flex;
  justify-content: flex-end;
  position: relative;
}

.player {
  position: absolute;
  top: 35.2%;
  left: 27.4%;
  width: 38.5%;
  height: 29.6%;
  display: flex;
  align-items: center;

  &__box {
    width: 78.4%;
    height: 62.5%;
    background-color: var(--light-gray-color);
    border-radius: 1% / 4%;
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 1);
    position: relative;
  }

  &__cover {
    position: absolute;
    width: 55.2%;
    height: 160%;
    top: -30%;
    right: -28%;
    border-radius: 50%;
    animation: rotatateAnimation 4s linear infinite;

    &_animationPause {
      animation-play-state: paused;
    }

    &_animationReset {
      animation: none !important;
    }
  }

  &__logo {
    position: absolute;
    height: 100%;
    top: 0%;
    left: 24%;
    z-index: 1;
  }
}

.content {
  width: 94%;
  height: 95%;
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  grid-template-rows: repeat(3, 1fr);
  align-items: center;
  margin: 1% 3%;
  z-index: 2;
  position: relative;

  &__prevBtn {
    width: 58%;
    max-width: 54px;
    grid-area: 1 / 1 / 2 / 2;
  }

  &__volume {
    grid-area: 1 / 2 / 2 / 3;
    display: flex;
    align-items: center;
    gap: 8px;
    width: 80%;
  }

  &__playPause {
    grid-area: 2 / 1 / 3 / 2;
    margin-left: -5.5%;
    width: 68%;
    max-width: 64px;
  }

  &__title {
    grid-area: 2 / 2 / 3 / 3;
    padding-right: 25%;
    font-size: 24px;
  }

  &__nextBtn {
    grid-area: 3 / 1 / 4 / 2;
    width: 58%;
    max-width: 54px;
  }

  &__progressBar {
    grid-area: 3 / 2 / 4 / 3;
    width: 85%;
    height: 100%;
    display: flex;
    align-items: center;
  }
}

.clickElement {
  &:hover {
    scale: 1.1;
  }

  &:active {
    scale: 0.9;
  }

  transition: all 0.2s;
}

@keyframes rotatateAnimation {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
