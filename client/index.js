
// function aa(){
// 	console.log('finish');
// }


import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {message: 'Hello!'};
  }
  // sayHello = () => {
  //   alert(this.state.message);
  // }

  render() {
    return (
    	<div>
      <button>
        Say hello3
      </button>
      </div>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
