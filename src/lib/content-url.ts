export function hasCanonicalUrlShape(value: string) {
  try {
    return new URL(value).search === "";
  } catch {
    return false;
  }
}
