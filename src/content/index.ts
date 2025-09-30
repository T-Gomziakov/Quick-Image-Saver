import { InputSettings, MouseButtons } from "../Types/UserSettings";

function ListenToClicks(Settings: { InputSettings: InputSettings }) {
  document.addEventListener(
    "click",
    (event: MouseEvent) => {
      // Check if event was pressed with the correct buttons
      if (
        !(
          event.button === MouseButtons[Settings.InputSettings.mouseButton] &&
          Settings.InputSettings.keyboardButtons?.every((kBtn) => event[kBtn])
        )
      )
        return;
      // Check if the clicked element is an image
      if (!(event.target instanceof HTMLImageElement)) return;
      // We respected the settings, do the download
      event.preventDefault();
      event.stopPropagation();
      const image = new Image();
      image.src = event.target.src;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      ctx?.drawImage(image, 0, 0);

      canvas.toBlob((blob) => {
        browser.runtime.sendMessage({
          blob: blob,
          fileName: window.btoa((event.target as HTMLImageElement).src),
        });
      });
    },
    true
  );
}

function ListenToHovers() {
  // Create the button element so that we don't have to re-render it every time we move the mouse on the image
  const btn = document.createElement("button");
  btn.innerText = "Download";
  document.addEventListener("mousemove", (event: MouseEvent) => {
    // Check if we are hovering over an image
    if (!(event.target instanceof HTMLImageElement)) return;
    // Get image dimensions
    const { left, right, top, bottom } = event.target.getBoundingClientRect();

    // Calculate where to place the button

    // Apend to body if it didn't exist in DOM
  });
}

// load settings
(async () => {
  let mouseSettings = (await browser.storage.local.get("settings"))
    .mouseSettings as InputSettings;
  if (!mouseSettings) {
    // Initialize the default settings
    mouseSettings = {
      mouseButton: "leftClick",
      keyboardButtons: ["ctrlKey"],
    };
  }
  ListenToClicks({ InputSettings: mouseSettings });
  ListenToHovers();
})();
