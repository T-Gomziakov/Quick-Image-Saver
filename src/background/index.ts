browser.runtime.onMessage.addListener(
  (message: { blob?: Blob; fileName: string }) => {
    if (message.blob) {
      // We have a blob to work with- do the download
      browser.downloads.download({
        url: URL.createObjectURL(message.blob),
        // TODO: get the proper filename
        filename: message.fileName.substring(0, 64).replace("/", ".") + ".png",
        // Fine solution, as these names are generated from URLs
        conflictAction: "overwrite",
      });
    }
  }
);
// Send a message every time the user updates settings to indicate that settings re-fetch is needed
(async () => {
  browser.storage.onChanged.addListener(
    (changes: { [key: string]: browser.storage.StorageChange }) => {
      // We only care about updating the settings
      if (!changes.settings) return;
      browser.tabs.query({}).then((tabs) => {
        tabs.forEach((tab) => {
          browser.tabs.sendMessage(tab.id || 0, "").catch(() => {});
        });
      });
    }
  );
})();
