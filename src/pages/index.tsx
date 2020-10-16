// Gatsby supports TypeScript natively!
import React from "react"
import { Link, graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import FrontMatter from "../components/frontMatter"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const coverImage = data.coverImage.childImageSharp.fluid;

  return (
    <Layout coverImage={coverImage} location={location} title={siteTitle}>
      <SEO title={siteTitle} />
      <Bio />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article key={node.fields.slug}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ 
                  boxShadow: `none`,
                  color: "#494343" 
                }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <FrontMatter node={node} />
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
          </article>
        )
      })}
      <h3 style={{ marginBottom: rhythm(3.5) }}>
        <Link style={{
          boxShadow: "none",
          color: "#090704",
          fontStyle: "italic",
          letterSpacing: rhythm(0.13),
        }} to="/pagination/1">
          {"更多内容......"}
        </Link>
      </h3>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    coverImage: file(
      relativePath: { regex: "/cover.jpg/" }
    ) {
      childImageSharp {
        fluid(maxHeight: 425, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 3, sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY/MM/DD")
            title
            description
            tags
          }
        }
      }
    }
  }
`
