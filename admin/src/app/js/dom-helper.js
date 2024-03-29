module.exports = class DOMHelper {

  static parseStrToDom(str) {
    const parser = new DOMParser()
    return parser.parseFromString(str, 'text/html')
  }

  static serializeDomToStr(dom) {
    const serializer = new XMLSerializer()
    return serializer.serializeToString(dom)
  }

  static wrapTextNodes(dom) {
    const body = dom.body
    let textNodes = []

    function recursy(element) {
      element.childNodes.forEach(node => {
        if (node.nodeType === 3 && node.nodeValue.replace(/\s+/g, '').length > 0) {
          textNodes.push(node)
        }
        else {
          recursy(node)
        }
      })
    }
    recursy(body)

    textNodes.forEach((node, i) => {
      const wrapper = dom.createElement('text-editor')
      node.parentNode.replaceChild(wrapper, node)
      wrapper.appendChild(node)
      wrapper.contentEditable = true
      wrapper.setAttribute('nodeid', i)
    })

    return dom
  }

  static unwrapTextNodes(dom) {
    dom.body.querySelectorAll('text-editor').forEach(element => {
      element.parentNode.replaceChild(element.firstChild, element)
    })
  }
}
