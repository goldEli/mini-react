import {log} from './Utils';
import _ from 'underscore';
import mapProps from './mapProps';

const mountDom = (Vnode, container) => {
    
    const {children, type, props} = Vnode
        , el = document.createElement(type)

    mapProps(el, props) 
        
    children.forEach(function (child) {
        let childEl = _.isString(child)
            ? mountText(child, el)
            : mountDom(child, el)

        container.appendChild(childEl)
    })
    
    return container
}

const mountText = (text, container) => {
    const textNode = document.createTextNode(text)
    container.appendChild(textNode)
    return container
}

const mountComponent = (Vnode, container) => {
    const {props, type} = Vnode
        , Component = type
        , instance = new Component(props)
        , VnodeFromComponent = instance.render()

    return renderToRealDom(VnodeFromComponent, container)    
}

const renderToRealDom = (Vnode, container) => {
    const {type, props, children} = Vnode        

    let domNode;
    if (_.isString(type)) {
        domNode = document.createElement(type)
        mountDom(Vnode, domNode)
    }
    if (_.isFunction(type)) {
        debugger
        // domNode = mountComponent(child, el)
        // container.appendChild(el)
        // Vnode._hostNode = dom //缓存真实节点
    }
    mapProps(domNode, props)
    container.appendChild(domNode)
    return domNode
}

export const render = (Vnode, container) => {
    const UniqueKey = container.UniqueKey
    log('render',{Vnode, container, UniqueKey});
    renderToRealDom(Vnode, container)
    
}


