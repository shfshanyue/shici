import React from 'react'

import App from '../../components/App'
import QR from '../../components/QR'
import Card from '../../components/Card'
import SearchBar from '../../components/SearchBar'
import Pagination from '../../components/Pagination'
import Author from '../../components/Author'
import Tags from '../../components/Tags'

import withApollo from '../../lib/with-apollo'
import { useRouter } from 'next/router'
import { useAuthorsQuery } from '../../query'

function Authors () {
  const router = useRouter()
  const { page = 1, q = '' } = router.query
  const { loading, data } = useAuthorsQuery({
    variables: {
      page: Number(page),
      q: String(q)
    }
  })
  const authors = data?.authors
  const authorsCount = data?.authorsCount ?? 50

  function handleChange(page: number) {
    router.push({
      pathname: router.pathname,
      query: {
        page,
        q
      }
    })
  }

  return (
    <App title="作者">
      <style jsx>{`
          .container {
            display: flex;
          }

          .authors {
            flex-grow: 1; 
          }

          .more {
            cursor: pointer; 
          }

          .side {
            flex-basis: 300px;
            flex-shrink: 0;
            margin-left: 20px;
          }
        `}</style>
      <div className="container">
        <div className="authors">
          <SearchBar q={String(q)} />
          {
            loading ?
              <>
                <Card loading={loading} />
                <Card loading={loading} />
                <Card loading={loading} />
                <Card loading={loading} />
                <Card loading={loading} />
              </> :
              authors?.map(author => (
                <Card loading={loading} key={author.id}>
                  <Author author={author} />
                </Card>
              ))
          }
          <Pagination current={Number(page)} total={authorsCount / 10} onChange={handleChange} />
        </div>
        <aside className="side">
          <Tags />
          <QR />
        </aside>
      </div>
    </App>
  )  
}

export default withApollo(Authors)
