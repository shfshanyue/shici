import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import { Router } from '../../routes'
import { compose } from '../../lib/utils'

import App from '../../components/App'
import QR from '../../components/QR'
import Card from '../../components/Card'
import SearchBar from '../../components/SearchBar'
import Pagination from '../../components/Pagination'
import Author from '../../components/Author'
import Tags from '../../components/Tags'

import { AUTHORS } from '../../query/index.gql'
import withApollo from '../../lib/with-apollo'

class Authors extends Component {
  static async getInitialProps({ query }) {
    return {
      page: 1,
      ...query
    }
  }

  constructor (props) {
    super(props) 
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (page) {
    Router.pushRoute('authors', {
      page,
      q: this.props.q, 
    })
  }

  render () {
    const { authors, loading, q } = this.props

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
          <SearchBar q={q} />
          {
            authors.map(author => (
              <Card loading={loading} key={author.id || author}>
                <Author author={author} />
              </Card>
            ))
          }
          <Pagination showQuickJumper current={Number(this.props.page)} total={this.props.authorsCount / 10} onChange={this.handleChange} />
        </div>
        <aside className="side">
          <Tags />
          <QR />
        </aside>
      </div>
    </App>
    )  
  }
}

export default compose(
  withApollo,
  graphql(AUTHORS, {
    props ({ data, ...rest }) {
      return {
        authors: data.authors || [1, 2, 3, 4, 5],
        authorsCount: data.authorsCount || 10,
        loading: data.loading
      }
    },
    options ({ page, q }) {
      return {
        variables: {
          page,
          q
        } 
      } 
    }
  }),
)(Authors)
