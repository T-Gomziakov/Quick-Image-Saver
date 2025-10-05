import type { UserSettings } from "../Types/UserSettings";

export default function initializeDefaultSettings() {
  const settings: UserSettings = {
    inputSettings: { mouseButton: "leftClick", keyboardButtons: ["ctrlKey"] },
    downloadButtonSettings: { isEnabled: false },
  };
  return settings;
}
