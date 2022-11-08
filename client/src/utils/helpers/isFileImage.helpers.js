export default function isFileImage(image) {
  const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

  return image && acceptedImageTypes.includes(image.type);
}
