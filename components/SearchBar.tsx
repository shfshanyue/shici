import { useRouter } from 'next/router'
import classNames from 'classnames'
import Card from './Card'
import * as routes from '../routes'

const { Link } = routes

interface Props {
  q?: string
};

const SearchBar = ({ q }: Props) => {
  const { pathname } = useRouter()

  return q ? (
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
        <h3>{q}</h3>
        <div>
          <Link route="poems" params={{ q }}>
            <a className={classNames({ active: pathname === '/poems' })}>
              诗词
          </a>
          </Link>
          <Link route="authors" params={{ q }}>
            <a className={classNames({ active: pathname === '/authors' })}>
              作者
          </a>
          </Link>
        </div>
      </div>
    </Card>
  ) : null
}


export default SearchBar
