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

const STAR_POEMS = gql`
  query STAR_POEMS ($userId: ID!) {
    user (id: $userId) {
      id
      name
      starPoems {
        id
        uuid
        title
        kind
        author {
          id
          uuid
          name
        }
      }
    }
  }
`

const RECITE_POEMS = gql`
  query RECITE_POEMS ($userId: ID!) {
    user (id: $userId) {
      id
      name
      recitePoems {
        id
        uuid
        title
        kind
        author {
          id
          uuid
          name
        }
      }
    }
  }
`

class Poems extends Component {
  static async getInitialProps({ query }) {
    return query
  }

  render () {
    const { tag, userId } = this.props

    return (
      <App title="我的主页" description="诗词学习网致力于古诗文的整理，为每一个人传递中国诗词之美">
        <style jsx>{`
          .container {
            display: flex;
          }

          .profile {
            flex-grow: 1; 
            background-color: #fff;
            
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
            <Link route="profile" params={{ userId, tag: "stars" }}>
              <a className={`nav-item ${tag === 'stars' ? 'active' : ''}`}>喜欢</a>
            </Link>
            <Link route="profile" params={{ userId, tag: "recitations" }}>
              <a className={`nav-item ${tag === 'recitations' ? 'active' : ''}`}>会背</a>
            </Link>
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
  graphql(STAR_POEMS),
  graphql(RECITE_POEMS),
)(Poems)
