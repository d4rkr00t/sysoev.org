import type { Post } from "../types";
import { getSafeKeys } from "./get-save-keys";

export type PostData = {
  url?: string,
  title: string,
  date: Date,
  year: number
}

export function getWritingsByYear(posts: Array<Post>) {
  let groups: Record<number, Array<PostData>> = {};
  for (let post of posts) {
    let postData = {
      url: post.url,
      title: post.frontmatter.title,
      date: new Date(post.frontmatter.date),
      year: new Date(post.frontmatter.date).getFullYear(),
    };
    groups[postData.year] = groups[postData.year] || [];
    groups[postData.year].push(postData);
  }
  let result: Array<{ year: number, writings: Array<PostData> }> = [];
  for (let group of getSafeKeys(groups)) {
    groups[group].sort((a, b) => (b.date > a.date ? 1 : -1));
    result.push({ year: +group, writings: groups[group] });
  }
  result.sort((a, b) => b.year - a.year);
  return result;
}
