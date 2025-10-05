export default function downloadFromUrl(imageUrl: string) {
  const image = new Image();
  image.src = imageUrl;

  // Wait until the image loads to initiate the download
  image.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(image, 0, 0);

    canvas.toBlob((blob) => {
      browser.runtime.sendMessage({
        blob: blob,
        fileName: window.btoa(imageUrl),
      });
    });
  };
}
