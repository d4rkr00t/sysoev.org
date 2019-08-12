let path = require("path");

exports.createPages = async ({ actions, graphql }) => {
  let { createPage } = actions;
  let blogs = await graphql(`
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
              tags
              date
            }
          }
        }
      }
    }
  `);

  blogs.data.allMdx.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        id: node.id
      }
    });
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  let { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    let title = node.frontmatter.title;
    createNodeField({
      name: "id",
      node,
      value: node.id
    });

    createNodeField({
      name: "slug",
      node,
      value:
        "blog/" +
        title
          .toLowerCase()
          .split(" ")
          .join("-")
    });

    let relativePath = path.relative(__dirname, node.fileAbsolutePath);
    createNodeField({
      node,
      name: "editUrl",
      value: `https://github.com/d4rkr00t/sysoev.org/edit/master/${relativePath}`
    });
  }
};
