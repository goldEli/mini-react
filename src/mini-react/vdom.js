import {log} from './Utils';
import _ from 'underscore';
import mapProps from './mapProps';
import {Com} from './component';

let allComponent = []

const mountDom = (Vnode) => {
    
    const {children, type, props} = Vnode
        , el = document.createElement(type)

    mapProps(el, props) 
        
    children.forEach(function (child) {
        let childEl;
        if (_.isString(child)) {
            mountText(child, el)
        }
        if (_.has(child, 'type') && _.isFunction(child['type'])) {
            mountComponent(child, el)
        }
        if (_.has(child, 'type') && _.isString(child['type'])) {
            childEl = mountDom(child, el)
        }

        if (childEl) {
            el.appendChild(childEl)
        } 
        
    })
    
    return el
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
        , renderedVonde = instance.render()
    allComponent.push(instance) 
    instance.renderedVonde = renderedVonde
    instance._hostNode = container
    let domNode;    
    instance.lifeCycle = Com.MOUNTTING
    domNode = mountDom(renderedVonde)
    instance.oldNode = domNode
    container.appendChild(domNode)  
}

const renderToRealDom = (Vnode, container, isUpdata, oldNode) => {
    const {type, props, children} = Vnode        

    let domNode;
    if (_.isString(type)) {
        domNode = mountDom(Vnode)
    }
    if (_.isFunction(type)) {
        mountComponent(Vnode, container)
        log('第一次渲染生成的虚拟dom',Vnode)
    }

    
    
    log('第一次渲染生成的虚拟dom',Vnode)
    
    if (isUpdata) {
        // container.innerHTML = ""
        container.replaceChild(domNode,oldNode)
        allComponent.forEach((e,i)=>{
            e.componentDidUpdate()
        })
    } else {
        container.appendChild(domNode)
        allComponent.forEach((e,i)=>{
            e.componentDidMount()
        })
    }
    
    allComponent = []
    log('allComponent',allComponent)

}

export const update = (oldVnode, newVnode, _hostNode, oldNode) => {
    renderToRealDom(newVnode, _hostNode, true, oldNode)
}

export const render = (Vnode, container) => {
    const UniqueKey = container.UniqueKey
    log('render',{Vnode, container, UniqueKey});
    renderToRealDom(Vnode, container)
    
}


