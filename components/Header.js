import Link from 'next/link'
import { withRouter } from 'next/router'
import { Input } from 'antd'
import { Router } from '../routes'

const Search = Input.Search;

const handleSearch = (value) => {
  Router.pushRoute('poems', {
    q: value 
  })
}

const Header = ({ router: { pathname, query } }) => (
  <header>
    <div className="container">
      <Link prefetch href='/'>
        <a>首页</a>
      </Link>
      <Link prefetch href='/authors'>
        <a>作者</a>
      </Link>
      <Link prefetch href='/phrases'>
        <a>名句</a>
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

      a {
        font-size: 18px;
        margin-left: 20px;
      }
    `}</style>
  </header>
)

export default withRouter(Header)
