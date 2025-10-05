import getUserSettings from "../shared/getUserSettings";
import type { UserSettings } from "../Types/UserSettings";
import listenToClicks from "./eventListeners/click";
import listenToHovers from "./eventListeners/hover";

function setListeners(userSettings: UserSettings) {
  const detachableListeners: Array<() => void> = [];
  detachableListeners.push(listenToClicks(userSettings));
  detachableListeners.push(listenToHovers(userSettings));
  return detachableListeners;
}

(async () => {
  // Get Settings
  let settings = await getUserSettings();
  // Set Listeners
  let detachableListeners = setListeners(settings);
  // If there is an update, remove old listeners, Get Settings, Set Listeners
  browser.runtime.onMessage.addListener(() => {
    (async () => {
      for (const detachFunction of detachableListeners) {
        detachFunction();
      }
      settings = await getUserSettings();
      detachableListeners = setListeners(settings);
    })();
  });
})();
