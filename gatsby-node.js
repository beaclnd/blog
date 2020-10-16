const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const allMarkdownRemark = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
        
      }
    `
  )
  const allMarkdownRemarkGroupByTag = await graphql(
    `
      {
        allMarkdownRemark {
          group(field: frontmatter___tags) {
            tag: fieldValue
            totalCount
          }
        }
      }
    `
  ) 

  if (allMarkdownRemark.errors) {
    throw allMarkdownRemark.errors
  }
  if (allMarkdownRemarkGroupByTag.errors) {
    throw allMarkdownRemarkGroupByTag.errors;
  }

  const posts = allMarkdownRemark.data.allMarkdownRemark.edges;
  const tags = allMarkdownRemarkGroupByTag.data.allMarkdownRemark.group;

  // Create blog posts pagination list pages
  const perPage = 8;
  const totalPage = Math.ceil(posts.length / perPage);
  for (let i = 1; i <= totalPage; i++) {
    createPage({
      path: `/pagination/${i}`,
      component: path.resolve("./src/templates/blog-list.js"),
      context: {
        totalPage,
        currentPageNum: i,
        limit: perPage,
        skip: (i - 1) * perPage,
      },
    });
  }

  // Create blog posts pages.
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })

  // Create posts by tagged pagination list pages
  tags.forEach((tag) => {
    const perPage = 8;
    const totalPage = Math.ceil(tag.totalCount / perPage);
    for (let i = 1; i <= totalPage; i++) {
      createPage({
        path: `/tags/${tag.tag}/pagination/${i}`,
        component: path.resolve("./src/templates/blog-posts-grouped-by-tag-list.js"),
        context: {
          tag: tag.tag,
          totalCount: tag.totalCount,
          totalPage,
          currentPageNum: i,
          limit: perPage,
          skip: (i - 1) * perPage,
        },
      });
    }
  });
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
