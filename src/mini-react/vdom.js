import {log} from './Utils';
import _ from 'underscore';
import mapProps from './mapProps';
import {Com} from './component';
import {instantiateReactComponent} from './instantiateReactComponent';
import {getAllReactNode} from './host';

function renderToRealDom (Vnode, container, isUpdata, oldNode, ReactNode){
    Vnode.container = container;
    const node = instantiateReactComponent(Vnode, container)  
    if (!isUpdata) {
        container.appendChild(node)        
        const allReactNode = getAllReactNode()
        allReactNode.forEach(e=>{
            if (e.lifeCycle === Com.MOUNTTING) {
                e.lifeCycle = Com.MOUNTED
                if (e.componentDidMount) {e.componentDidMount()}
            }
        })
    } else {
        container.replaceChild(node,oldNode)
        ReactNode.oldNode = node        
    }     
    
    // let domNode;
    // if (_.isString(type)) {
    //     domNode = mountDom(Vnode)
    // }
    // if (_.isFunction(type)) {
    //     mountComponent(Vnode, container)
    //     log('第一次渲染生成的虚拟dom',Vnode)
    // }

    // log('第一次渲染生成的虚拟dom',Vnode)
    
    // if (isUpdata) {
    //     container.replaceChild(domNode,oldNode)
    //     ReactComponent.oldNode = domNode
    //     updateLifeCycle(allComponent,Com.MOUNTED)
    //     allComponent.forEach((e,i)=>{
    //         e.componentDidUpdate()
    //     })
    // } else {
    //     container.appendChild(domNode)
    //     updateLifeCycle(allComponent,Com.MOUNTED)
    //     allComponent.forEach((e,i)=>{
    //         e.componentDidMount()
    //     })
    // }
    
    // allComponent = []
    
    // log('allComponent',allComponent)

}

// function updateLifeCycle(allComponent, lifeCycle) {
//     if(allComponent.length>0) {
//         allComponent.forEach((e,i) => {
//             e.lifeCycle = lifeCycle
//         });
//     }
// }

export const update = (oldVnode, newVnode, container, oldNode, ReactNode) => {
    renderToRealDom(newVnode, container, true, oldNode, ReactNode)
}

export const render = (Vnode, container) => {
    const UniqueKey = container.UniqueKey;
    log('render',{Vnode, container, UniqueKey});
    renderToRealDom(Vnode, container)  
}


