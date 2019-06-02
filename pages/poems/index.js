import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'

import Pagination from '../../components/Pagination'
import { get, merge } from '../../lib/utils'
import { Router } from '../../routes'

import App from '../../components/App'
import QR from '../../components/QR'
import Card from '../../components/Card'
import SearchBar from '../../components/SearchBar'
import Poem from '../../components/Poem'
import Tag from '../../components/Tag'

import { POEMS, POEMS_USER_STAR, RECITE_POEM, STAR_POEM } from '../../query.gql'

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
      tagId: this.props.tagId,
      tagName: this.props.tagName
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
    const { poems, loading, q, tagId, tagName } = this.props
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
            tagId &&
              <Card>
                <Tag>{ tagName }</Tag>
              </Card>
          }
          {
            poems.map(poem => (
              <Card loading={loading} key={poem.id}>
                <Poem
                  poem={poem}
                  active={Boolean(activeIds[poem.id])}
                  highlightWords={[q]}
                  onMore={() => {
                    this.setState({
                      activeIds: {
                        ...activeIds,
                        [poem.id]: 1
                      }
                    })
                  }}
                />
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
    options ({ page, q, tagId }) {
      return {
        variables: {
          page,
          q,
          tagId
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
    options ({ page, q, tagId }) {
      return {
        variables: {
          page,
          q,
          tagId
        } 
      } 
    }
  }),
)(Poems)
