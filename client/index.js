
// function aa(){
// 	console.log('finish');
// }


import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class App extends React.Component {
  render() {
    return (
		<button>
			index
		</button>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
