import React from "react"
import { Link } from "gatsby"
import Image from "gatsby-image";
import { rhythm, scale } from "../utils/typography"

const Layout = ({ coverImage, location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          ...scale(1.5),
          position: "absolute",
          top: rhythm(1),
          left: rhythm(2),
          color: "floralwhite",
          width: "-webkit-fill-available",
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    )
  } else {
    header = (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: rhythm(1.5),
          marginLeft: rhythm(2.5),
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    )
  }
  return (
    <div>
      {coverImage && 
        <Image fluid={coverImage} style={{maxWidth: rhythm(500), maxHeight: rhythm(22)}}/> 
      }
      <header>{header}</header>
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(25),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <main>{children}</main>
        <footer style={{textAlign: "center"}}>
          ©{new Date().getFullYear()} JayTsang, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </div>
  )
}

export default Layout
