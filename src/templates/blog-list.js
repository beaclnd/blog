import React from "react"
import { Link, graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import FrontMatter from "../components/frontMatter"

const BlogPaginationTemplate = ({ data, pageContext, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const coverImage = data.coverImage.childImageSharp.fluid;
  const {totalPage, currentPageNum} = pageContext;
  const isFirst = currentPageNum === 1;
  const isLast = currentPageNum === totalPage;

  return (
    <Layout  location={location} title={siteTitle}>
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
      <ul style={{
        listStyle: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <Link 
          style={{
            marginRight: "auto",
            pointerEvents: isFirst ? "none" : "auto", 
            textDecoration: "none",
            color: isFirst ? "grey" : "",
          }} 
          to={`/pagination/${currentPageNum - 1}`}
        >
          {"← 前一页"}
        </Link>
        {
            Array.from({length: totalPage}, (_, i) => (
                <li 
                  key={`page-${i}`}
                  style={{margin: 0}}
                >
                    <Link style={{
                        padding: rhythm(1/4),
                        color: currentPageNum === i + 1 ? "#ffffff" : "",
                        background: currentPageNum === i + 1 ? "#007acc" : "",
                    }} to={`/pagination/${i + 1}`}>{i + 1}</Link>
                </li>
            ))
        }
        <Link 
          style={{
            marginLeft: "auto",
            pointerEvents: isLast ? "none" : "auto", 
            textDecoration: "none",
            color: isLast ? "grey" : "",
          }} 
          to={`/pagination/${currentPageNum + 1}`}
        >
            {"后一页 →"}
        </Link>
      </ul>
    </Layout>
  )
}

export default BlogPaginationTemplate;

export const pageQuery = graphql`
  query BlogPostPagination($limit: Int!, $skip: Int!) {
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
    allMarkdownRemark(limit: $limit, skip: $skip, sort: { fields: [frontmatter___date], order: DESC }) {
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
