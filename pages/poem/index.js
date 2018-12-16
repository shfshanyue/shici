import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import _ from 'lodash'

import App from '../../components/App'
import QR from '../../components/QR'
import Card from '../../components/Card'
import Paragraph from '../../components/Paragraph'

import Author from './Author'

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
          { _.map(annotations, (a, index) => (
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
      <App title={poem.title} description={poem.paragraphs && poem.paragraphs.join('').slice(0, 255)}>
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
            <div className="author">
              { _.get(poem, 'author.dynasty') }·{ _.get(poem, 'author.name') }
            </div>
            <div>
              {
                _.map(poem.paragraphs, (p, index) => (
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
