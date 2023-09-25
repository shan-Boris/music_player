<template>
  <div class="slider">
    <div class="slider__line">
      <div class="slider__active" :style="{ width: valueBar + '%' }"></div>

      <div
        v-if="isNeedDot"
        class="slider__dot"
        :style="{ left: valueBar + '%' }"
      />
    </div>

    <input
      class="slider__input"
      type="range"
      value="valueBar"
      @input="setBar"
    />
  </div>
</template>

<script setup lang="ts">
import { TSideBarEmits, TSideBarProps, TEventTargetInputRange } from "./types";

withDefaults(defineProps<TSideBarProps>(), {
  isNeedDot: false,
});

const emit = defineEmits<TSideBarEmits>();

const setBar = (e: Event) => {
  const { value } = e.target as TEventTargetInputRange;
  emit("onChangeBar", +value);
};
</script>

<style scoped lang="scss">
.slider {
  align-self: stretch;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;

  &__line {
    position: relative;
    width: 100%;
    height: 2px;
    background-color: var(--gray-color);
  }

  &__dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--main-green-color);
    position: absolute;
    top: 0;
    transform: translate(-50%, -45%);
  }

  &__active {
    background-color: var(--main-green-color);
    height: 100%;
  }

  &__input {
    position: absolute;
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 100%;
    background: transparent;
    cursor: inherit;

    &::-webkit-slider-thumb {
      opacity: 0;
    }
  }
}
</style>
