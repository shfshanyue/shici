import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'

import Pagination from '../../components/Pagination'
import { get, highlight, merge } from '../../lib/utils'
import { Link, Router } from '../../routes'

import App from '../../components/App'
import QR from '../../components/QR'
import Card from '../../components/Card'
import SearchBar from '../../components/SearchBar'
import Tag from '../../components/Tag'

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

const POEMS_USER_STAR = gql`
  query POEMS_USER_STAR ($page: Int, $q: String) {
    poems (page: $page, q: $q) {
      id 
      userIsStar
      userIsRecite
    }
  }
`

const RECITE_POEM = gql`
  mutation RECITE_POEM($poemId: ID!, $recite: Boolean) {
    recitePoem (id: $poemId, recite: $recite) {
      id 
      userIsRecite
    }
  }
`

const STAR_POEM = gql`
  mutation STAR_POEM($poemId: ID!, $star: Boolean) {
    starPoem (id: $poemId, star: $star) {
      id 
      userIsStar
    }
  }
`

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
      // 代表展开的诗词
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

  handleStar (poemId, star) {
    this.props.starPoem({
      variables: {
        poemId,
        star
      } 
    }) 
  }

  handleRecite (poemId, recite) {
    this.props.recitePoem({
      variables: {
        poemId,
        recite
      } 
    }) 
  }

  render () {
    const { poems, loading, q } = this.props
    const { activeIds } = this.state

    return (
      <App title="首页" description="诗词学习网致力于古诗文的整理，为每一个人传递中国诗词之美">
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
          <SearchBar q={q} />
          {
            poems.map(poem => (
              <Card loading={loading} key={poem.id || poem}>
                <div className="poem">
                  <h2>
                    <Link route="poem" params={{ uuid: poem.uuid }} prefetch>
                      <a>
                        { 
                          highlight(poem.title, q)
                        }
                      </a>
                    </Link>
                  </h2>
                  <div className="author">
                    <Link route="author" params={{ uuid: get(poem, 'author.uuid') }}>
                      <a>
                        { get(poem, 'author.dynasty') }·{ get(poem, 'author.name') }
                      </a>
                    </Link>
                  </div>
                  <div>
                    {
                      // 只显示四段
                      !loading && poem.paragraphs.slice(0, activeIds[poem.id] || q ? undefined : 4).map((p, index) => (
                        <p key={index}>
                          { highlight(p, q) } 
                        </p>
                      )) 
                    } 
                    {
                      !q && !loading && poem.paragraphs.length > 4 && !activeIds[poem.id] && <p className="more" onClick={
                        e => {
                          this.setState({
                            activeIds: {
                              ...activeIds,
                              [poem.id]: 1
                            }
                          }) 
                        }
                      }>
                      ...
                    </p>
                    }
                  </div>
                </div>
                <Tag onChange={() => poem.userIsStar != null && this.handleStar(poem.id, !poem.userIsStar)} checked={poem.userIsStar}>喜欢</Tag>
                <Tag onChange={() => poem.userIsStar != null && this.handleRecite(poem.id, !poem.userIsRecite)} checked={poem.userIsRecite}>会背</Tag>
              </Card>
            ))
          }
          <Pagination showQuickJumper current={Number(this.props.page)} total={this.props.poemsCount} onChange={this.handleChange} />
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
  graphql(STAR_POEM, {
    name: 'starPoem',
    options: {
      optimisticResponse ({ poemId, star }) {
        return {
          __typename: 'Mutation',
          starPoem: {
            id: poemId,
            userIsStar: star,
            __typename: 'Poem'
          }
        }
      }
    } 
  }),
  graphql(RECITE_POEM, {
    name: 'recitePoem',
    options: {
      optimisticResponse ({ poemId, recite }) {
        return {
          __typename: 'Mutation',
          recitePoem: {
            id: poemId,
            userIsRecite: recite,
            __typename: 'Poem'
          }
        }
      }
    } 
  }),
  graphql(POEMS_USER_STAR, {
    options ({ page, q }) {
      return {
        variables: {
          page,
          q
        } 
      } 
    },
    skip: !process.browser
  }),
  graphql(POEMS, {
    props ({ data, ownProps }) {
      const lastPoems = get(ownProps, 'data.poems', [])
      const poems = get(data, 'poems', [1, 2, 3, 4, 5].map(id => ({ id })))
      return {
        poems: merge(lastPoems, poems),
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
