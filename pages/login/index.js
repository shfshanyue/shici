import React, { Component } from 'react'
import { graphql, withApollo } from 'react-apollo'
import { withRouter } from 'next/router'

import { get, compose } from '../../lib/utils'
import withApolloClient from '../../lib/with-apollo'

import { Link, Router } from '../../routes'

import App from '../../components/App'
import Card from '../../components/Card'

import { REGISTER, LOGIN, SEND_VERIFY_CODE } from '../../query/index.gql'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      verifyCode: '',
      username: '',
      canSend: true
    }
    this.sendVerifyCode = this.sendVerifyCode.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this._token = ''
  }

  sendVerifyCode () {
    this.props.sendVerifyCode({
      variables: {
        email: this.state.email 
      }
    }).then(({ data }) => {
      this._token = data.token
    })
    this.setState({
      canSend: false 
    }) 
  }

  handleSubmit (e) {
    e.preventDefault()
    const { email, username, password, verifyCode } = this.state
    const isLogin = this.props.router.asPath.indexOf('/login') !== -1
    if (isLogin) {
      this.props.login({
        variables: {
          email,
          password
        } 
      }).then(({ data: { createUserToken }}) => {
        if (createUserToken) {
          // 登录时注意清空以前的 cache
          // TODO: 只需要清空带有权限信息 Query 的 cache
          this.props.client.resetStore()
          localStorage.token = createUserToken 
          Router.pushRoute('/')
        }
      })
    } else {
      this.props.register({
        variables: {
          email,
          name: username,
          password,
          token: this._token,
          verifyCode
        } 
      }).then(({ data: { createUser } })=> {
        if (get(createUser, 'id')) {
          Router.pushRoute('/login')
        }
      })
    }
  }

  render () {
    const { email, password, verifyCode, canSend, username } = this.state
    const isLogin = this.props.router.asPath.indexOf('/login') !== -1
    return (
      <App title="登录">
        <style jsx>{`
          .login {
            margin-top: 50px;
            width: 480px;
          }

          @media (max-width: 575px) {
            .login {
              margin-top: 0;
              width: 100%;
            }
          }

          input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0 30px #fff inset;
          }

          input {
            height: 48px; 
            color: #1a1a1a;
            border: none;
            border-bottom: 1px solid #ebebeb;
            width: 100%;
            font-size: 1.2em;
            margin-top: 16px;
          }

          input::before {
            content: "";
            position: absolute;
            display: block;
            width: 100%;
            height: 2px;
            background-color: #e2e2e2;
            bottom: 0;
            left: 0;
            transition: all 0.5s;
          }

          .button {
            width: 100%; 
            height: 36px;
            border: none;
            background-color: #f60;
            border-radius: 4px;
            color: #fff;
            font-size: 1.2em;
            margin: 34px 0;
            cursor: pointer;
          }

          .input-wrapper {
            position: relative; 
          }

          label {
            position: absolute;
            // (48 - 27) / 2
            bottom: 10px;
            left: 0;
            font-size: 1.2em;
            color: #ccc;
            transition: all ease 0.3s;
            pointer-events: none;
          }

          input:focus + label,
          input:not([value=""]) + label,
          input:valid + label {
            color: #f60; 
            font-size: 0.8em;
            transform: translateY(-180%);
          }

          .verifyCode {
            position: absolute;
            right: 0;
            bottom: 10px;
            font-size: 1.2em;
            color: #f60;
            cursor: pointer; 
          }

          .verifyCode.disactive {
            color: #999; 
          }
        `}</style>
        <form className="container login" onSubmit={this.handleSubmit} >
          <Card>
            <div className="input-wrapper">
              <input type="email" required onChange={(e) => this.setState({ email: e.target.value })} value={email} />
              <label className={email ? 'active' : ''}>邮箱</label>
              {
                isLogin ||
                  <span className={`verifyCode ${canSend ? '': 'disactive'}`} onClick={this.sendVerifyCode}>
                    {
                      canSend ? '发送邮件' : '稍后再发'
                    }
                  </span>
              }
            </div>
            {
              isLogin ||
                <div className="input-wrapper">
                  <input
                    required
                    type="text"
                    min="6"
                    max="6"
                    onChange={(e) => this.setState({ verifyCode: e.target.value })}
                    value={verifyCode}
                  />
                  <label className={verifyCode ? 'active' : ''}>邮箱验证码</label>
                </div>
            }
            {
              isLogin || <div className="input-wrapper">
                <input
                  required
                  type="text"
                  onChange={(e) => this.setState({ username: e.target.value })}
                  value={username}
                />
                <label className={password ? 'active' : ''}>昵称</label>
              </div>
            }
            <div className="input-wrapper">
              <input
                required
                type="password"
                onChange={(e) => this.setState({ password: e.target.value })}
                value={password}
              />
              <label className={password ? 'active' : ''}>密码</label>
            </div>
            <button className="button">
              { isLogin ? '登录' : '注册' } 
            </button>
            <div className="text-center">
              {
                isLogin ? 
                  <Link href="/register">
                    <a>没有账号，注册</a>
                  </Link> :
                  <Link href="/login">
                    <a>已有账号，登录</a>
                  </Link>
              }
            </div>
          </Card>
        </form>
      </App>
    ) 
  }
}

export default compose(
  withApolloClient,
  withRouter,
  withApollo,
  graphql(LOGIN, {
    name: 'login'
  }),
  graphql(REGISTER, {
    name: 'register' 
  }),
  graphql(SEND_VERIFY_CODE, {
    name: 'sendVerifyCode' 
  })
)(Login)
