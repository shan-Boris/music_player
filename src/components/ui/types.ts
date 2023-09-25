export type TSideBarProps = {
  valueBar: number;
  isNeedDot?: boolean;
};

export type TSideBarEmits = {
  (e: "onChangeBar", value: number): void;
};

export type TEventTargetInputRange = EventTarget & {
  value: string;
};
