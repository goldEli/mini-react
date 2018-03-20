import {update} from './vdom';

export const Com = {
    CREATE: 'CREATE',//创造节点
    MOUNTED: 'MOUNTED',//节点已经挂载
    UPDATING: 'UPDATING',//节点正在更新
    UPDATED: 'UPDATED',//节点已经更新
    MOUNTTING: 'MOUNTTING',//节点正在挂载,
    CATCHING: 'CATCHING'
}
export default class Component{
    constructor(props) {
        this.lifeCycle = Com.CREATE
        this.pendingState = []
        this.pendingDidMountMethods = []
        this.props = props
    }
    setState(partialNewState, cb) {
        if (this.lifeCycle === Com.CREATE) {
            this.state = Object.assign({},this.state,partialNewState)
        }
        this.pendingDidMountMethods.push(partialNewState)
        if (this.lifeCycle === Com.MOUNTED) {
            this.updateComponent();
        }
    }
    updateComponent() {
        this.pendingDidMountMethods.forEach((e,i) => {
            this.state = Object.assign({},this.state,e)
        });

        const newVnode = this.render()
            , oldVnode = this.oldVnode
            , oldNode = this.oldNode
            , container = this.container;

        update(oldVnode, newVnode, container, oldNode, this)

        this.pendingDidMountMethods = []
    }
 
    render() { }
    // shouldComponentUpdate() { }
    componentWillReceiveProps() { }
    // componentWillUpdate() { }
    componentDidUpdate() { }
    // componentWillMount() { }
    // componentDidMount() { }
    componentWillUnmount() { }
    componentDidUnmount() { }
}