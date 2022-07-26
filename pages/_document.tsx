import Document, { Html, Head, Main, NextScript } from "next/document"
import nightwind from "nightwind/helper"
class DraftyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* <title>Drafty</title> */}
          <meta
            name="description"
            content="Draft your twitter ideas with ease."
          />
          <link rel="icon" href="/favicon.ico" />

          <meta name="theme-color" content="#3730a3" />
          {/* Facebook */}

          <meta
            property="og:title"
            content={`Draft your twitter ideas with ease.`}
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`https://Drafty.cc`} />
          <meta
            property="og:image"
            content={`https://littlebuilds.s3.amazonaws.com/lb_seo_image.jpg`}
          />
          <meta property="og:site_name" content={`https://Drafty.cc`} />
          <meta
            property="og:description"
            content={`Draft your twitter ideas with ease.`}
          />
          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:creator" content="@kloogans" />
          <meta name="twitter:url" content={`https://Drafty.cc`} />
          <meta name="twitter:title" content={`Drafty`} />
          <meta
            name="twitter:description"
            content={`Draft your twitter ideas with ease.`}
          />
          <meta
            name="twitter:image"
            content={`https://littlebuilds.s3.amazonaws.com/lb_seo_image.jpg`}
          />
          <script
            dangerouslySetInnerHTML={{ __html: nightwind.init() }}
          ></script>
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
