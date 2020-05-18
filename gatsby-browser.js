import React from "react"

import PageWrapper from "~/components/layout/page-wrapper"

import "./src/styles/index.scss"

export const wrapPageElement = ({ element }) => {
  const context = element?.props?.pageContext

  return <PageWrapper context={context}>{element}</PageWrapper>
}

// const GTMNoScript = () => {
//   return (
//     <noscript>
//       <iframe
//         src="https://www.googletagmanager.com/ns.html?id=GTM-W6LJZSJ"
//         height="0"
//         width="0"
//         style="display:none;visibility:hidden"
//       ></iframe>
//     </noscript>
//   )
// }

// const CookieBanner = () => {
//   const initBanner = () => {
//     var s = document.createElement("script")
//     s.type = "text/javascript"
//     s.async = true
//     s.src = "https://app.termly.io/embed.min.js"
//     s.id = "dee08c58-630a-4f90-8bd5-8af05cf976e6"
//     s.setAttribute("data-name", "termly-embed-banner")
//     var x = document.getElementsByTagName("script")[0]
//     x.parentNode.insertBefore(s, x)
//   }

//   return <script>{initBanner()}</script>
// }

// export const onRenderBody = ({ setPreBodyComponents }) => {
//   setPreBodyComponents([CookieBanner, GTMNoScript])
// }
