import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { get, map, omit, merge, flatten } from '../../lib/utils'

import App from '../../components/App'
import QR from '../../components/QR'
import Card from '../../components/Card'
import Paragraph from '../../components/Paragraph'
import Author from '../../components/Author'

import PoemComponent from '../../components/Poem'
import { Link } from '../../routes'
import { POEM, POEM_USER_STAR } from '../../query.gql'

class Poem extends Component {
  static async getInitialProps({ query }) {
    return query
  }

  renderAnnotations () {
    const { poem: { annotations = [] }, loading } = this.props
    return annotations.length ? (
      <Card loading={loading}>
        <h3>注释</h3>
        <ul>
          { map(annotations, (a, index) => (
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

  render () {
    const { poem, loading } = this.props
    return (
      <App title={`${poem.title || ''}_诗词`} description={poem.paragraphs && poem.paragraphs.join('')}>
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
        `}</style>
        <div className="container">
          <div className="poem">
            <Card loading={loading}>
              <PoemComponent
                poem={omit(poem, ['author', 'uuid'])}
                highlightWords={this.props.phrase || map(poem.phrases, phrase => phrase.phrase)}
              />
            </Card>
            {this.renderAnnotations()}
            <Paragraph text={poem.translation} title="翻译" loading={loading} />
            <Paragraph text={poem.intro} title="简介" loading={loading} />
            <Paragraph text={poem.appreciation} title="赏析" loading={loading} />
            {
              flatten(map(poem.tags, tag => tag.poems)).filter(poem => poem.paragraphs.join('').length < 100).map((poem, i) =>
                <Card loading={loading} key={poem.id} title={i ? '' : '更多相关诗词推荐'}>
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
                  <Link route="poem" params={{ uuid: poem.uuid, phrase: phrase.phrase }} key={phrase.id}>
                    <a className="phrase">{phrase.phrase}</a>
                  </Link>
                )
              }
            </Card>
            {
              get(poem, 'author.poems', []).filter(poem => poem.paragraphs.join('').length < 100).map((poem, i) =>
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
}

export default compose(
  graphql(POEM_USER_STAR, {
    options ({ uuid }) {
      return {
        variables: {
          uuid
        } 
      } 
    },
    skip: !process.browser
  }),
  graphql(POEM, {
    options ({ uuid }) {
      return {
        variables: {
          uuid
        }
      }
    },
    props ({ data, ownProps }) {
      const lastPoem = get(ownProps, 'data.poem', {})
      return {
        poem: merge(lastPoem, data.poem),
        loading: data.loading
      } 
    }
  })
)(Poem)
