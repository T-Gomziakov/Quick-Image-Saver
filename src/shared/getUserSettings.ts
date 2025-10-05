import type { InputSettings, UserSettings } from "../Types/UserSettings";
// TODO, make initialization of settings separate
export default async function getUserSettings(): Promise<UserSettings> {
  const userSettings = (await browser.storage.local.get("settings")).settings;
  let inputSettings = userSettings?.inputSettings as InputSettings;
  if (!inputSettings) {
    // Initialize the default settings
    inputSettings = {
      mouseButton: "leftClick",
      keyboardButtons: ["ctrlKey"],
    };
    browser.storage.local.set({
      settings: {
        downloadButtonSettings: { isEnabled: true },
        ...userSettings,
        inputSettings: inputSettings,
      } as UserSettings,
    });
  }
  return {
    ...userSettings,
    inputSettings: inputSettings,
  } as UserSettings;
}
