import { Link, Router } from '../routes'

export default ({ author = {} }) => (
  <div>
    <style>{`
      .author {
        font-size: 1.1em; 
      } 
    `}</style>
    <h2>
      <Link route="author" params={{ uuid: author.uuid }}>
        <a>
          { author.name }
        </a>
      </Link>
      {
        author.baikeUrl && 
          <small style={{ marginLeft: '20px' }}>
            / <a href={author.baikeUrl} target="_blank">百度百科</a>
          </small>
      }
    </h2>
    <span className="author">
      { author.dynasty }
      { author.birthYear && author.deathYear ? `（${author.birthYear}年 ~ ${author.deathYear}年）` : ''}
    </span>
    <p>{ author.intro }</p>
  </div>
)
