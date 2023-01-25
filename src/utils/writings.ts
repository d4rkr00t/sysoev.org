import type { CollectionEntry } from "astro:content";
import { getSafeKeys } from "./get-save-keys";

export type PostData = {
  slug: string;
  title: string;
  date: Date;
  year: number;
};

export function getWritingsByYear(posts: Array<CollectionEntry<"blog">>) {
  let groups: Record<number, Array<PostData>> = {};
  for (let post of posts) {
    let postData = {
      slug: post.slug,
      title: post.data.title,
      date: post.data.date,
      year: post.data.date.getFullYear(),
    };
    groups[postData.year] = groups[postData.year] || [];
    groups[postData.year].push(postData);
  }
  let result: Array<{ year: number; writings: Array<PostData> }> = [];
  for (let group of getSafeKeys(groups)) {
    groups[group].sort((a, b) => (b.date > a.date ? 1 : -1));
    result.push({ year: +group, writings: groups[group] });
  }
  result.sort((a, b) => b.year - a.year);
  return result;
}
