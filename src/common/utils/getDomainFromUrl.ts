export function getDomainFromUrl(urlString?: string) {
  try {
    if (urlString) {
      const { hostname } = new URL(urlString);
      return hostname.replace(/^www\./, "");
    }
  } catch {
    // Если URL некорректный или пустой
    return urlString;
  }
}
