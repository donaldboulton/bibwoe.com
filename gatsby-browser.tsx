import * as React from "react"
import type { GatsbyBrowser } from "gatsby"
import { AnimatePresence } from "framer-motion"
import "prismjs/themes/prism.css"

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({
  element,
}) => {
  return
  <AnimatePresence wait>{element}</AnimatePresence>
}

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `This application has been updated. ` +
      `Reload to display the latest version?`
  )

  if (answer === true) {
    window.location.reload()
  }
}

export const shouldUpdateScroll = ({
  routerProps: { location, transitionDelay },
  getSavedScrollPosition,
}) => {
  if (location.action === "PUSH") {
    window.setTimeout(() => {
      // console.log('scroll to top')
      window.scrollTo({
        top: 0,
        behavior: "smooth", // feel free to use or not
      })
    }, transitionDelay)
  } else {
    const savedPosition = getSavedScrollPosition(location) || [0, 0]
    const top = savedPosition[1]
    window.setTimeout(() => {
      // console.log('scroll to saved position')
      window.scrollTo({
        top,
        behavior: "smooth",
      })
    }, transitionDelay)
  }
  return false
}
