import { MouseButtons, type UserSettings } from "../../Types/UserSettings";
import downloadFromUrl from "../utils/downloadFromUrl";

export default function listenToClicks(Settings: UserSettings): () => void {
  function clickListener(event: MouseEvent) {
    // Check if the clicked element is an image
    if (!(event.target instanceof HTMLImageElement)) return;
    // Check if event was pressed with the correct buttons
    if (
      !(
        event.button === MouseButtons[Settings.inputSettings.mouseButton] &&
        Settings.inputSettings.keyboardButtons?.every((kBtn) => event[kBtn])
      )
    )
      return;
    // We respected the settings and have an image to work with, do the download
    event.preventDefault();
    event.stopPropagation();
    downloadFromUrl(event.target.src);
  }
  document.addEventListener("click", clickListener, true);
  // Return a function to remove this listener
  return () => document.removeEventListener("click", clickListener, true);
}
