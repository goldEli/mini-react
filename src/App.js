import React from './mini-react/index';

// import React from 'luy';
// import React from 'react';

import AppChild from './AppChild';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data: 'oldState'
    }
  }
  componentWillMount(){
    setTimeout(()=>{
      this.setState({
        data:'123'
      })
    },500)
  }
  render() {
    return (
      <div className="App" id="app">
        <h1>这是React组件App</h1>
        <h2>{"这里展示state"+this.state.data}</h2>
        <AppChild data = "来自APP的数据"/>
      </div>
    );
  }
  componentDidMount(){
    this.setState({
      data:'newState'
    })
  }
}

export default App;
