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

const POEMS = gql`
  query POEMS ($page: Int) {
    poems (page: $page) {
      id
      uuid
      title
      paragraphs
      kind
      author {
        name
        dynasty
      }
    }
    poemsCount
  }
`

class Poems extends Component {
  static async getInitialProps({ query }) {
    return {
      page: query.page || 1 
    }
  }

  constructor (props) {
    super(props) 
    this.state = {
      activeIds: {
      
      }
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (page) {
    Router.pushRoute(`/poems?page=${page}`)
  }

  render () {
    const { poems, loading } = this.props
    const { activeIds } = this.state

    return (
      <App title="首页">
        <style jsx>{`
          .container {
            display: flex;
          }

          .poems {
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
        <div className="poems">
          {
            poems.map(poem => (
              <Card loading={loading} key={poem.id}>
                <div className="poem">
                  <h2>
                    <Link route="poem" params={{ uuid: poem.uuid }} prefetch>
                      <a>
                        { poem.title }
                      </a>
                    </Link>
                  </h2>
                  <div className="author">
                    { _.get(poem, 'author.dynasty') }·{ _.get(poem, 'author.name') }
                  </div>
                  <div>
                    {
                      // 只显示四段
                      !loading && poem.paragraphs.slice(0, activeIds[poem.id] ? undefined : 4).map((p, index) => (
                        <p key={index}>
                          { p } 
                        </p>
                      )) 
                    } 
                    {
                      !loading && poem.paragraphs.length > 4 && !activeIds[poem.id] && <p className="more" onClick={
                        e => {
                          this.setState({
                            activeIds: {
                              ...activeIds,
                              [poem.id]: 1
                            }
                          }) 
                        }
                      }>
                      <Tooltip title="展开全文" placement="bottom">
                        <span>
                          ...
                        </span>
                      </Tooltip>
                    </p>
                    }
                  </div>
                </div>
              </Card>
            ))
          }
          <Pagination showQuickJumper current={Number(this.props.page)} total={this.props.poemsCount / 10} onChange={this.handleChange} />
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
  graphql(POEMS, {
    props ({ data, ...rest }) {
      return {
        poems: data.poems || [1, 2, 3, 4, 5],
        poemsCount: data.poemsCount || 500,
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
)(Poems)
