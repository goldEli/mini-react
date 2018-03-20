import {instantiateReactComponent} from './instantiateReactComponent';
import mapProps from './mapProps';
import {Com} from './component';

let allReactNode = [];

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
        childEl = _mountChildren(children,el)
    }
    childEl.forEach((e) => {
        el.appendChild(e)
    })
    return el
}
export const reactCompositeComponent = (Vnode,container) => {
    const {type, props} = Vnode
        , instance = new type(props);
    if (instance.componentWillMount) {
        instance.componentWillMount()
    }
    const newVnode = instance.render()
        , node = instantiateReactComponent(newVnode);
    instance.lifeCycle = Com.MOUNTTING;
    instance.oldNode = node;
    instance.oldVnode = newVnode;
    if (container) {instance.container = container}
    
    allReactNode.push(instance);
    return node;
}
export const reactDOMEmptyComponent = () => {

}
function _mountChildren (children,container){
    let childrenDom = [];
    children.forEach(child => {
        const node = instantiateReactComponent(child,container)
        childrenDom.push(node)
    });
    return childrenDom;
}

export const getAllReactNode = () => {
    return allReactNode
}
