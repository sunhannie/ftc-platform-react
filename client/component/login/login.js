import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
// import CSSModules from 'react-css-modules';
import { Users } from './data.js';
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
      rememberMe:'1'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeRM = this.handleChangeRM.bind(this);
    this.login = this.login.bind(this);
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
    // this.setState({rememberMe: event.target.value});
}
// 此函数可以setState，也可以this.state，但是不能再then中使用，我觉得是this的原因，需要进一步研究用法
login(){
  const username = this.state.username;
  const password = this.state.password;
  const that = this;
  // validatePassword(password);
  fetch('/jsonData', {
        method: 'get',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        // body: 'userName='+values.userName+'&password='+values.password,
    }).then(response => response.json()).then(function(res) {
        console.log(res)
        for (let user of res.Users) {
          if (user.username === username && user.password === password) {
            console.log('登录成功'+that.state.username);
          }else{
            if(!!username && !!password){
              that.setState({
                errorForPassword: '校核用户名或者密码'
              });
            }
            
          }
        }
        
    });
    // this.setState({
    //   'rememberMe': '1'
    // });
    
}
/**
 *  箭头函数体内的this对象，就是`定义时所在的对象，而不是使用时所在的对象`。
    handleChangeRM = (event) => {this.setState({rememberMe: event.target.value}); }
    此种写法有错，后期进一步研究，下面链接有箭头函数实例
    https://segmentfault.com/q/1010000010918131
 */
  render() {
    const {username, password,rememberMe, errorForUsername, errorForPassword} = this.state;
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
                    {/*<input type="checkbox" id="rememberMe"  name="rememberMe" value={rememberMe} checked={rememberMe==='1'} onChange={() => this.handleChangeRM(this)}/>*/}
                    <input type="checkbox" id="rememberMe"  name="rememberMe" value={rememberMe} checked={rememberMe==='1'} onChange={this.handleChangeRM}/>
                    <label htmlFor="rememberMe">记住账号</label>
                </div>
                <div className = "input-section">
                    {/*<input className="login-btn" type="submit" name="login" value="登录"/>*/}
                    <button className="login-btn" type="submit" onClick={this.login}>登录</button>
                </div>
                <div>还没有FT中文网账号?<a href="/signup?source=login">创建</a></div>
            </div>
        </div>
    </div>
    );
  }

}

export default Login;