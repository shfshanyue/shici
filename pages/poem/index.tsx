import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { map, omit } from '../../lib/utils'

import get from 'lodash.get'
import uniqBy from 'lodash.uniqby'

import App from '../../components/App'
import QR from '../../components/QR'
import Card from '../../components/Card'
import Paragraph from '../../components/Paragraph'
import Author from '../../components/Author'
import PoemComponent from '../../components/Poem'

import { usePoemQuery, usePoemUserStarQuery } from '../../query'
import withApollo from '../../lib/with-apollo'

function Poem () {
  const { query: { id, phraseId } } = useRouter() as any

  const { data: authData } = usePoemUserStarQuery({
    // not work
    // 有可能与 POEM 这个 query 有关
    ssr: false,
    variables: { id }
  })

  const { data, loading } = usePoemQuery({
    ssr: true,
    variables: {
      poemId: Number(id) ? id : null,
      poemUUID: Number(id) ? null : id,
      phraseId
    }
  })


  const poem: any = { ...data?.poem, ...authData?.poem }
  const poems = data?.poems || []
  const poemId = data?.poem?.id

  const phrase = get(data, 'phrase.text', '')

  const renderAnnotations = () => {
    const { annotations = [] } = poem
    return annotations.length ? (
      <Card loading={loading}>
        <h3>注释</h3>
        <ul>
          {map(annotations, (a: any) => (
            <li key={a.key}>
              <p>
                <i>{a.key}:</i> {a.value}
              </p>
            </li>
          ))}
        </ul>
      </Card>
    ) : ''
  }

  return (
    <App title={`${phraseId ? phrase + '_名句' : get(poem, 'title', '') + '_诗词'}`} description={poem.paragraphs && poem.paragraphs.join('')}>
      <style jsx>{`
          .container {
            display: flex;
          }

          .poem {
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
          }
        `}</style>
      <div className="container">
        <div className="poem">
          {
            phraseId &&
              <h1 className="phrase-h1">{phrase.slice(0, -1)}</h1>
          }
          <Card loading={loading}>
            <PoemComponent
              title={phraseId ? 'h2' : 'h1'}
              poem={omit(poem, ['author', phraseId ? '' : 'id']) as any}
              highlightWords={phraseId ? phrase : data?.poem?.phrases?.map(phrase => phrase.text)}
            />
          </Card>
          {renderAnnotations()}
          <Paragraph text={poem.translation} title="翻译" loading={loading} />
          <Paragraph text={poem.intro} title="简介" loading={loading} highlight />
          <Paragraph text={poem.appreciation} title="赏析" loading={loading} highlight />
          {
            uniqBy(data?.poem?.tags?.flatMap(tag => tag.poems), 'id')
              .filter(poem => poem.paragraphs.join('').length < 100 && poem.id !== poemId)
              .map((poem, i) =>
                <Card loading={loading} key={poem.id} title={i ? '' : '相关诗词推荐'}>
                  <PoemComponent poem={poem} />
                </Card>
            )
          }
          {
            poems.filter(poem => poem.paragraphs.join('').length < 100 && poem.id !== poemId).map((poem, i) =>
              <Card loading={loading} key={poem.id} title={i ? '' : '更多诗词推荐'}>
                <PoemComponent poem={poem} />
              </Card>
            )
          }
        </div>
        <aside className="side">
          <Card loading={loading}>
            <Author author={poem.author} />
          </Card>
          <Card title="名句" loading={loading}>
            {
              get(poem, 'phrases', []).map(phrase =>
                <Link href="/poems/[id]/phrase/[phraseId]" as={`/poems/${id}/phrase/${phrase.id}`} key={phrase.id}>
                  <a className="phrase">{phrase.text}</a>
                </Link>
              )
            }
          </Card>
          {
            get(poem, 'author.poems', []).filter(poem => poem.paragraphs.join('').length < 100 && poem.id !== poemId).map((poem, i) =>
              <Card loading={loading} key={poem.id} title={i ? '' : '更多作者诗词推荐'}>
                <PoemComponent poem={poem} />
              </Card>
            )
          }
          <QR />
        </aside>
      </div>
    </App>
  )
}

export default withApollo(Poem)
