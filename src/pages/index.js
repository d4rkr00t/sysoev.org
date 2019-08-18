import React from "react";
import { graphql } from "gatsby";
import SEO from "../components/seo";
import { BlogFeed } from "../components/blog-feed";

const IndexPage = ({ data: { allMdx } }) => (
  <div className="main-info-container">
    <SEO title="Personal Website and Blog" />
    <div className="main-info">
      <h1 className="main-info__title">
        <b>Stanislav</b> Sysoev.
      </h1>
      <div className="main-info__text">
        <b>Front-End&nbsp;developer.</b> Passioned about JavaScript, NodeJS,
        Functional Programming and Developer&nbsp;Tools.
        Currently&nbsp;working&nbsp;at&nbsp;
        <a href="https://atlassian.com">Atlassian</a>.
      </div>
      <ul className="main-info__contacts">
        <li className="main-info__contact-item">
          <a href="mailto:d4rkr00t@gmail.com">Email</a>
        </li>
        <li className="main-info__contact-item">
          <a href="https://www.linkedin.com/in/stanislav-sysoev-15546236/">
            Resume
          </a>
        </li>
        <li className="main-info__contact-item">
          <a href="https://github.com/d4rkr00t">GitHub</a>
        </li>
        <li className="main-info__contact-item">
          <a href="https://twitter.com/d4rkr00t">Twitter</a>
        </li>
        <li className="main-info__contact-item">
          <a href="https://soundcloud.com/s7at1c/tracks">Music</a>
        </li>
      </ul>
    </div>
    <BlogFeed data={allMdx.edges} />
  </div>
);

export default IndexPage;

export const pageQuery = graphql`
  query {
    allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            category
            title
            date
          }
        }
      }
    }
  }
`;
