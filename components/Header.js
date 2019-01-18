import Link from 'next/link'
import { withRouter } from 'next/router'
import { Input } from 'antd'
import { startsWith } from '../lib/utils'
import { Router } from '../routes'

const Search = Input.Search;

const handleSearch = (value) => {
  Router.pushRoute('poems', {
    q: value 
  })
}

const Header = ({ router: { query, asPath } }) => (
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
        <a className={startsWith(asPath, '/phrases') ? 'active' : ''}>名句</a>
      </Link>
      <Search
        defaultValue={query.q}
        placeholder={query.q || '将进酒'}
        onSearch={handleSearch}
        style={{ marginLeft: 20 }}
        enterButton
      />
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

      @media (max-width: 575px) {
        header {
          margin-bottom: 1px; 
        }
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
    `}</style>
  </header>
)

export default withRouter(Header)
