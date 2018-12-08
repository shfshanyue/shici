import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import _ from 'lodash'

import QR from '../../components/QR'
import Card from '../../components/Card'
import Author from './Author'

const POEM = gql`
  query POEM ($uuid: ID!) {
    poem (uuid: $uuid) {
      id
      uuid
      title
      paragraphs
      kind
      author {
        name
        dynasty
        intro
      }
    }
  }
`

class Poem extends Component {
  render () {
    const { poem, loading } = this.props
    return (
      <div className="container">
        <style jsx>{`
          .container {
            display: flex;
          }

          .poem {
            flex-grow: 1;
          }

          .side {
            flex-basis: 300px; 
            flex-shrink: 0;
            margin-left: 20px;
          }
        `}</style>
      <div className="poem">
        <Card loading={loading}>
          <h2>
            { poem.title }
          </h2>
          <div>
            { _.get(poem, 'author.dynasty') }·{ _.get(poem, 'author.name') }
          </div>
          <div>
            {
              _.map(poem.paragraphs, (p, index) => (
                <p key={index}>
                  { p } 
                </p>
              ))
            }
          </div>
        </Card>
      </div>
      <div className="side">
        <QR />
        {
          !loading && <Author author={poem.author} />
        }
      </div>
    </div>
    )
  }
}

export default compose(
  graphql(POEM, {
    options ({ uuid }) {
      return {
        variables: {
          uuid
        }
      }
    },
    props ({ data, ...rest }) {
      return {
        poem: data.poem || {},
        loading: data.loading
      } 
    }
  })
)(Poem)
