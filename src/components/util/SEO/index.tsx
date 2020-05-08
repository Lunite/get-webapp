import React, { FunctionComponent } from "react"
import { Helmet } from "react-helmet"

interface SEOProps {
  title?: string
  slug?: string
  description?: string
  keywords?: string
  image?: string
}

const SEO: FunctionComponent<SEOProps> = ({
  title,
  slug,
  description,
  keywords,
  image,
}) => {
  const siteName = "Green Energy Together"
  const siteUrl = "https://get-uk.com"

  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      <meta
        name="robots"
        content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />
      <link rel="canonical" href={siteUrl} />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`${siteName} | ${title}`} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={`${siteUrl}/${slug}`} />
      <meta property="og:site_name" content={siteName} />
      {image && <meta property="og:image" content={image} />}
      {image && <meta property="og:image:secure_url" content={image} />}
      {image && <meta property="og:image:width" content="600" />}
      {image && <meta property="og:image:height" content="600" />}
      {image && <meta name="twitter:card" content={image} />}
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:title" content={`${siteName} | ${title}`} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  )
}

export default SEO
