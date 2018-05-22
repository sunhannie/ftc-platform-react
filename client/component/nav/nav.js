import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSModules from 'react-css-modules';

import nav from './nav.scss';

class Nav extends React.Component {

  render() {
    return (
      <div className="html" >
        <div className="title">FT中文网</div>
      </div>
    );
  }

}

export default Nav;