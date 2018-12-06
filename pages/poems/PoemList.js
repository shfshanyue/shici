import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'next/router'
import { Link } from '../../routes'

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
        <div className="poems">
          {
            !loading && poems.map(poem => (
              <div key={poem.id} className="poem">
                <h2>
                  <Link route="poem" params={{ uuid: poem.uuid }}>
                    <a>
                      { poem.title }
                    </a>
                  </Link>
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
        poems: data.poems || [],
        loading: data.loading
      }
    }
  }),
)(PoemList)
