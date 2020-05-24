import React from 'react'

import * as routes from '../../routes'

const { Link } = routes

import App from '../../components/App'
import QR from '../../components/QR'
import Tags from '../../components/Tags'
import Card from '../../components/Card'
import Pagination from '../../components/Pagination'

import withApollo from '../../lib/with-apollo'
import { useRouter } from 'next/router'
import { usePhrasesQuery } from '../../query'

function Phrases () {
  const router = useRouter()
  const { page = 1 } = router.query
  const { data, loading } = usePhrasesQuery({
    variables: {
      page: Number(page),
      pageSize: 20
    }
  })
  const phrases = data?.phrases
  const phrasesCount = data?.phrasesCount ?? 30

  function handleChange (page: number) {
    router.push({
      pathname: router.pathname,
      query: {
        page
      }
    })
  }

  return (
    <App title="名句">
      <style jsx>{`
          .container {
            display: flex;
          }

          .phrases {
            flex-grow: 1; 
          }

          .side {
            flex-basis: 300px;
            flex-shrink: 0;
            margin-left: 20px;
          }
        `}</style>
      <div className="container">
        <div className="phrases">
          {
            loading ?
              <>
                <Card loading={loading} />
                <Card loading={loading} />
                <Card loading={loading} />
              </> :
              phrases?.map(phrase => (
                <Card key={phrase.id}>
                  <div className="phrase">
                    <Link route="phrase" params={{ id: phrase.poem.id, phraseId: phrase.id }}>
                      <a>
                        {phrase.text}
                      </a>
                    </Link>
                    <div style={{ marginTop: '10px' }}>
                      <span>
                        {phrase.poem.author?.dynasty}·{phrase.poem.author?.name}
                      </span>
                      <span>
                        《{phrase.poem.title}》
                    </span>
                    </div>
                  </div>
                </Card>
              ))
          }
          <Pagination
            current={Number(page)}
            total={phrasesCount}
            onChange={handleChange}
            pageSize={20}
          />
        </div>
        <aside className="side">
          <Tags />
          <QR />
        </aside>
      </div>
    </App>   
  )
}


export default withApollo(Phrases)
