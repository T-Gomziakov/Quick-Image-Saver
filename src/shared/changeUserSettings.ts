import type { UserSettings } from "../Types/UserSettings";
// Some short functions to update specific entries in the settings object
// Note: doesn't update the storage area

/**
 * Changes the mouse button entry inside the provided UserSettings
 */
export function changeMouseButton(
  settings: UserSettings,
  mouseButton: UserSettings["inputSettings"]["mouseButton"]
): UserSettings {
  return {
    ...settings,
    inputSettings: { ...settings.inputSettings, mouseButton: mouseButton },
  } as UserSettings;
}
/**
 * Changes the keyboard buttons entry inside the provided UserSettings
 */
export function changeKeyboardButtons(
  settings: UserSettings,
  keyboardButtons: UserSettings["inputSettings"]["keyboardButtons"]
): UserSettings {
  return {
    ...settings,
    inputSettings: {
      ...settings.inputSettings,
      keyboardButtons: keyboardButtons,
    },
  } as UserSettings;
}
/**
 * Changes the download button entry inside the provided UserSettings
 */
export function changeDownloadButton(
  settings: UserSettings,
  isEnabled: UserSettings["downloadButtonSettings"]["isEnabled"]
): UserSettings {
  return { ...settings, downloadButtonSettings: { isEnabled: isEnabled } };
}
