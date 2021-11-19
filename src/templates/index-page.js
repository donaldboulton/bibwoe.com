/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { RiArrowRightSLine } from "@react-icons/all-files/ri/RiArrowRightSLine"
import { RiFacebookBoxFill } from "@react-icons/all-files/ri/RiFacebookBoxFill"
import { RiTwitterFill, } from "@react-icons/all-files/ri/RiTwitterFill"
import { RiYoutubeFill, } from "@react-icons/all-files/ri/RiYoutubeFill"
import { RiInstagramFill } from "@react-icons/all-files/ri/RiInstagramFill"
import { RiGithubFill } from "@react-icons/all-files/ri/RiGithubFill"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import Layout from "../components/layout"
import BlogListHome from "../components/blog-list-home"
import Seo from "../components/seo"
import Icons from "../util/socialmedia.json"

export const pageQuery = graphql`
  query HomeQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        titleAlt
        tagline
        featuredImage {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, width: 585, height: 439)
          }
        }
        cta {
          ctaText
          ctaLink
        }
      }
    }
    posts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { template: { eq: "blog-post" } } }
      limit: 6
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
            featuredImage {
              childImageSharp {
                gatsbyImageData(
                  layout: FULL_WIDTH
                  breakpoints: [250, 345, 576, 720]
                  placeholder: TRACED_SVG
                  quality: 90
                )
              }
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`

const HomePage = ({ data }) => {
  const { markdownRemark, posts, site } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  const Image = frontmatter.featuredImage
    ? frontmatter.featuredImage.childImageSharp.gatsbyImageData
    : ""
  const sIcons = Icons.socialIcons.map((icons, index) => {
    return (
      <div key={"social icons" + index}>
        {icons.icon === "facebook" ? (
          <OutboundLink to={icons.url} rel="noopener noreferrer" target="_blank">
            <RiFacebookBoxFill alt='Facebook' />
          </OutboundLink>
        ) : (
          ""
        )}
        {icons.icon === "twitter" ? (
          <OutboundLink to={icons.url} rel="noopener noreferrer" target="_blank">
            <RiTwitterFill alt='Twitter' />
          </OutboundLink>
        ) : (
          ""
        )}
        {icons.icon === "youtube" ? (
          <OutboundLink rel="noopener noreferrer" to={icons.url} target="_blank">
            <RiYoutubeFill alt='Youtube' />
          </OutboundLink>
        ) : (
          ""
        )}
        {icons.icon === "instagram" ? (
          <OutboundLink to={icons.url} rel="noopener noreferrer" target="_blank">
            <RiInstagramFill alt='Instagram' />
          </OutboundLink>
        ) : (
          ""
        )}        
        {icons.icon === "github" ? (
          <OutboundLink to={icons.url} rel="noopener noreferrer" target="_blank">
            <RiGithubFill alt='Github' />
          </OutboundLink>
        ) : (
          ""
        )}
      </div>
    )
  })
  return (
    <Layout itemScope='itemScope' itemType='https://schema.org/Webpage'>
      <Seo
        title={frontmatter.title}
        description={frontmatter.title + " " + site.siteMetadata.title}
      />
      <div className="home-banner grids col-1 sm-2" itemprop="mainEntity" itemscope itemtype="https://schema.org/Book">
        <div>
          <h1 itemprop="name">{frontmatter.titleAlt}</h1>
          <p
            className="tagline"
            sx={{
              color: "muted",
            }}
          >
            {frontmatter.tagline}
          </p>
          <div
            className="description"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <OutboundLink
            to={frontmatter.cta.ctaLink}
            className="button"
            sx={{
              variant: "variants.button",
            }}
          >
            {frontmatter.cta.ctaText}
            <span className="icon -right">
              <RiArrowRightSLine />
            </span>
          </OutboundLink>
          <div
            className="social-icons"
            sx={{
              variant: "variants.socialIcons",
            }}
          >
            {sIcons}
          </div>
        </div>
        <div>
        {Image ? (
            <GatsbyImage
              image={Image}
              alt={frontmatter.title + " - Featured image"}
              className="cover"
              itemprop="image"
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <BlogListHome data={posts} />
    </Layout>
  )
}

export default HomePage
