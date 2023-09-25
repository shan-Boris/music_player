<template>
  <div
    @mousedown="showClickImg"
    @mouseup="hideClickImg"
    @mousemove="hideClickImg"
  >
    <PlayerPage />
    <img
      v-if="clickInfo.active"
      id="clickImg"
      :style="clickInfo.style"
      src="../src/assets/icons/clickActive.svg"
      alt="Клик"
    />
  </div>
</template>

<script setup lang="ts">
import PlayerPage from "@/pages/player/PlayerPage.vue";
import { Ref, ref } from "vue";

type TClick = Ref<{
  active: boolean;
  style: { left: string; top: string };
}>;
const clickInfo: TClick = ref({ active: false, style: { left: "", top: "" } });

const showClickImg = (e: MouseEvent) => {
  const clickPlace = {
    left: e.clientX - 22 + "px",
    top: e.clientY - 22 + "px",
  };
  clickInfo.value = {
    active: true,
    style: clickPlace,
  };
};

const hideClickImg = () => {
  clickInfo.value.active = false;
};
</script>

<style lang="scss">
#app {
  text-align: center;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

#clickImg {
  position: absolute;
  width: 3%;
}
</style>
