import { Link } from '../routes'
import Tag from '../components/Tag'
import { get, highlight } from '../lib/utils'
import { graphql, compose } from 'react-apollo'

import { STAR_POEM, RECITE_POEM } from '../query.gql'

function Poem ({ poem = {}, q, active, onMore, starPoem, recitePoem }) {
  const handleStar = (poemId, star) => {
    starPoem({
      variables: {
        poemId,
        star
      } 
    }) 
  }

  const handleRecite = (poemId, recite) => {
    recitePoem({
      variables: {
        poemId,
        recite
      } 
    }) 
  }
  return <div>
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
          // 当折叠时，只显示四段
          !active && poem.paragraphs.slice(0, active ? undefined : 4).map((p, index) => (
            <p key={index}>
              { highlight(p, q) } 
            </p>
          )) 
        } 
        {
          !active && poem.paragraphs.length > 4 && <p className="more" onClick={onMore}>
          ...
          </p>
        }
      </div>
    </div>
    <Tag onChange={() => poem.userIsStar != null && handleStar(poem.id, !poem.userIsStar)} checked={poem.userIsStar}>喜欢</Tag>
    <Tag onChange={() => poem.userIsStar != null && handleRecite(poem.id, !poem.userIsRecite)} checked={poem.userIsRecite}>会背</Tag>
  </div>
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
  })
)(Poem)