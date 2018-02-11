import React from 'react';
import ReactDOM from 'react-dom';
// import App from '../App';

it('ReactDOM.render', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <div className="level1">
        <div className="level2">
            123
        </div>
    </div>
  , div);
  // ReactDOM.unmountComponentAtNode(div);

});
