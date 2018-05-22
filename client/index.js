import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Nav from './component/nav/nav.js';
import Login from './component/Login/login.js';

import main from './styles/main.scss';
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
        {/*<button>
          Say hello2
        </button>
        <div className="hgh">test css</div>*/}
      </div>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
