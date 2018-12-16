import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import _ from 'lodash'

import App from '../../components/App'
import QR from '../../components/QR'
import Card from '../../components/Card'

const AUTHOR = gql`
  query AUTHOR ($uuid: ID!) {
    author (uuid: $uuid) {
      id
      uuid
      name
      intro
    }
  }
`

class Author extends Component {
  static async getInitialProps({ query }) {
    return query
  }

  renderAnnotations () {
    const { author: { annotations = [] }, loading } = this.props
    return annotations.length ? (
      <Card loading={loading}>
        <h3>注释</h3>
        <ul>
          { _.map(annotations, (a, index) => (
            <li key={index}>
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
    const { author, loading } = this.props
    return (
      <App title={author.title}>
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

          .author {
            font-size: 1.1em; 
          }
        `}</style>
      <div className="container">
        <div className="author">
          <Card loading={loading}>
            <h2>
              { author.name }
            </h2>
            <div className="author">
              { _.get(author, 'dynasty') }
            </div>
            <div>
              {
                author.intro 
              }
            </div>
          </Card>
        </div>
        <aside className="side">
          <QR />
        </aside>
      </div>
    </App>
    )
  }
}

export default compose(
  graphql(AUTHOR, {
    options ({ uuid }) {
      return {
        variables: {
          uuid
        }
      }
    },
    props ({ data, ...rest }) {
      return {
        author: data.author || {},
        loading: data.loading
      } 
    }
  })
)(Author)
