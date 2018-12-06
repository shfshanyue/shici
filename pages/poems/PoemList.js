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
            display: flex;
          }

          .poem-container {
            flex-grow: 1; 
          }

          .poem {
            padding: 20px; 
            background-color: #fff;
            margin-bottom: 20px;
          }

          .more {
            cursor: pointer; 
          }

          .side {
            flex-basis: 300px;
            flex-shrink: 0;
            margin-left: 20px;
          }

          .cunyin {
            padding: 30px 0;
            background-color: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .cunyin span {
            margin-top: 10px; 
          }
        `}</style>
        <div className="poem-container">
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
        <div className="side">
          <div className="cunyin">
            <img src="/static/cunyin.jpg" width="200px" height="200px" />
            <span>每天一首古诗词</span>
          </div>
        </div>
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
