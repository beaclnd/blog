import React from "react";
import { Link } from "gatsby";
import { rhythm, scale } from "../utils/typography"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons" ;
import { faTags } from "@fortawesome/free-solid-svg-icons" ;

const FrontMatter = ({ node, highlightTag = "" }) => ( 
    <section style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        marginTop: rhythm(-0.3),
        marginBottom: rhythm(0.3)
    }}>
        <FontAwesomeIcon icon={faCalendarAlt} style={{ 
            fontSize: rhythm(0.60), 
            marginRight: rhythm(0.2),
            marginTop: rhythm(0.3),
            }}
        />
        <small style={{ fontStyle: "italic", marginTop: rhythm(0.3), paddingRight: rhythm(1/2) }}>
            {node.frontmatter.date}
        </small>
        { node.frontmatter.tags && (
            <Link to="/tag-list" style={{ 
                boxShadow: "none", 
                marginTop: rhythm(0.3), 
                marginRight: rhythm(0.3), 
                marginLeft: rhythm(0.4),
            }}>
                <FontAwesomeIcon className="tagIcon" icon={faTags} style={{ fontSize: rhythm(0.58) }} />
            </Link>
        )}
        { node.frontmatter.tags && node.frontmatter.tags.map((tag, i) => (
                <small 
                    key={`${node.id}-${i}`}
                    className="tagName" 
                    style={{ 
                        ...scale(-1/2.01),
                        paddingRight: rhythm(1/3), 
                        paddingLeft: rhythm(1/3), 
                        paddingTop: rhythm(1/9), 
                        paddingBottom: rhythm(1/9), 
                        marginRight: rhythm(0.5), 
                        marginTop: rhythm(0.3), 
                        outline: "solid",
                        outlineColor: highlightTag === tag ? "#007acc" : "#4d4d4d",
                        outlineStyle: highlightTag === tag ? "double" : "solid",
                        outlineWidth: rhythm(0.069),
                    }}>
                        <Link to={`/tags/${tag}/pagination/1`} style={{ 
                            boxShadow: "none", 
                            color: "inherit",
                        }}>
                            {tag}
                        </Link>
                </small>
        ))}
    </section>
)

export default FrontMatter;