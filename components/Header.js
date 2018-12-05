import Link from 'next/link'
import { withRouter } from 'next/router'

const Header = ({ router: { pathname } }) => (
  <header>
    <div className="container">
      <Link prefetch href='/'>
        <a className={pathname === '/' ? 'is-active' : ''}>首页</a>
      </Link>
      <Link prefetch href='/poems'>
        <a className={pathname === '/poems' ? 'is-active' : ''}>诗词</a>
      </Link>
    </div>
    <style jsx>{`
      header {
        margin-bottom: 25px;
        height: 53px;
        line-height: 53px;
        background-color: #fff;
        box-shadow: 0 1px 3px rgba(26,26,26,.1);
      }
      a {
        font-size: 18px;
        margin-right: 15px;
        text-decoration: none;
      }
      .is-active {
        color: red;
        text-decoration: none;
      }
    `}</style>
  </header>
)

export default withRouter(Header)
