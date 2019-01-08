import _ from 'lodash'
import { withRouter } from 'next/router'
import Card from './Card'
import { Router, Link } from '../routes'

const SearchBar = ({ q, router: { pathname }}) => q ? (
  <Card>
    <style jsx>{`
      .bar {
        display: flex; 
        justify-content: space-between;
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
