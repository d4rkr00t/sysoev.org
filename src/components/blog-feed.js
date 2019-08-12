import React from "react";
import { Link } from "gatsby";

export const BlogFeed = ({ data }) => {
  if (!data || !data.length) {
    return null;
  }

  return (
    <div className="blog-feed">
      <h2 className="blog-feed__title">Blogs:</h2>
      <ul>
        {data.map(item => (
          <BlogFeedItem key={item.node.id} node={item.node} />
        ))}
      </ul>
    </div>
  );
};

export const BlogFeedItem = ({ node }) => {
  return (
    <li>
      <div className="blog-feed__item">
        <Link to={"/" + node.fields.slug}>{node.frontmatter.title}</Link>
      </div>
      <span className="blog-feed__item-category">
        {node.frontmatter.category}
      </span>
    </li>
  );
};
