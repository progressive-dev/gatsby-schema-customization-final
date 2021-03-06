const path = require('path');
const customizeMarkdownRemark = require('./src/gatsby/customize-markdown-remark');
const { createFilePath } = require('gatsby-source-filesystem');

module.exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

module.exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const result = await graphql(`
      query {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `)

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/blog-post.js`),
          context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.fields.slug,
          },
      })
    })
  }

  module.exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions

    customizeMarkdownRemark(createTypes);
  }