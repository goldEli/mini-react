import {update} from './vdom';

export const Com = {
    CREATE: 0,//创造节点
    MOUNTED: 1,//节点已经挂载
    UPDATING: 2,//节点正在更新
    UPDATED: 3,//节点已经更新
    MOUNTTING: 4,//节点正在挂载,
    CATCHING: 5
}
export default class Component{
    constructor(props) {
        this.lifeCycle = Com.CREATE
        this.pendingState = []
        this.pendingDidMountMethods = []
        this.props = props
    }
    setState(partialNewState, cb) {
        this.state = Object.assign({}, this.state, partialNewState);
        this.updateComponent();
    }
    updateComponent() {

        const newVnode = this.render()
            , oldVnode = this.renderedVonde
            , oldNode = this.oldNode
        update(oldVnode, newVnode, this._hostNode, oldNode)
    }
    updateLifeCycle() {
        if (this.lifeCycle = Com.MOUNTED && this.pendingDidMountMethods.length > 0) {
            this.pendingDidMountMethods.forEach((e,i) => {
                e()
            });
        }
    }
    render() { }
    // shouldComponentUpdate() { }
    componentWillReceiveProps() { }
    // componentWillUpdate() { }
    componentDidUpdate() { }
    componentWillMount() { }
    componentDidMount() { }
    componentWillUnmount() { }
    componentDidUnmount() { }
}