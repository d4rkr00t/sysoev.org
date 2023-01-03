export function createDicsussOnTwitterLink(value: string): string {
  return `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `https://sysoev.org${value}`
  )}`;
}
