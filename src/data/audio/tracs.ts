import { TTrack } from "./types";
import heyAudio from "../../../public/audio/hey.mp3";
import heyCover from "../../../public/covers/hey.webp";
import allthatAudio from "../../../public/audio/allthat.mp3";
import allthatCover from "../../../public/covers/allthat.webp";
import ukuleleAudio from "../../../public/audio/ukulele.mp3";
import ukuleleCover from "../../../public/covers/ukulele.webp";

export const TRACKS: TTrack[] = [
  {
    file: heyAudio,
    cover: heyCover,
    name: "Hey!",
  },
  {
    file: allthatAudio,
    cover: allthatCover,
    name: "All That",
  },
  {
    file: ukuleleAudio,
    cover: ukuleleCover,
    name: "Ukulele",
  },
];
