import {log} from './Utils';
import _ from 'underscore';
import mapProps from './mapProps';
import {Com} from './component';

let allComponent = [];

function mountDom(Vnode){
    
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

function mountText(text, container){
    const textNode = document.createTextNode(text)
    container.appendChild(textNode)
    return container
}

function mountComponent(Vnode, container){
    const {props, type} = Vnode
        , Component = type
        , instance = new Component(props)
        , renderedVonde = instance.render()
    allComponent.push(instance) 
    instance.renderedVonde = renderedVonde
    instance._hostNode = container
    let domNode;    
    instance.lifeCycle = Com.MOUNTTING
    instance.componentWillMount()
    domNode = mountDom(renderedVonde)
    instance.oldNode = domNode
    container.appendChild(domNode)  
}



function renderToRealDom (Vnode, container, isUpdata, oldNode, ReactComponent){
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
        container.replaceChild(domNode,oldNode)
        ReactComponent.oldNode = domNode
        updateLifeCycle(allComponent,Com.MOUNTED)
        allComponent.forEach((e,i)=>{
            e.componentDidUpdate()
        })
    } else {
        container.appendChild(domNode)
        updateLifeCycle(allComponent,Com.MOUNTED)
        allComponent.forEach((e,i)=>{
            e.componentDidMount()
        })
    }
    
    allComponent = []
    
    log('allComponent',allComponent)

}

function updateLifeCycle(allComponent, lifeCycle) {
    if(allComponent.length>0) {
        allComponent.forEach((e,i) => {
            e.lifeCycle = lifeCycle
        });
    }
}

export const update = (oldVnode, newVnode, _hostNode, oldNode, ReactComponent) => {
    renderToRealDom(newVnode, _hostNode, true, oldNode, ReactComponent)
}

export const render = (Vnode, container) => {
    const UniqueKey = container.UniqueKey
    log('render',{Vnode, container, UniqueKey});
    renderToRealDom(Vnode, container)
    
}


