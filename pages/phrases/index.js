import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'next/router'

import { Tooltip, Pagination } from 'antd'
import _ from 'lodash'

import { Link, Router } from '../../routes'

import App from '../../components/App'
import QR from '../../components/QR'
import Card from '../../components/Card'

const PHRASES = gql`
  query PHRASES ($page: Int, $pageSize: Int) {
    phrases (page: $page, pageSize: $pageSize) {
      id
      phrase
      authorName
      poem {
        uuid
        title
        author {
          uuid
          name
          dynasty
        }
      }
    }
    phrasesCount
  }
`

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
      <App title="首页">
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
                  <Link route="poem" params={{ uuid: _.get(phrase, 'poem.uuid'), phrase: phrase.phrase }}>
                    <a>
                      { phrase.phrase }
                    </a>
                  </Link>
                  <div style={{ marginTop: '10px' }}>
                    <span>
                      { _.get(phrase, 'poem.author.dynasty') }·{ _.get(phrase, 'poem.author.name') }
                    </span>
                    <span>
                      《{ _.get(phrase, 'poem.title') }》
                    </span>
                  </div>
                </div>
              </Card>
            ))
          }
          <Pagination showQuickJumper hideOnSinglePage current={Number(this.props.page)} total={this.props.phrasesCount} onChange={this.handleChange} pageSize={20} />
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
