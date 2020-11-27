const blobToFile = (blob: Blob, fileName: string): File => {
  let b: any = blob;
  b.lastModifiedDate = new Date();
  b.name = fileName;

  return blob as File;
};

export default function resizeImage(
  file: File,
  maxSize: number
): Promise<File> {
  return new Promise<File>((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const width = image.width;
      const height = image.height;

      if (width <= maxSize && height <= maxSize) {
        resolve(file);
      }

      const maxDimension = Math.max(width, height);
      const scaleFactor = maxSize / maxDimension;
      const newWidth = width * scaleFactor;
      const newHeight = height * scaleFactor;

      const canvas = document.createElement("canvas");
      canvas.width = newWidth;
      canvas.height = newHeight;

      const context = canvas.getContext("2d");
      if (!context) {
        reject("no canvas context");
      } else {
        context.drawImage(image, 0, 0, newWidth, newHeight);
        canvas.toBlob(
          (x) => resolve(x === null ? undefined : blobToFile(x, "upload.jpg")),
          "image/jpeg"
        );
      }
    };
    image.onerror = reject;
    image.src = URL.createObjectURL(file);
  });
}
