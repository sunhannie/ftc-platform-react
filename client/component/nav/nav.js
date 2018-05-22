import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSModules from 'react-css-modules';

import nav from './nav.scss';
// @CSSModules(nav, {allowMultiple: false})

class Nav extends React.Component {
  // static propTypes = {
  //   postUrl: PropTypes.string,
  //   findPasswordUrl: PropTypes.string,
  //   registerUrl: PropTypes.string
  // };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="html" >
        <div className="title">FT中文网</div>
      </div>
    );
  }

}

export default Nav;