import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { get } from '../../lib/utils'

import { Router, Link } from '../../routes'

import App from '../../components/App'
import QR from '../../components/QR'
import Card from '../../components/Card'
import Poem from '../../components/Poem'
import Pagination from '../../components/Pagination'
import AuthorComponent from '../../components/Author'

const AUTHOR = gql`
  query AUTHOR ($uuid: ID!, $page: Int) {
    author (uuid: $uuid) {
      id
      uuid
      name
      intro
      birthYear
      deathYear
      dynasty
      baikeUrl
      poems (page: $page) {
        id 
        uuid
        title
        kind
        tags {
          id
          name
        }
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

  handleChange (page) {
    Router.pushRoute(`/authors/${this.props.uuid}?page=${page}`)
  }

  render () {
    const { author, loading } = this.props
    const poems = get(author, 'poems', [1, 2, 3, 4, 5].map(x => ({ id: x })))
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
            <AuthorComponent author={author} />
          </Card>
          {
            poems.map(poem => (
              <Card key={poem.id} loading={loading}>
                <Poem poem={poem} />
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
    props ({ data }) {
      return {
        author: data.author || {},
        loading: data.loading
      } 
    }
  })
)(Author)
