import React from 'react'
import { Link, Router } from '../routes'

export default ({ author = {}, title = 'h2' }) => (
  <div>
    <style>{`
      .author {
        font-size: 1.1em; 
      } 
    `}</style>
    {
      React.createElement(title, {
        children: title === 'h1' ? author.name : (
          <Link route="author" params={{ uuid: author.uuid }}>
            <a>
              { author.name }
            </a>
          </Link>
        ) 
      }) 
    }
    <span className="author">
      { author.dynasty }
      { author.birthYear && author.deathYear ? `（${author.birthYear}年 ~ ${author.deathYear}年）` : ''}
    </span>
    <p>{ author.intro }</p>
  </div>
)
