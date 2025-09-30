export const MouseButtons = {
  // Map names to MouseEvent.button; see https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
  leftClick: 0,
  rightClick: 2,
};

export type KeyboardButtons = ["altKey", "shiftKey", "ctrlKey", "metaKey"];

export type InputSettings = {
  mouseButton: keyof typeof MouseButtons;
  keyboardButtons?: Array<KeyboardButtons[number]>;
};
