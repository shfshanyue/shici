import { createElement, FC } from 'react'
import { Author as AuthorType } from '../query'
import Link from 'next/link'

interface Props {
  author: Partial<AuthorType>
  title?: string
}

const Author: FC<Props> = ({ author = {}, title = 'h2' }) => {
  return (
    <div>
      <style jsx>{`
        .author {
          font-size: 1.1em;
        }
      `}</style>
      {createElement(title, {
        children:
          title === 'h1' ? (
            author.name
          ) : (
            <Link href={`authors/${author.id}`}>
              <a>{author.name}</a>
            </Link>
          ),
      })}
      <span className="author">
        {author.dynasty}
        {author.birthYear && author.deathYear
          ? `（${author.birthYear}年 ~ ${author.deathYear}年）`
          : ''}
      </span>
      <p>{author.intro}</p>
    </div>
  )
}

export default Author
