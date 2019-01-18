import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { Tooltip } from 'antd'
import { get, map } from '../../lib/utils'

import { Router, Link } from '../../routes'

import App from '../../components/App'
import QR from '../../components/QR'
import Card from '../../components/Card'
import Pagination from '../../components/Pagination'

const AUTHOR = gql`
  query AUTHOR ($uuid: ID!, $page: Int) {
    author (uuid: $uuid) {
      id
      uuid
      name
      intro
      poems (page: $page) {
        id 
        uuid
        title
        kind
        paragraphs
      }
      poemsCount
    }
  }
`

class Author extends Component {
  static async getInitialProps({ query }) {
    return {
      page: 1,
      ...query, 
    }
  }

  constructor (props) {
    super(props) 
    this.handleChange = this.handleChange.bind(this)
  }

  renderAnnotations () {
    const { author: { annotations = [] }, loading } = this.props
    return annotations.length ? (
      <Card loading={loading}>
        <h3>注释</h3>
        <ul>
          { map(annotations, (a, index) => (
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

  handleChange (page) {
    Router.pushRoute(`/authors/${this.props.uuid}?page=${page}`)
  }

  render () {
    const { author, loading } = this.props
    return (
      <App title={`${get(author, 'name')}_作者`} description={author.intro}>
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
        `}</style>
      <div className="container">
        <div className="author">
          <Card loading={loading}>
            <h2>
              { author.name }
            </h2>
            <div className="author">
              { get(author, 'dynasty') }
            </div>
            <div>
              {
                author.intro 
              }
            </div>
          </Card>
          {
            get(author, 'poems', [1, 2, 3, 4, 5]).map(poem => (
              <Card key={poem.id || poem} loading={loading}>
                <h3>
                  <Link route="poem" params={{ uuid: poem.uuid }} prefetch>
                    <a>
                      { poem.title }
                    </a>
                  </Link>
                </h3>
                <div>{ get(poem, 'kink') === '文' ? get(poem, 'paragraphs.0') : get(poem, 'paragraphs', []).map(p => <p key={p}>{p}</p>) }</div>
              </Card>
            ))
          }
      <Pagination current={Number(this.props.page)} total={get(this.props, 'author.poemsCount', 20)} onChange={this.handleChange} />
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
    options ({ uuid, page }) {
      return {
        variables: {
          uuid,
          page
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
