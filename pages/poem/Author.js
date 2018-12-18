import { Link, Router } from '../../routes'

export default ({ author }) => (
  <div>
    <style>{`
      .author {
        font-size: 1.1em; 
      } 
    `}</style>
    <h3>
      <Link route="author" params={{ uuid: author.uuid }} prefetch>
        <a>
          { author.name }
        </a>
      </Link>
    </h3>
    <span className="author">
      { author.dynasty }
      { author.birthYear && author.deathYear ? `（${author.birthYear}~${author.deathYear}）` : ''}
    </span>
    <p>{ author.intro }</p>
  </div>
)
