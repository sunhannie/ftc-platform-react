import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Nav from '../component/nav/nav.js';
import Login from '../component/login/login.js';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {message: 'Hello!'};
  }


  render() {
    return (
    	<div>
        <Nav />
        <Login />
        
      </div>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
