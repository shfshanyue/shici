import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'next/router'

import { get } from '../../lib/utils'

import { Link, Router } from '../../routes'

import App from '../../components/App'
import QR from '../../components/QR'
import Card from '../../components/Card'
import Pagination from '../../components/Pagination'

const PHRASES = gql`
  query PHRASES ($page: Int, $pageSize: Int) {
    phrases (page: $page, pageSize: $pageSize) {
      id
      phrase
      authorName
      poem {
        uuid
        title
        author {
          uuid
          name
          dynasty
        }
      }
    }
    phrasesCount
  }
`

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      verifyCode: '',
      canSend: true
    }
    this.handleSendEmail = this.handleSendEmail.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSendEmail () {
    this.setState({
      canSend: false 
    }) 
  }

  handleSubmit (isLogin) {
  
  }

  render () {
    const { email, password, verifyCode, canSend } = this.state
    const isLogin = this.props.router.route === '/login'
    return (
      <App title="登录">
        <style jsx>{`
          .login {
            margin-top: 50px;
            width: 480px;
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
            margin-top: 10px;
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
          input:not([value=""]) + label {
            color: #f60; 
            font-size: 0.8em;
            transform: translateY(-150%);
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
        <form className="container login">
          <Card>
            <div className="input-wrapper">
              <input type="email" required onChange={(e) => this.setState({ email: e.target.value })} value={email} />
              <label className={email ? 'active' : ''}>邮箱</label>
              {
                isLogin ||
                  <span className={`verifyCode ${canSend ? '': 'disactive'}`} onClick={this.handleSendEmail}>
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
                    onChange={(e) => this.setState({ verifyCode: e.target.value })}
                    value={verifyCode}
                  />
                  <label className={verifyCode ? 'active' : ''}>邮箱验证码</label>
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
            <input type="submit" value={ isLogin ? '登录' : '注册' } onClick={this.handleSubmit(isLogin)} className="button" />
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

export default withRouter(Login)
