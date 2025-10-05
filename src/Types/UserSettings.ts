export const MouseButtons = {
  // Map names to MouseEvent.button; see https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
  leftClick: 0,
  middleClick: 1,
  rightClick: 2,
};

export const KEYBOARD_BUTTONS = [
  "altKey",
  "shiftKey",
  "ctrlKey",
  "metaKey",
] as const;
export type KeyboardButtons = typeof KEYBOARD_BUTTONS;

export type InputSettings = {
  mouseButton: keyof typeof MouseButtons;
  keyboardButtons?: Array<KeyboardButtons[number]>;
};

export type DownloadButtonSettings = {
  isEnabled: boolean;
};

export type UserSettings = {
  inputSettings: InputSettings;
  downloadButtonSettings: DownloadButtonSettings;
};
