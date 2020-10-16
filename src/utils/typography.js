import Typography from "typography"
import Wordpress2016 from "typography-theme-wordpress-2016"

Wordpress2016.overrideThemeStyles = () => {
  return {
    "a.gatsby-resp-image-link": {
      boxShadow: `none`,
    },
    "a": {
      boxShadow: "none",
    },
    "p": {
      letterSpacing: "0.0325em",
    },
    "table tbody tr td": {
      textAlign: "center",
    },
    "table tbody tr:nth-child(2n)": {
      backgroundColor: "#eee8e8",
    },
    "table tbody tr:hover": {
      backgroundColor: "#4f4f4f",
      color: "#ffffff"
    },
    "table thead tr th": {
      textAlign: "center",
    },
    blockquote: {
      fontSize: "1.05rem"
    }
  }
}

Wordpress2016.headerFontFamily = ["-apple-system", "Microsoft YaHei", "Times", "Helvetica", "Tahoma", "serif", "Georgia"];
Wordpress2016.bodyFontFamily = ["-apple-system", "Microsoft YaHei", "Times New Roman", "Helvetica", "serif", "Georgia"];
Wordpress2016.baseFontSize = 18;

delete Wordpress2016.googleFonts

const typography = new Typography(Wordpress2016)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
