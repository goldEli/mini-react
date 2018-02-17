import React from './mini-react/index';
import ReactDOM from './mini-react/index';

// import React from 'luy';
// import ReactDOM from 'luy';

// import React from 'react';
// import ReactDOM from 'react-dom';


import App from './App';
import App1 from './App1';


// ReactDOM.render(
//     <div className="level1">123</div>
// , document.getElementById('root'));

// ReactDOM.render(
//     <div className="level1">
//         <div className="level2">
//             123
//         </div>
//     </div>
// , document.getElementById('root'));

ReactDOM.render(
    <div className="level1">
        <div className="level2"><div className="level3">3</div></div>
        <div className="level2">2</div>
        <div className="level2">2</div>
        <App/>
        <App1/>
    </div>
, document.getElementById('root'));