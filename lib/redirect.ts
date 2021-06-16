export default function redirect(targetURL: string) {
  function Index() {
    return null
  }

  async function getInitialProps({ res }) {
    if (res) {
      res.writeHead(307, { Location: targetURL })
      res.end()
    } else {
      // @ts-ignore
      window.location = targetURL
      await new Promise((_) => {})
    }
  }

  Index.getInitialProps = getInitialProps
  return Index
}