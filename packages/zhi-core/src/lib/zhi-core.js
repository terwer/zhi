function addStylesheet(id, url) {
  if (typeof document === "undefined") {
    console.warn("Not in browser env, ignore add css")
    return
  }

  const head = document.head || document.getElementsByTagName("head")[0]
  const existingLink = document.querySelector('link[href="' + url + '"]')
  if (existingLink) {
    return
  }
  const link = document.createElement("link")
  link.id = id
  link.rel = "stylesheet"
  link.href = url
  head.appendChild(link)
  console.log(`${id} loaded`)
}

async function init() {
  console.log(`zhiCore loaded`)
}

export const zhiCore = {
  addStylesheet,
  init,
}
