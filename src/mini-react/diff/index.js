
const diff = {};

(function(){
    function Element (tagName, props, children) {
        this.tagName = tagName
        this.props = props
        this.children = children
    }

    Element.prototype.render = function() {
        var el = document.createElement(this.tagName);
        var props = this.props;
        var children = this.children || [];

        for (let propName in props) {
            var propValue = props[propName];
            el.setAttribute(propName, propValue);
        };

        children.forEach(function(child,i){
            var childEl = (child instanceof Element) 
                ? child.render() 
                : document.createTextNode(child);    
            el.appendChild(childEl)
        });
        return el
    }
    
    diff.el = function (tagName, props, children) {
        return new Element(tagName, props, children)
    }
})()

window.diff = diff