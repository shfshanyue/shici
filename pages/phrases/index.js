import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import { get, compose } from '../../lib/utils'

import { Link, Router } from '../../routes'

import App from '../../components/App'
import QR from '../../components/QR'
import Tags from '../../components/Tags'
import Card from '../../components/Card'
import Pagination from '../../components/Pagination'

import { PHRASES } from '../../query/index.gql'

class Phrases extends Component {
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
    Router.pushRoute('phrases', {
      page
    })
  }

  render () {
    const { phrases, loading } = this.props

    return (
      <App title="名句">
        <style jsx>{`
          .container {
            display: flex;
          }

          .phrases {
            flex-grow: 1; 
          }

          .side {
            flex-basis: 300px;
            flex-shrink: 0;
            margin-left: 20px;
          }
        `}</style>
      <div className="container">
        <div className="phrases">
          {
            phrases.map(phrase => (
              <Card loading={loading} key={phrase.id || phrase}>
                <div className="phrase">
                  <Link route="poem" params={{ uuid: get(phrase, 'poem.uuid'), phrase: phrase.phrase }}>
                    <a>
                      { phrase.phrase }
                    </a>
                  </Link>
                  <div style={{ marginTop: '10px' }}>
                    <span>
                      { get(phrase, 'poem.author.dynasty') }·{ get(phrase, 'poem.author.name') }
                    </span>
                    <span>
                      《{ get(phrase, 'poem.title') }》
                    </span>
                  </div>
                </div>
              </Card>
            ))
          }
          <Pagination showQuickJumper current={Number(this.props.page)} total={this.props.phrasesCount} onChange={this.handleChange} pageSize={20} />
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
  graphql(PHRASES, {
    props ({ data, ...rest }) {
      return {
        phrases: data.phrases || [1, 2, 3, 4, 5],
        phrasesCount: data.phrasesCount || 10,
        loading: data.loading
      }
    },
    options ({ page, q }) {
      return {
        variables: {
          page,
          pageSize: 20
        } 
      } 
    }
  }),
)(Phrases)
