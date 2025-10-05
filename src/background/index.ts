browser.runtime.onMessage.addListener(
  (message: { blob?: Blob; fileName: string }) => {
    if (message.blob) {
      console.log(URL.createObjectURL(message.blob));
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

(async () => {
  browser.storage.onChanged.addListener(
    (changes: browser.storage.StorageChange) => {
      // We only care about updating the settings
      if (!changes.newValue.settings) return;
      browser.tabs.query({ status: "complete", active: true }).then((tabs) => {
        tabs.forEach((tab) => {
          browser.tabs.sendMessage(tab.id || 0, "").catch(() => {});
        });
      });
    }
  );
})();
