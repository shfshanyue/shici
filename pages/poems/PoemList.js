import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'

const POEMS = gql`
  query POEMS {
    poems {
      id
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
    const { poems } = this.props
    const { activeIds } = this.state

    return (
      <div className="poems container">
        <style jsx>{`
          .poems {
          }

          .poem {
            padding: 20px; 
            background-color: #fff;
            margin-bottom: 20px;
          }

          .more {
            cursor: pointer; 
          }
        `}</style>
        {
          poems.map(poem => (
            <div key={poem.id} className="poem">
              <h2>
                { poem.title }
              </h2>
              <div>
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
          )) 
        }
      </div>
    )  
  }
}

export default compose(
  graphql(POEMS, {
    props ({ data, ...rest }) {
      return {
        poems: data.poems || []
      }
    }
  }),
)(PoemList)
