import React, { useState } from 'react'
import merge from 'lodash.merge'

import Pagination from '../../components/Pagination'

import App from '../../components/App'
import QR from '../../components/QR'
import Card from '../../components/Card'
import SearchBar from '../../components/SearchBar'
import Poem from '../../components/Poem'
import Tag from '../../components/Tag'
import Tags from '../../components/Tags'

import { usePoemsQuery, usePoemsUserStarQuery } from '../../query'
import withApollo from '../../lib/with-apollo'
import { useRouter } from 'next/router'

const Poems: React.FC = () => {
  const [activeIds, setActiveIds] = useState<Record<string, boolean>>({})
  const router = useRouter()
  const { query, pathname } = router
  const { page = 1, tagId, tagName, q } = query as any

  const { data: starData } = usePoemsUserStarQuery({
    variables: { page: page as number, q, tagId },
    skip: !process.browser
  })
  const { loading, data } = usePoemsQuery({
    variables: { page: page as number, q, tagId }
  })

  const poems = merge(data?.poems, starData?.poems)

  const poemsCount = data?.poemsCount || 10
        
  function handleChange (page: number) {
    router.push({
      pathname,
      query: {
        page,
        q,
        tagId,
        tagName
      }
    })
  }

  return (
    <App title="首页" description="诗词学习网致力于古诗文的整理，为每一个人传递中国诗词之美">
      <style jsx>{`
        .container {
          display: flex;
        }

        .poems {
          flex-grow: 1;
        }

        .side {
          flex-basis: 300px;
          flex-shrink: 0;
          margin-left: 20px;
        }

        .highlight {
          color: #f60; 
        }
      `}</style>
      <div className="container">
        <div className="poems">
          <SearchBar q={q} />
          {
            tagId &&
            <Card>
              <Tag>{tagName}</Tag>
            </Card>
          }
          {
            loading ?
              <>
                <Card loading={loading} />
                <Card loading={loading} />
                <Card loading={loading} />
              </> :
              poems?.map(poem => (
                <Card key={poem.id}>
                  <Poem
                    poem={poem}
                    active={Boolean(activeIds[poem.id])}
                    highlightWords={[q]}
                    onMore={() => {
                      setActiveIds({
                        ...activeIds,
                        [poem.id]: true
                      })
                    }}
                  />
                </Card>
              ))
          }
          <Pagination current={Number(page)} total={poemsCount} onChange={handleChange} />
        </div>
        <aside className="side">
          <Tags />
          <QR />
        </aside>
      </div>
    </App>
  )  
}

export default withApollo(Poems)
