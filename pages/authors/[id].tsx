import React from 'react'
import get from 'lodash.get'
import withApollo from '../../lib/with-apollo'

import App from '../../components/App'
import QR from '../../components/QR'
import Card from '../../components/Card'
import Poem from '../../components/Poem'
import Pagination from '../../components/Pagination'
import AuthorComponent from '../../components/Author'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuthorQuery, useAuthorPoemsQuery } from '../../query'

function Author() {
  const router = useRouter()
  const { page = 1, id } = router.query as any
  const { data, loading } = useAuthorQuery({
    variables: {
      id,
    },
  })
  const { data: poemsData, loading: poemsLoading } = useAuthorPoemsQuery({
    variables: {
      id,
      page: Number(page),
    },
  })
  const author = data?.author
  const poems = poemsData?.author?.poems
  const poemsCount = poemsData?.author?.poemsCount || 10

  const phrases = poems?.flatMap(poem => poem.phrases)
  console.log(poems)

  function handleChange(page: number) {
    router.push({
      pathname: router.pathname,
      query: {
        page,
      },
    })
  }

  return (
    <App
      title={`${get(author, 'name', '')}_作者`}
      description={author?.intro || ''}
    >
      <style jsx>{`
        .container {
          display: flex;
        }

        .author {
          flex-grow: 1;
        }

        .side {
          flex-basis: 300px;
          flex-shrink: 0;
          margin-left: 20px;
        }

        .phrase {
          padding: 10px 0;
          display: block;
        }

        .phrase:not(:last-child) {
          border-bottom: 1px solid #eee;
        }

        .phrase-h1 {
          margin: 0;
          border-left: 8px solid #f609;
          padding-left: 10px;
          background-color: #fff;
          color: #666;
          min-height: 85px;

          padding: 20px; 
          margin-bottom: 15px;
      `}</style>
      <div className="container">
        <div className="author">
          <Card loading={loading}>
            {author && <AuthorComponent author={author} title="h1" />}
          </Card>
          {poems?.map((poem) => (
            <Card key={poem.id} loading={poemsLoading}>
              {poem && <Poem poem={poem as any} />}
            </Card>
          ))}
          <Pagination
            current={Number(page)}
            total={poemsCount}
            onChange={handleChange}
          />
        </div>
        <aside className="side">
          {/* <Card title="名句" loading={poemsLoading}>
            {
              phrases?.map(phrase =>
                <Link href="/poems/[id]/phrase/[phraseId]" as={`/poems/${id}/phrase/${phrase.id}`} key={phrase.id}>
                  <a className="phrase">{phrase.text}</a>
                </Link>
              )
            }
          </Card> */}
          <QR />
        </aside>
      </div>
    </App>
  )
}

export default withApollo(Author)
