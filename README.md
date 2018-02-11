# mini-react
实现类React框架(router, redux)

### 背景

* 阅读源码不知如何下口
* 通过实现类React框架（究极低配版React，在一个点上不会去考虑很多维度），深入学习react技术栈的设计思想。
* 后期会陆续实现，router 和 redux。
* [方正的这篇文章](https://zhuanlan.zhihu.com/p/30073543)给了我很大的启发，也是看了这篇文章才开始决定此项目。

### Featrue

- [x] 渲染html
- [x] 渲染react组件    
- [x] props, style, otherProps    
- [ ] 生命周期
- [ ] setState
- [ ] 事件
- [ ] diff

（.....）

### log

* JSX解析器，解析JSX后，默认调用React.createElement(type, config, children)，返回ReactElement对象，再传入ReactDOM方法中。

* 创建instantiateReactComponent工厂函数，将传入的dom，处理成html，然后插入到真实的dom中
    * 如果是String或者number，处理成text（ReactDOMTextComponent）
    * 如果是object，则判断type 
        * 如果type是string，处理成html （ReactDomComponent）
        * 如果type是function，处理成react自定义组件 （ReactCompositeComponent）
* 实现非自定义组件的render
* 为element添加属性（classname，style etc）
* 实现React.Component
* **render步骤**
    * jsx解析后得到dom对象
    * dom对象有三种类型：string（原生html），text（展示的文本），function（自定义组件）
    * 根据dom对象生成真实dom插入HTML中
* 添加event （hang up）
* virtual dom 
* 思路成浆糊，删了重来。。。
* 重新理下思路
    * ReactDOM.render
    * 渲染component
    * setstate
* state改变，update后，jsx引擎调用createElement，但是没有调用ReactDOM.render

* 重头来过
* 思路
  * ReactDOM.render(dom, root)
  * jsx 解析 dom
  * 调取 createElement(type, config, children) 返回 Vnode
  * 创建instantiateReactComponent工厂函数，根据 type，调用 ReactDOMTextComponent，ReactDomComponent，ReactCompositeComponent  


### 参考

* [Luy 1.0 ：一个React-like轮子的诞生](https://zhuanlan.zhihu.com/p/30073543)
* [深度剖析：如何实现一个 Virtual DOM 算法](https://github.com/livoras/blog/issues/13)
* [40 行代码内实现一个 React.js](https://zhuanlan.zhihu.com/p/25398176)
* [从零开始写一个 React：初始化渲染](https://zhuanlan.zhihu.com/p/27312281)
* [a tiny react-like library](https://github.com/ahonn/tiny-react)
* [setInnerHTML.js](https://github.com/facebook/react/blob/b1768b5a48d1f82e4ef4150e0036c5f846d3758a/src/renderers/dom/shared/setInnerHTML.js)
