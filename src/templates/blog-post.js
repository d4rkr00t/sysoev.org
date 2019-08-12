import React from "react";
import { graphql, Link } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

export default function Post({ data: { mdx } }) {
  return (
    <article className="blog-post">
      <div className="blog-post__top-nav">
        <Link to="/">← Back to home</Link>
      </div>

      <header>
        <h1>{mdx.frontmatter.title}</h1>

        <div className="blog-post__meta">
          <span className="blog-post__meta-item">{mdx.frontmatter.date}</span>
          <span className="blog-post__meta-item">
            {mdx.frontmatter.category}
          </span>
        </div>
      </header>

      <div className="blog-post__body">
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </div>

      <footer className="blog-post__footer">
        <div className="blog-post__footer-links">
          <a
            href={`https://mobile.twitter.com/search?q=${encodeURIComponent(
              `https://sysoev.org/${mdx.fields.slug}`
            )}`}
          >
            Discuss on Twitter
          </a>
          <a href={mdx.fields.editUrl}>Edit on GitHub</a>
        </div>
      </footer>
    </article>
  );
}

export const pageQuery = graphql`
  query($id: String!) {
    mdx(fields: { id: { eq: $id } }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        category
      }
      body
      fields {
        editUrl
        slug
      }
    }
  }
`;
