import {log} from './Utils';
import _ from 'underscore';
import mapProps from './mapProps';

const mountDom = (Vnode, container) => {
    
    const {children, type, props} = Vnode
        , el = document.createElement(type)

    mapProps(el, props) 
        
    children.forEach(function (child) {
        let childEl;
        if (_.isString(child)) {
            childEl = mountText(child, el)
        }
        if (_.has(child, 'type') && _.isFunction(child['type'])) {
            childEl = mountComponent(child, el)
        }
        if (_.has(child, 'type') && _.isString(child['type'])) {
            childEl = mountDom(child, el)
        }

        if (childEl) {
            container.appendChild(childEl)
        } else {
            console.error('生成childEl失败：',child)
        }
        
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
    let domNode;    
    if (_.isString(VnodeFromComponent.type)) {
        domNode = document.createElement(VnodeFromComponent.type)
        mountDom(VnodeFromComponent, domNode)
    }
    container.appendChild(domNode)
    return container;  
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


