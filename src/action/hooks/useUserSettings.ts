import { useEffect, useState } from "react";
import getUserSettings from "../../shared/getUserSettings";
import type {
  KeyboardButtons,
  MouseButtons,
  UserSettings,
} from "../../Types/UserSettings";

export default function useUserSettings() {
  // See which mouse button has been selected
  const [mouseButton, setMouseButton] = useState<keyof typeof MouseButtons>();
  const [keyboardButtons, setKeyboardButtons] =
    useState<Array<KeyboardButtons[number]>>();
  function userSettingsListener() {
    (async () => {
      const userSettings = await getUserSettings();
      setMouseButton(userSettings.inputSettings.mouseButton);
      setKeyboardButtons(userSettings.inputSettings.keyboardButtons);
    })();
  }
  useEffect(() => {
    userSettingsListener();
    browser.storage.local.onChanged.addListener(userSettingsListener);
    return browser.storage.local.onChanged.removeListener(userSettingsListener);
  }, []);

  async function updateMouseButton(newMouseButton: keyof typeof MouseButtons) {
    setMouseButton(newMouseButton);
    const userSettings = await getUserSettings();
    browser.storage.local.set({
      settings: {
        ...userSettings,
        inputSettings: {
          ...userSettings.inputSettings,
          mouseButton: newMouseButton,
        },
      } as UserSettings,
    });
  }

  async function updateKeyboardButtons(
    newKeyboardButtons: Array<KeyboardButtons[number]>
  ) {
    setKeyboardButtons(newKeyboardButtons);
    const userSettings = await getUserSettings();
    browser.storage.local.set({
      settings: {
        ...userSettings,
        inputSettings: {
          ...userSettings.inputSettings,
          keyboardButtons: newKeyboardButtons,
        },
      } as UserSettings,
    });
  }

  return [
    mouseButton,
    updateMouseButton,
    keyboardButtons,
    updateKeyboardButtons,
  ] as const;
}
