import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'

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
            padding: 20px; 
            background-color: #fff;
            margin-bottom: 20px;
            flex-grow: 1;
            transition: all ease-out 0.2s;
          }

          .poem.loading {
            opacity: 0;
          }

          .side {
            flex-basis: 300px; 
            flex-shrink: 0;
          }
        `}</style>
      <div className={`poem ${loading ? 'loading' : ''}`}>
        {
          !loading && (
            <div>
              <h2>
                { poem.title }
              </h2>
              <div>
                { poem.author.dynasty }·{ poem.author.name }
              </div>
              <div>
                {
                  poem.paragraphs.map((p, index) => (
                    <p key={index}>
                      { p } 
                    </p>
                  )) 
                }
              </div>
            </div>
          )
        }
      </div>
      <div className="side">
      
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
