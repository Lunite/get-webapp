import React, { FunctionComponent } from "react"
import { Helmet } from "react-helmet"

interface SEOProps {
  title: string
  alias: string
  description: string
  image?: string
}

export const SEO: FunctionComponent<SEOProps> = ({
  title,
  alias,
  description,
  image,
}) => {
  const siteName = "Green Energy Together"
  const siteUrl = "https://get-uk.com"

  return (
    <Helmet>
      <meta name="description" content={description} />
      <meta
        name="robots"
        content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />
      <link rel="canonical" href={siteUrl} />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`${siteName} | ${title}`} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${siteUrl}/${alias}`} />
      <meta property="og:site_name" content={siteName} />
      {image && (
        <>
          <meta property="og:image" content={image} />
          <meta property="og:image:secure_url" content={image} />
          <meta property="og:image:width" content="600" />
          <meta property="og:image:height" content="600" />
          <meta name="twitter:card" content={image} />
        </>
      )}
      <meta name="twitter:description" content={description} />
      <meta name="twitter:title" content={`${siteName} | ${title}`} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  )
}
