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
        this.pendingDidMountMethods.push(partialNewState)
        if (this.lifeCycle == Com.MOUNTED) {
            this.updateComponent();
        }
    }
    updateComponent() {

        this.pendingDidMountMethods.forEach((e,i) => {
            this.state = Object.assign({},this.state,e)
        });

        const newVnode = this.render()
            , oldVnode = this.renderedVonde
            , oldNode = this.oldNode;    
        
        update(oldVnode, newVnode, this._hostNode, oldNode, this)

        this.pendingDidMountMethods = []
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