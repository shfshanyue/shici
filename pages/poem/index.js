import React from 'react'
import { useQuery } from 'react-apollo'
import { get, map, omit, flatten, uniq } from '../../lib/utils'

import App from '../../components/App'
import QR from '../../components/QR'
import Card from '../../components/Card'
import Paragraph from '../../components/Paragraph'
import Author from '../../components/Author'

import PoemComponent from '../../components/Poem'
import { Link } from '../../routes'
import { POEM, POEM_USER_STAR } from '../../query/index.gql'

function Poem ({ id, phraseId }) {

  const { data: authData = {} } = useQuery(POEM_USER_STAR, {
    // not work
    // 有可能与 POEM 这个 query 有关
    ssr: false,
    variables: { id }
  })

  const { data = {}, loading } = useQuery(POEM, {
    variables: {
      poemId: id,
      phraseId
    }
  })

  const poem = { ...data.poem, ...authData.poem }
  const poems = get(poem, 'poems', [])
  const poemId = poem.id

  const phrase = get(data, 'phrase.text', '')

  const renderAnnotations = () => {
    const { annotations = [] } = poem
    return annotations.length ? (
      <Card loading={loading}>
        <h3>注释</h3>
        <ul>
          {map(annotations, (a, index) => (
            <li key={index} key={index}>
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
            background-color: #f601;
            color: #666;
          }
        `}</style>
      <div className="container">
        <div className="poem">
          {
            phraseId && <Card loading={loading}>
              <h1 className="phrase-h1">{phrase.slice(0, -1)}</h1>
            </Card>
          }
          <Card loading={loading}>
            <PoemComponent
              title={phraseId ? 'h2' : 'h1'}
              poem={omit(poem, ['author', phraseId ? '' : 'id'])}
              highlightWords={phraseId ? phrase : map(poem.phrases, phrase => phrase.phrase)}
            />
          </Card>
          {renderAnnotations()}
          <Paragraph text={poem.translation} title="翻译" loading={loading} />
          <Paragraph text={poem.intro} title="简介" loading={loading} highlight />
          <Paragraph text={poem.appreciation} title="赏析" loading={loading} highlight />
          {
            uniq(flatten(map(poem.tags, tag => tag.poems)), 'id').filter(poem => poem.paragraphs.join('').length < 100 && poem.id !== poemId).map((poem, i) =>
              <Card loading={loading} key={poem.id} title={i ? '' : '更多相关诗词推荐'}>
                <PoemComponent poem={poem} />
              </Card>
            )
          }
          {
            !get(poem, 'tags.length') && poems.filter(poem => poem.paragraphs.join('').length < 100 && poem.id !== poemId).map((poem, i) =>
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
                <Link route="phrase" params={{ id: poem.id, phraseId: phrase.id }} key={phrase.id}>
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

Poem.getInitialProps = ({ query }) => query

export default Poem