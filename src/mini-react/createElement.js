
import {log} from './Utils';

class Vnode {
    constructor(params) {
        const {children,type,props} = params;
        this.children = children;
        this.type = type;
        this.props = props;
    }
}

export const createElement = (type, config, ...children) => {
    log('createElement',{type, config, children})
    const props = {}
    // 过滤 config 中的 __self 和 __source
    for (let key in config) {
        if (key === '__self' || key === '__source') continue
        props[key] = config[key]
    }
    return new Vnode({props,children,type})
}
