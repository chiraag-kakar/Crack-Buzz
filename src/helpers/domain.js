export function getHostName(url) {
  return new URL(url).hostname;
}
