module.exports = createTypes => {
    const typeDefs = `
      type MarkdownRemark implements Node {
        frontmatter: MyFrontmatter
      }
      type MyFrontmatter {
        title: String
        date(formatString: String): Date
        author: String
      }
    `;
    createTypes(typeDefs)
}