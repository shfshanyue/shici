import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'next/router'

import { Tooltip, Pagination } from 'antd'

import { Link, Router } from '../../routes'

import App from '../../components/App'
import QR from '../../components/QR'
import Card from '../../components/Card'

const AUTHORS = gql`
  query AUTHORS ($page: Int) {
    authors (page: $page) {
      id
      uuid
      name
      intro
      dynasty
    }
    authorsCount
  }
`

class Authors extends Component {
  static async getInitialProps({ query }) {
    return {
      page: query.page || 1 
    }
  }

  constructor (props) {
    super(props) 
  }

  handleChange (page) {
    Router.pushRoute(`/authors?page=${page}`)
  }

  render () {
    const { authors, loading } = this.props

    return (
      <App title="作者">
        <style jsx>{`
          .container {
            display: flex;
          }

          .authors {
            flex-grow: 1; 
          }

          .more {
            cursor: pointer; 
          }

          .side {
            flex-basis: 300px;
            flex-shrink: 0;
            margin-left: 20px;
          }
        `}</style>
      <div className="container">
        <div className="authors">
          {
            authors.map(author => (
              <Card loading={loading} key={author.id || author}>
                <div className="author">
                  <h2>
                    <Link route="author" params={{ uuid: author.uuid }} prefetch>
                      <a>
                        { author.name }
                      </a>
                    </Link>
                  </h2>
                  <div className="dynasty">
                    { author.dynasty }
                  </div>
                  <div>
                    { author.intro }
                  </div>
                </div>
              </Card>
            ))
          }
          <Pagination showQuickJumper hideOnSinglePage current={Number(this.props.page)} total={this.props.authorsCount / 10} onChange={this.handleChange} />
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
  graphql(AUTHORS, {
    props ({ data, ...rest }) {
      return {
        authors: data.authors || [1, 2, 3, 4, 5],
        authorsCount: data.authorsCount || 500,
        loading: data.loading
      }
    },
    options ({ page }) {
      return {
        variables: {
          page
        } 
      } 
    }
  }),
)(Authors)
