import type { MDXInstance } from "astro";

export type Post = MDXInstance<PostFrontmatter>;

export type PostFrontmatter = {
    title: string,
    date: string,
}
