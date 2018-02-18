import React from './mini-react/index';

// import React from 'luy';
// import React from 'react';

class AppChild extends React.Component {
  render() {
    return (
      <div className="AppChild" id="AppChild">
        <h4>这是React组件AppChild，是APP的儿子</h4>
        <h4>{this.props.data}</h4>
      </div>
    );
  }
  componentDidMount(){

  }
}

export default AppChild;
