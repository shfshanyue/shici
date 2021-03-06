import React, { useState } from 'react'
import { useRouter } from 'next/router'
import classNames from 'classnames'

import { get } from '../lib/utils'
import { useMeQuery } from '../query'

import Search from './Search'
import Avator from './Avator'
import Link from 'next/link'

function Header() {
  const [toggle, setToggle] = useState(false)
  // TODO
  const { query, asPath } = useRouter()
  const { data, loading } = useMeQuery({
    ssr: false,
  })

  const router = useRouter()
  const userId = get(data, 'me.id')
  const username = get(data, 'me.name')

  function handleSearch(value: string) {
    router.push({
      pathname:'poems',
      query: `q=${value}`,
    })
  }

  function renderMobile() {
    return (
      <div className={`container mobile-container ${toggle ? 'active' : ''}`}>
        <style jsx>{`
          .item {
            height: 53px;
            width: 100%;
            display: flex;
            justify-content: flex-start;
            border-top: 1px solid #f6f6f6;
            padding: 0 20px;
          }

          .container {
            display: flex;
            position: relative;
          }

          .mobile-container {
            display: none;
            opacity: 0;
            transition: all ease 0.3s;
          }

          .mobile-container.active {
            opacity: 1;
            display: flex;
            flex-direction: column;
          }
        `}</style>
        <div className="item">
          <Link href='/poems'>
            <a
              className={
                (asPath.startsWith('/poems') &&
                  asPath.indexOf('phrase') === -1) ||
                asPath === '/'
                  ? 'active'
                  : ''
              }
            >
              诗词
            </a>
          </Link>
        </div>
        <div className="item">
          <Link href='/authors'>
            <a
              className={classNames({ active: asPath.startsWith('/authors') })}
            >
              作者
            </a>
          </Link>
        </div>
        <div className="item">
          <Link href='/poems'>
            <a className={classNames({ active: asPath.includes('phrase') })}>
              名句
            </a>
          </Link>
        </div>
        <div className="item">
          <Search
            defaultValue={query.q ? String(query.q) : '将进酒'}
            placeholder={query.q ? String(query.q) : '将进酒'}
            onSearch={handleSearch}
          />
        </div>
      </div>
    )
  }

  function render() {
    return (
      <header>
        <div className="container">
          <Link href="/">
            <a className="title">诗词弦歌</a>
          </Link>
          <Link href="/phrases">
            <a
              className={classNames('hidden-xs', {
                active: asPath.includes('phrase') || asPath === '/',
              })}
            >
              名句
            </a>
          </Link>
          <Link href="/poems">
            <a
              className={
                asPath.startsWith('/poems') && asPath.indexOf('phrase') === -1
                  ? 'active hidden-xs'
                  : 'hidden-xs'
              }
            >
              诗词
            </a>
          </Link>
          <Link href="/authors">
            <a
              className={
                asPath.startsWith('/authors') ? 'active hidden-xs' : 'hidden-xs'
              }
            >
              作者
            </a>
          </Link>
          <div className="search-box">
            <Search
              defaultValue={query.q ? String(query.q) : '将进酒'}
              placeholder={query.q ? String(query.q) : '将进酒'}
              onSearch={handleSearch}
              style={{ marginLeft: 20 }}
            />
          </div>
          {/* {loading ? null : username ? (
            <a className="active user">
              <Avator name={username} />
            </a>
          ) : (
            <Link href="/login">
              <a className="active" style={{ marginLeft: 'auto' }}>
                登录
              </a>
            </Link>
          )} */}
          <div className="button more" onTouchStart={() => setToggle(!toggle)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path fill="none" d="M0 0h24v24H0V0z" />
              <path
                fill="#888"
                d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
              />
            </svg>
          </div>
          <div className="dropdown-menu">

            {/* <Link
              href="/profile"
              params={{ userId: String(userId), tag: 'stars' }}
            >
              <a className="dropdown-item">个人中心</a>
            </Link> */}
            <a
              className="dropdown-item"
              href=""
              onClick={() => (localStorage.token = '')}
            >
              注销
            </a>
          </div>
        </div>
        {renderMobile()}
        <style jsx>{`
          header {
            margin-bottom: 20px;
            line-height: 53px;
            background-color: #fff;
            box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
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

          .container {
            display: flex;
            position: relative;
          }

          .title {
            font-size: 25px;
            color: #f60;
            cursor: pointer;
            margin-left: 0;
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

          .user {
            margin-left: auto;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .user:hover ~ .dropdown-menu,
          .dropdown-menu:hover {
            display: block;
          }

          .dropdown-item {
            display: block;
          }

          .dropdown-menu {
            display: none;
            width: 8rem;
            position: absolute;
            right: 0;
            top: 100%;
            background-color: #fff;
            border: 1px solid rgba(177, 180, 185, 0.45);
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
          }
        `}</style>
      </header>
    )
  }
  return render()
}

export default Header
