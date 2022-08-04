import Document, { Html, Head, Main, NextScript } from "next/document"
import Script from "next/script"
import { SEOConfig } from "src/configs/seo"
class DraftyDocument extends Document {
  render() {
    const { defaultTitle, description, image, siteUrl } = SEOConfig
    return (
      <Html>
        <Head>
          <meta name="description" content={description} />
          <meta name="theme-color" content="#3730a3" />
          {/* Facebook */}
          <meta property="og:title" content={description} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={siteUrl} />
          <meta property="og:image" content={image} />
          <meta property="og:site_name" content={siteUrl} />
          <meta property="og:description" content={description} />
          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:creator" content="@kloogans" />
          <meta name="twitter:url" content={image} />
          <meta name="twitter:title" content={defaultTitle} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={image} />
          {/* Fonts */}
          <link
            rel="preload"
            href="/fonts/Cunia.otf"
            as="font"
            crossOrigin=""
            type="font/otf"
          />
          <link
            rel="preload"
            href="/fonts/Inter.ttf"
            as="font"
            crossOrigin=""
            type="font/ttf"
          />
          {/* PWA */}
          <link
            rel="manifest"
            crossOrigin="use-credentials"
            href="/site.webmanifest"
          />
          <meta name="application-name" content="Drafty" />
          <meta name="msapplication-starturl" content="https://drafty.cc/" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-title" content="Drafty" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default DraftyDocument
