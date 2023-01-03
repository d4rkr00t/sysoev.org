export function createEditOnGithubLink(pathname: string): string {
  const cleanPathName = pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;
  return (
    "https://github.com/d4rkr00t/sysoev.org/edit/master/pages" +
    cleanPathName +
    ".mdx"
  );
}
