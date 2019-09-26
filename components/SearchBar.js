import { withRouter } from 'next/router'
import Card from './Card'
import { Link } from '../routes'

const SearchBar = ({ q, router: { pathname }}) => q ? (
  <Card>
    <style jsx>{`
      .bar {
        display: flex; 
        justify-content: space-between;
        align-items: center;
      }
      a {
        font-size: 18px;
        margin-left: 20px;
        color: #888;
      }

      a.active {
        color: #f60; 
      }

      h3 {
        margin: 0; 
      }
    `}</style>
    <div className="bar">
      <h3>{ q }</h3>
      <div>
        <Link route="poems" params={{ q }}>
          <a className={pathname === '/poems' ? 'active' : ''}>
            诗词
          </a>
        </Link>
        <Link route="authors" params={{ q }}>
          <a className={pathname === '/authors' ? 'active' : ''}>
            作者 
          </a>
        </Link>
      </div>
    </div>
  </Card>
) : null

export default withRouter(SearchBar)
