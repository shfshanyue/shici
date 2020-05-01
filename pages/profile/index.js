import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import { get, compose } from '../../lib/utils'
import { Link } from '../../routes'

import Poem from '../../components/Poem'
import App from '../../components/App'
import QR from '../../components/QR'
import Card from '../../components/Card'
import withApollo from '../../lib/with-apollo'

import { STAR_POEMS, RECITE_POEMS } from '../../query/index.gql'

class Profile extends Component {
  static async getInitialProps({ query }) {
    return query
  }

  constructor (props) {
    super(props)
    this.state = {
      activeIds: {}
    }
  }

  render () {
    const { tag, userId, recitePoems, starPoems } = this.props
    const { activeIds } = this.state

    const poems = tag === 'stars' ? starPoems : recitePoems

    return (
      <App title="我的主页" description="诗词学习网致力于古诗文的整理，为每一个人传递中国诗词之美">
        <style jsx>{`
          .container {
            display: flex;
          }

          .profile {
            flex-grow: 1; 
          }

          .side {
            flex-basis: 300px;
            flex-shrink: 0;
            margin-left: 20px;
          }

          .nav {
            display: flex;
            height: 50px;
            align-items: center;
            margin: 0 auto;
            white-space: nowrap;
            border-bottom: 1px solid #eee;
            background-color: #fff;
          }

          .nav-item {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            padding: 0 20px;
            cursor: pointer;
            height: 100%;
            color: #888;
          }

          .nav-item.active {
            color: #f60;
            box-shadow: inset 0 -2px 0 #f60;
          }
        `}</style>
      <div className="container">
        <div className="profile">
          <div className="nav">
            <Link route="profile" params={{ userId, tag: 'stars' }}>
              <a className={`nav-item ${tag === 'stars' ? 'active' : ''}`}>喜欢</a>
            </Link>
            <Link route="profile" params={{ userId, tag: 'recitations' }}>
              <a className={`nav-item ${tag === 'recitations' ? 'active' : ''}`}>会背</a>
            </Link>
          </div>
          <div className="content">
            {
              poems.map(poem =>
                <div className="poem" key={poem.poem.id}>
                  <Card loading={!poem.poem.id}>
                    <Poem
                      time={poem.updateTime}
                      poem={poem.poem}
                      active={Boolean(activeIds[poem.poem.id])}
                      onMore={() => {
                        this.setState({
                          activeIds: {
                            ...activeIds,
                            [poem.poem.id]: 1
                          }
                        })
                      }}
                    />
                  </Card>
                </div>
              )
            }        
          </div>
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
  withApollo,
  graphql(STAR_POEMS, {
    props ({ data }) {
      return {
        starPoems: get(data, 'user.starPoemsWithDate', [{ poem: { id: 0 } }]),
      }
    },
    options: {
      ssr: false,
      fetchPolicy: 'network-only',
    },
    skip ({ tag }) {
      return tag !== 'stars'
    }
  }),
  graphql(RECITE_POEMS, {
    props ({ data }) {
      return {
        recitePoems: get(data, 'user.recitePoemsWithDate', [{ poem: { id: 0 } }])
      }
    },
    options: {
      ssr: false,
      fetchPolicy: 'network-only'
    },
    skip ({ tag }) {
      return tag !== 'recitations'
    }
  })
)(Profile)
