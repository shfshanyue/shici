import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'next/router'

import { Link } from '../../routes'

import QR from '../../components/QR'
import Card from '../../components/Card'

const POEMS = gql`
  query POEMS {
    poems {
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

class PoemList extends Component {
  constructor (props) {
    super(props) 
    this.state = {
      activeIds: {
      
      }
    }
  }

  render () {
    const { poems, loading } = this.props
    const { activeIds } = this.state

    return (
      <div className="container">
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

          .author {
            font-size: 1.1em; 
          }
        `}</style>
        <div className="poems">
          {
            poems.map(poem => (
              <Card loading={loading} key={poem.id}>
                <div className="poem">
                  <h2>
                    <Link route="poem" params={{ uuid: poem.uuid }}>
                      <a>
                        { poem.title }
                      </a>
                    </Link>
                  </h2>
                  <div className="author">
                    { poem.author.dynasty }·{ poem.author.name }
                  </div>
                  <div>
                    {
                      poem.paragraphs.slice(0, activeIds[poem.id] ? undefined : 4).map((p, index) => (
                        <p key={index}>
                          { p } 
                        </p>
                      )) 
                    } 
                    {
                      poem.paragraphs.length > 4 && !activeIds[poem.id] && <p className="more" onClick={
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
              </Card>
            ))
          }
        </div>
        <div className="side">
          <QR />
        </div>
      </div>
    )  
  }
}

export default compose(
  graphql(POEMS, {
    props ({ data, ...rest }) {
      return {
        poems: data.poems || [],
        loading: data.loading
      }
    }
  }),
)(PoemList)
