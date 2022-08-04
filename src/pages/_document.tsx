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
          <meta name="theme-color" content="#312e81" />
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
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-title" content="Drafty" />
          <meta name="format-detection" content="telephone=no" />
          <link
            rel="apple-touch-startup-image"
            href="/images/apple_splash_2048.png"
            sizes="2048x2732"
          />
          <link
            rel="apple-touch-startup-image"
            href="/assets/splashscreens/apple_splash_1668.png"
            sizes="1668x2224"
          />
          <link
            rel="apple-touch-startup-image"
            href="/assets/splashscreens/apple_splash_1536.png"
            sizes="1536x2048"
          />
          <link
            rel="apple-touch-startup-image"
            href="/assets/splashscreens/apple_splash_1125.png"
            sizes="1125x2436"
          />
          <link
            rel="apple-touch-startup-image"
            href="/assets/splashscreens/apple_splash_1242.png"
            sizes="1242x2208"
          />
          <link
            rel="apple-touch-startup-image"
            href="/assets/splashscreens/apple_splash_750.png"
            sizes="750x1334"
          />
          <link
            rel="apple-touch-startup-image"
            href="/assets/splashscreens/apple_splash_640.png"
            sizes="640x1136"
          />
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
