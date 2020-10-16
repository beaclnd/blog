import React from "react"
import { Link, graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCalendarAlt } from "@fortawesome/free-regular-svg-icons" ;
import { faTags } from "@fortawesome/free-solid-svg-icons" ;

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { name: authorName, summary: authorSummary  } = data.site.siteMetadata.author;
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: rhythm(0.5),
            }}
          >
            {post.frontmatter.title}
          </h1>
          <section style={{ 
              display: "flex", 
              flexWrap: "wrap", 
              alignItems: "center", 
              marginBottom: rhythm(0.5), 
            }}
          >
            <Bio Description={
              <span style={{...scale(-1 / 5)}}>{`by ${authorName}`}</span>
            } 
              style={{ marginBottom: 0 }} 
            />
            <div style={{ ...scale(-1 / 5), marginLeft: rhythm(0.5), marginTop: rhythm(0.05), display: "flex", alignItems: "center" }}>
              <FontAwesomeIcon icon={faCalendarAlt} style={{ 
                fontSize: rhythm(0.68), 
                marginRight: rhythm(0.2)
              }} />
              <span>{post.frontmatter.date}</span>
            </div>
            <div style={{...scale(-1 / 5), marginLeft: "auto", marginTop: rhythm(0.05), display: "flex", alignItems: "center"}}>
              <FontAwesomeIcon icon={faClock} style={{ 
                fontSize: rhythm(0.68), 
                marginRight: rhythm(0.2)
              }} />
              <span>{post.fields.readingTime.text}</span>
            </div>
          </section>
          { post.frontmatter.tags && 
            <section style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              marginBottom: rhythm(1), 
              marginTop: rhythm(-0.5),
            }}>
              <Link to="/tag-list" style={{ 
                boxShadow: "none", 
                marginTop: rhythm(0.5), 
                marginRight: rhythm(0.5),
                paddingTop: rhythm(0.2),
              }}>
                <FontAwesomeIcon className="tagIcon" icon={faTags} style={{ fontSize: rhythm(0.85) }} />
              </Link>
              { post.frontmatter.tags.map((tag, i) => (
                <small 
                  key={`${post.id}-${i}`}
                  className="tagName" 
                  style={{ 
                    ...scale(-1/2.13),
                    paddingRight: rhythm(1/3), 
                    paddingLeft: rhythm(1/3), 
                    paddingTop: rhythm(1/6), 
                    paddingBottom: rhythm(1/6), 
                    marginRight: rhythm(0.5),
                    marginTop: rhythm(0.5),
                    outline: "solid",
                    outlineColor: "#4d4d4d",
                    outlineWidth: rhythm(0.069),
                }}>
                  <Link to={`/tags/${tag}/pagination/1`} style={{ boxShadow: "none", color: "inherit" }} >
                      {tag}
                  </Link>
                </small>
              ))}
            </section>
          }
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <Bio Description={
            <div style={{ textAlign: "center" }} >
              <p style={{marginBottom: 0}}>
                Written by <strong>{authorName}</strong> {authorSummary}
              </p>
              <p style={{marginBottom: 0}}>
                Email: beaclnd92@gmail.com
              </p>
            </div>
          }/>
        </footer>
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author {
          name
          summary
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "YYYY/MM/DD")
        description
        tags
      }
      fields {
        readingTime {
          text
        }
      }
    }
  }
`
