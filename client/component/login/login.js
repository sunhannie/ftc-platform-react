import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSModules from 'react-css-modules';

import login from './login.scss';
class Login extends React.Component {

  render() {
    return (
      <div className="login-container">
        <div className="content-section">
            <div className="inner-section">
                <div className = "title-section">存款业务询报价系统</div>
                <div className = "input-section">
                    <input type="text" class="username" maxLength="12" name="username" placeholder="用户名" require/> 
                </div>
                <div className = "input-section">
                    <input className="password" maxLength="12" name="password" placeholder="密码" require/> 
                </div>
                <div className = "input-section remember-center">
                    <input type="checkbox" id="rememberMe"  name="rememberMe" checked/>
                    <label for="rememberMe">记住账号</label>
                </div>
                <button className="login-btn" type="submit" >登录</button>

            </div>
        </div>
    </div>
    );
  }

}

export default Login;