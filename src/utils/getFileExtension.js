export const getFileExtension = (url) => {
  const parts = url.split('.');
  const lastPart = parts[parts.length - 1];
  return lastPart.split('?')[0].split('%')[0];
};
