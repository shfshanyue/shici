import React, { Component } from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { startsWith } from '../lib/utils'
import { Router } from '../routes'

import Search from './Search'

class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      toggle: false 
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.handleTouchStart = this.handleTouchStart.bind(this)
  }

  handleSearch (value) {
    Router.pushRoute('poems', {
      q: value 
    })
  }

  handleTouchStart () {
    this.setState({
      toggle: !this.state.toggle 
    })
  }

  render () {
    const { router: { query, asPath } } = this.props
  
    return (
      <header>
        <div className="container">
          <Link href="/">
            <span className="title">诗词弦歌</span>
          </Link>
          <Link prefetch href='/'>
            <a className={startsWith(asPath, '/poems') || asPath === '/' ? 'active' : ''}>首页</a>
          </Link>
          <Link prefetch href='/authors'>
            <a className={startsWith(asPath, '/authors') ? 'active' : ''}>作者</a>
          </Link>
          <Link prefetch href='/phrases'>
            <a className={asPath.indexOf('phrase') !== -1 ? 'active' : ''}>名句</a>
          </Link>
          <div className="search-box">
            <Search
              defaultValue={query.q}
              placeholder={query.q || '将进酒'}
              onSearch={this.handleSearch}
              style={{ marginLeft: 20 }}
            />
          </div>
          <div className="button more" onTouchStart={this.handleTouchStart} >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path fill="#888" d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
          </div>
        </div>
        <div className={`container mobile-container ${this.state.toggle ? 'active' : ''}`}>
          <div className="item">
            <Search
              defaultValue={query.q}
              placeholder={query.q || '将进酒'}
              onSearch={this.handleSearch}
            />
          </div>
        </div>
        <style jsx>{`
          header {
            margin-bottom: 20px;
            line-height: 53px;
            background-color: #fff;
            box-shadow: 0 1px 3px rgba(26,26,26,.1);
            position: fixed;
            width: 100%;
            z-index: 1;
          }

          .search-box {
            display: flex; 
          }

          @media (max-width: 575px) {
            header {
              margin-bottom: 1px; 
              padding: 0 20px;
            }
            .search-box {
              display: none; 
            }
            .more.button {
              display: flex; 
              padding: 0 10px;
              align-items: center;
            }
          }

          .item {
            height: 53px; 
            width: 100%;
            display: flex;
            border-top: 1px solid #f6f6f6;
          }

          .container {
            display: flex;
          }

          .mobile-container {
            display: none; 
            opacity: 0;
            transition: all ease .3s;
          }

          .mobile-container.active {
            opacity: 1;
            display: flex; 
          }

          .title {
            font-size: 25px; 
            color: #f60;
            cursor: pointer;
          }

          a {
            font-size: 18px;
            margin-left: 20px;
            color: #888;
          }

          a.active {
            color: #f60; 
          }

          .more {
            display: none;
          }
        `}</style>
      </header>
    )
  }
}

export default withRouter(Header)
