import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
// import CSSModules from 'react-css-modules';

import register from './register.scss';
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      password:'',
      errorForUsername: '',
      errorForPassword: '',
      shouldHide:false,
      value: '',
      rememberMe:'1'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeRM = this.handleChangeRM.bind(this);
  }

   validateUsername(event) {
    let username =   event.target.value ;
    console.log('username'+!username);
    if (!username) {  
      this.setState.shouldHide = false;
      console.log('shouldHide:'+this.setState.shouldHide);
      this.setState({
        errorForUsername:'用于登录FT中文网'
      });
      return false;
    }else{
       this.setState.shouldHide = true;
       console.log('value:'+event.target.value);
    }

    let re = /^[a-zA-Z0-9_\.]+$/;
    if (!re.test(username)) {
      this.setState({
        errorForUsername: '用户名只能包含大小写、数字和下划线'
      })
      return false;
    }
  
    this.setState({
      errorForUsername: ''
    })
    return true;
  }

  validatePassword(password) {
    if (!password) {
      this.setState({
        errorForPassword: '8-20个字符，不能使用空格、表情符号'
      });
      return false;
    }

    this.setState({
      errorForPassword: ''
    });
    return true;
  }
  handleChange(event) {
    this.setState({username: event.target.value});  
  }

  handleChangeAnother(fieldname, e) {
    switch(fieldname) {
      case 'password':
        const {value} = e.target;
        this.setState({
          [fieldname]: value
        });
        break;
      case 'rememberMe':
        const {checked} = e.target; 
        if (checked) {
          this.setState({
            rememberMe: '1'
          });
        } else {
          this.setState({
            rememberMe: '0'
          });
        }
    }
  }

handleChangeRM(event){
    const target = event.target;
    const checked1 = target.type === 'checkbox' ? target.checked : target.value;
    if (checked1) {
        this.setState({
        rememberMe: '1'
        });
    } else {
        this.setState({
        rememberMe: '0'
        });
    }
}

/**
 *  
 */
  render() {
    const {username, password,rememberMe, errorForUsername, errorForPassword} = this.state;
    return (
      <div className="login-container">
        <div className="content-section">
            <div className="inner-section">
                <div className = "title-section">创建FT中文网账号</div>
                <div className = "input-section">
                    <input type="text" class="username" maxLength="12" name="username" placeholder="用户名" value={this.state.username} onChange={this.handleChange} onBlur = {this.validateUsername.bind(this)}/> 
                    <div id="user-error" className ={`error-hint  ${this.state.shouldHide ? 'hidden' : 'show'}`}>{errorForUsername}</div>
                </div>
                <div className = "input-section">
                    <input className="password" maxLength="12" name="password" placeholder="密码" value={password} onChange = {this.handleChangeAnother.bind(this,'password')} onBlur = {this.validatePassword.bind(this, password)}/> 
                    <div className="error-hint" id="pw-error">{errorForPassword}</div>
                </div>
         
                <div className = "input-section">
                    <button className="login-btn" type="submit" >注册</button>
                    <div className="error-hint" id="pw-error">注册即代表您同意FT中文网《用户注册协议》</div>  
                </div>
                <div>已有账号？<a href="/login">登录</a></div>
                <div className = "input-section">
                    <button className="login-btn">下载FT中文网</button>
                </div>
            </div>
        </div>
    </div>
    );
  }

}

export default Register;

// 这个页面不会自动刷新的原因？