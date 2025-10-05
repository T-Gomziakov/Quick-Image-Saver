import type { UserSettings } from "../Types/UserSettings";
import initializeDefaultSettings from "./initializeDefaultSettings";
// TODO, make initialization of settings separate
export default async function getUserSettings(): Promise<UserSettings> {
  const userSettings = (await browser.storage.local.get("settings")).settings;
  let inputSettings = userSettings;
  if (!inputSettings) {
    // Initialize the default settings
    inputSettings = initializeDefaultSettings();
    browser.storage.local.set({
      settings: inputSettings,
    });
  }
  return inputSettings as UserSettings;
}
