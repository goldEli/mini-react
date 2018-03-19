import {instantiateReactComponent} from './instantiateReactComponent';
import mapProps from './mapProps';
export const reactDOMTextComponent = (text) => {
    const textNode = document.createTextNode(text)
    return textNode
}
export const reactDomComponent = (Vnode) => {
    const {children, type, props} = Vnode
    , el = document.createElement(type);
    mapProps(el, props)
    let childEl;
    if (children) {
        childEl = _mountChildren(children)
    }
    childEl.forEach((e) => {
        el.appendChild(e)
    })
    return el
}
export const reactCompositeComponent = (Vnode) => {
    const {type, props} = Vnode
        , instance = new Vnode.type(props)
        , node = instantiateReactComponent(instance.render())
    return node;
}
export const reactDOMEmptyComponent = () => {

}
function _mountChildren (children){
    let childrenDom = [];
    children.forEach(child => {
        const node = instantiateReactComponent(child)
        childrenDom.push(node)
    });
    return childrenDom;
}