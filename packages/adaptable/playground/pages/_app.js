import { ThemeProvider } from "styled-components"
import theme from "../../src/theme"
import "../../src/index.scss"
import Navigation from "../components/navigation"

const NAV_WIDTH = 240
const PADDING = 10

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          width: NAV_WIDTH,
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
          background: "#eee",
          overflow: "auto",
          padding: PADDING,
          boxSizing: "border-box"
        }}
      >
        <Navigation />
      </div>
      <div style={{ padding: PADDING, paddingLeft: NAV_WIDTH + PADDING }}>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  )
}
