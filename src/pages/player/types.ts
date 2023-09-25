import { ComputedRef } from "vue";

export type TAudioTarget = EventTarget & {
  duration: number | false;
  currentTime: number;
};

export type TSetTrack = (
  direction: "next" | "prev",
  playNext?: boolean
) => void;

export type TPlayBtn = ComputedRef<{
  icon: string;
  title: string;
}>;
