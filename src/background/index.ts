browser.runtime.onMessage.addListener(
  (message: { blob?: Blob; fileName: string }) => {
    if (message.blob) {
      // We have a blob to work with- do the download
      browser.downloads.download({
        url: URL.createObjectURL(message.blob),
        // TODO: get the proper filename
        filename: message.fileName + ".png",
        // Fine solution, as these names are generated from URLs
        conflictAction: "overwrite",
      });
    }
  }
);
