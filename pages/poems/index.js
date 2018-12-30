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
  query POEMS ($page: Int, $q: String) {
    poems (page: $page, q: $q) {
      id
      uuid
      title
      paragraphs
      kind
      author {
        uuid
        name
        dynasty
      }
    }
    poemsCount (q: $q)
  }
`

function hightlight (string = '', word) {
  if (!word || string.indexOf(word) === -1) {
    return string
  }
  const blocks = string.split(word)
  return blocks.map((block, index) => (
    <span key={index}>
      { block }
      { index < blocks.length - 1 && <i className="highlight">{word}</i> }
    </span> 
  ))
}

class Poems extends Component {
  static async getInitialProps({ query }) {
    return {
      page: 1,
      ...query
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
    Router.pushRoute('poems', {
      page,
      q: this.props.q, 
    })
  }

  render () {
    const { poems, loading, q } = this.props
    const { activeIds } = this.state

    return (
      <App title="首页" description="诗词学习网致力于古诗文的收集，为每一个人传递中国诗词之美">
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

          .highlight {
            color: #f60; 
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
                        { 
                          hightlight(poem.title, q)
                        }
                      </a>
                    </Link>
                  </h2>
                  <div className="author">
                    <Link route="author" params={{ uuid: _.get(poem, 'author.uuid') }}>
                      <a>
                        { _.get(poem, 'author.dynasty') }·{ _.get(poem, 'author.name') }
                      </a>
                    </Link>
                  </div>
                  <div>
                    {
                      // 只显示四段
                      !loading && poem.paragraphs.slice(0, activeIds[poem.id] ? undefined : 4).map((p, index) => (
                        <p key={index}>
                          { hightlight(p, q) } 
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
          <Pagination showQuickJumper hideOnSinglePage current={Number(this.props.page)} total={this.props.poemsCount} onChange={this.handleChange} />
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
        poemsCount: data.poemsCount || 10,
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
)(Poems)
