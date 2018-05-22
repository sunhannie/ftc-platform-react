import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
// import CSSModules from 'react-css-modules';

import login from './login.scss';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      password:'',
      errorForUsername: '',
      errorForPassword: '',
      shouldHide:false,
      value: '',
      rememberMe:false
    };
    this.handleChange = this.handleChange.bind(this);
  }

   validateUsername(event) {
    let username =   event.target.value ;
    console.log('username'+!username);
    if (!username) {  
      this.setState.shouldHide = false;
      console.log('shouldHide:'+this.setState.shouldHide);
      this.setState({
        errorForUsername:'用户名不能为空'
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
        errorForPassword: '密码不能为空'
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

// 箭头函数体内的this对象，就是`定义时所在的对象，而不是使用时所在的对象`。
//  handleChangeRM = (event) => {this.setState({rememberMe: event.target.value}); }


  render() {
    const {username, password, errorForUsername, errorForPassword} = this.state;
    return (
      <div className="login-container">
        <div className="content-section">
            <div className="inner-section">
                <div className = "title-section">FT中文网登录系统</div>
                <div className = "input-section">
                    <input type="text" class="username" maxLength="12" name="username" placeholder="用户名" value={this.state.username} onChange={this.handleChange} onBlur = {this.validateUsername.bind(this)}/> 
                    <div id="user-error" className ={`error-hint  ${this.state.shouldHide ? 'hidden' : 'show'}`}>{errorForUsername}</div>
                </div>
                <div className = "input-section">
                    <input className="password" maxLength="12" name="password" placeholder="密码" value={password} onChange = {this.handleChangeAnother.bind(this,'password')} onBlur = {this.validatePassword.bind(this, password)}/> 
                    <div className="error-hint" id="pw-error">{errorForPassword}</div>
                </div>
                <div className = "input-section remember-center">
                    <input type="checkbox" id="rememberMe"  name="rememberMe" checked onChange={this.handleChange}/>
                    <label htmlFor="rememberMe">记住账号</label>
                </div>
                <div className = "input-section">
                    {/*<input className="login-btn" type="submit" name="login" value="登录"/>*/}
                    <button className="login-btn" type="submit" >登录</button>
                </div>
                <div>还没有FT中文网账号?<a href="/signup?source=login">创建</a></div>
            </div>
        </div>
    </div>
    );
  }

}

export default Login;