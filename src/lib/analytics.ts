import Analytics from "analytics"
import googleTagManager from "@analytics/google-tag-manager"

export const pageview = (url: string) => {
  window.gtag("config", "GTM-N27253L", {
    page_path: url
  })
}

// log specific events happening.
export const event = ({ action, params }: { action: any; params: any }) => {
  window.gtag("event", action, params)
}

export const analytics = Analytics({
  app: "drafty",
  debug: true,
  plugins: [
    // doNotTrack(),
    googleTagManager({
      containerId: "GTM-N27253L"
    })
  ]
})
