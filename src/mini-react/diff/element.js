function Element (tagName, props, children) {
    this.tagName = tagName
    this.props = props
    this.children = children
}



module.exports = function (tagName, props, children) {
return new Element(tagName, props, children)
}