import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Nav from '../component/nav/nav.js';
import Register from '../component/register/register.js';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {message: 'Hello!'};
  }


  render() {
    return (
    	<div>
        <Nav />
        <Register />
        
      </div>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
