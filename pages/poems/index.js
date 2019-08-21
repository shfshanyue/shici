import React, { useState } from 'react'
import { useQuery } from 'react-apollo'

import Pagination from '../../components/Pagination'
import { get, merge } from '../../lib/utils'
import { Router } from '../../routes'

import App from '../../components/App'
import QR from '../../components/QR'
import Card from '../../components/Card'
import SearchBar from '../../components/SearchBar'
import Poem from '../../components/Poem'
import Tag from '../../components/Tag'
import Tags from '../../components/Tags'

import { POEMS, POEMS_USER_STAR } from '../../query/index.gql'

function Poems ({
  q,
  tagId,
  tagName,
  page,
}) {
  const [activeIds, setActiveIds] = useState({})
  const { data: starData } = useQuery(POEMS_USER_STAR, {
    variables: { page, q, tagId },
    skip: !process.browser
  })
  const { loading, data } = useQuery(POEMS, {
    variables: { page, q, tagId }
  })

  const lastPoems = get(starData, 'poems', [])
  const currentPoems = get(data, 'poems', [1, 2, 3, 4, 5].map(id => ({ id })))

  const poems = merge(lastPoems, currentPoems)
  const poemsCount = data.poemsCount || 10
        
  function handleChange (page) {
    Router.pushRoute('poems', {
      page,
      q,
      tagId,
      tagName
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
            poems.map(poem => (
              <Card loading={loading} key={poem.id}>
                <Poem
                  poem={poem}
                  active={Boolean(activeIds[poem.id])}
                  highlightWords={[q]}
                  onMore={() => {
                    setActiveIds({
                      ...activeIds,
                      [poem.id]: 1
                    })
                  }}
                />
              </Card>
            ))
          }
          <Pagination showQuickJumper current={Number(page)} total={poemsCount} onChange={handleChange} />
        </div>
        <aside className="side">
          <Tags />
          <QR />
        </aside>
      </div>
    </App>
  )  
}

Poems.getInitialProps = ({ query }) => {
  return {
    page: 1,
    ...query
  }
}

export default Poems
