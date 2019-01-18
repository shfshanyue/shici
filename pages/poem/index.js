import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { get, map } from '../../lib/utils'

import App from '../../components/App'
import QR from '../../components/QR'
import Card from '../../components/Card'
import Paragraph from '../../components/Paragraph'

import Author from './Author'

import { Link, Router } from '../../routes'

const POEM = gql`
  query POEM ($uuid: ID!) {
    poem (uuid: $uuid) {
      id
      uuid
      title
      intro
      paragraphs
      appreciation
      translation
      kind
      annotations
      author {
        uuid
        name
        dynasty
        birthYear
        deathYear
        intro
      }
    }
  }
`

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
    const { poem, loading, phrase } = this.props
    return (
      <App title={`${poem.title}_诗词`} description={poem.paragraphs && poem.paragraphs.join('')}>
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
        `}</style>
      <div className="container">
        <div className="poem">
          <Card loading={loading}>
            <h2>
              { poem.title }
            </h2>
            <Link route="author" params={{ uuid: get(poem, 'author.uuid') }} prefetch>
              <span>
                { get(poem, 'author.dynasty') }·{ get(poem, 'author.name') }
              </span>
            </Link>
            <div>
              {
                map(poem.paragraphs, (p, index) => (
                  <p key={index}>
                    { p } 
                  </p>
                ))
              }
            </div>
          </Card>
          { this.renderAnnotations() }
          <Paragraph text={poem.translation} title="翻译" loading={loading} />
          <Paragraph text={poem.intro} title="简介" loading={loading} />
          <Paragraph text={poem.appreciation} title="赏析" loading={loading} />
        </div>
        <aside className="side">
          <Card loading={loading}>
            <Author author={poem.author || {}} />
          </Card>
          <QR />
        </aside>
      </div>
    </App>
    )
  }
}

export default compose(
  graphql(POEM, {
    options ({ uuid }) {
      return {
        variables: {
          uuid
        }
      }
    },
    props ({ data, ...rest }) {
      return {
        poem: data.poem || {},
        loading: data.loading
      } 
    }
  })
)(Poem)
