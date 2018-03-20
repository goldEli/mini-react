import {
  reactDOMEmptyComponent
  , reactDOMTextComponent
  , reactDomComponent
  , reactCompositeComponent
} from './host';

export function instantiateReactComponent(Vnode, container) {
    let node = null

    if (typeof Vnode === 'string' || typeof Vnode === 'number') {
      node = reactDOMTextComponent(Vnode)
    }
  
    if (typeof Vnode === 'object') {
      let type = Vnode.type
      if (typeof type === 'string') {
        node = reactDomComponent(Vnode)
      } else if (typeof type === 'function') {
        node = reactCompositeComponent(Vnode,container)
      }
    }
    return node
}