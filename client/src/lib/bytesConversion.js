export default function convertBytes(bytes) {
  if (bytes >= 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  } else if (bytes >= Math.pow(1024, 2)) {
    return `${Math.round(bytes / Math.pow(1024, 2))} MB`;
  } else if (bytes >= Math.pow(1024, 3)) {
    return `${Math.round(bytes / Math.pow(1024, 3))} GB`;
  }
  return `${bytes} B`;
}
