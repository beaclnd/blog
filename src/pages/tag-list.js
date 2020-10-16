// Gatsby supports TypeScript natively!
import React from "react"
import { Link, graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags } from "@fortawesome/free-solid-svg-icons" ;

const TagListPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const tags = data.allMarkdownRemark.group;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={siteTitle} />
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        marginBottom: rhythm(1) 
      }}>
        <FontAwesomeIcon icon={faTags} style={{ 
          fontSize: rhythm(0.85), 
          marginRight: rhythm(0.3),
          color: "#454545" 
        }} />
        <h3 style={{ fontSize: rhythm(0.8), marginTop: 0, marginBottom: 0 }}>
          {"所有标签"}
        </h3>
      </div>
      <section style={{ display: "flex", flexWrap: "wrap", marginTop: rhythm(-0.5)}}>
        {
          tags.map((tag, i) => (
            <div key={tag.tag} style={{ display: "flex", alignItems: "center", marginRight: rhythm(1), marginTop: rhythm(0.5) }}>
              <Link to={`/tags/${tag.tag}/pagination/1`} className="tagName" style={{ 
                ...scale(-1/2.13),
                paddingRight: rhythm(1/3), 
                paddingLeft: rhythm(1/3), 
                paddingTop: rhythm(1/6), 
                paddingBottom: rhythm(1/6), 
                outline: "solid",
                outlineColor: "#4d4d4d",
                outlineWidth: rhythm(0.069),
              }}>
                {tag.tag}
              </Link>
              <div style={{
                ...scale(-1/5.5),
                display: "inline-block",
                minWidth: rhythm(1),
                color: "#ffffff",
                backgroundColor: "#646464",
                paddingTop: rhythm(0.01),
                paddingBottom: rhythm(0.01),
                paddingLeft: rhythm(0.2),
                paddingRight: rhythm(0.2),
                borderRadius: rhythm(0.2),
                textAlign: "center",
                zIndex: 1,
              }}>
                {`${tag.totalCount}篇`}
              </div>
            </div>
          ))
        }
      </section>
      <hr style={{ marginTop: rhythm(8) }} />
      <Bio style={{ marginTop: rhythm(1) }}/>
    </Layout>
  )
}

export default TagListPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark {
      group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
    }
  }
`
