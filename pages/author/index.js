import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { get } from '../../lib/utils'

import { Router } from '../../routes'

import App from '../../components/App'
import QR from '../../components/QR'
import Card from '../../components/Card'
import Poem from '../../components/Poem'
import Pagination from '../../components/Pagination'
import AuthorComponent from '../../components/Author'

import { AUTHOR, AUTHOR_POEMS } from '../../query/index.gql'

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

  handleChange (page) {
    Router.pushRoute(`/authors/${this.props.uuid}?page=${page}`)
  }

  render () {
    const { author, loading, poems, poemsCount, poemsLoading } = this.props
    return (
      <App title={`${get(author, 'name', '')}_作者`} description={author.intro}>
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
            <AuthorComponent author={author} title="h1" />
          </Card>
          {
            poems.map(poem => (
              <Card key={poem.id} loading={poemsLoading}>
                <Poem poem={poem} />
              </Card>
            ))
          }
        <Pagination current={Number(this.props.page)} total={poemsCount} onChange={this.handleChange} />
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
    props ({ data }) {
      return {
        author: data.author || {},
        loading: data.loading
      } 
    }
  }),
  graphql(AUTHOR_POEMS, {
    props ({ data }) {
      const poems = get(data, 'author.poems', [{ id: 1 }, { id: 2 }])
      return {
        poems,
        poemsCount: get(data, 'author.poemsCount') || 10,
        poemsLoading: data.loading
      }
    },
    options ({ uuid, page }) {
      return {
        variables: {
          uuid,
          page
        },
        ssr: false
      } 
    }
  }),
)(Author)
