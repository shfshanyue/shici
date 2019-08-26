import React from 'react'
import { useMutation } from 'react-apollo'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

import { Link, Router } from '../routes'
import Tag from '../components/Tag'
import { get, highlight, slice } from '../lib/utils'
import { STAR_POEM, RECITE_POEM } from '../query/index.gql'

import dayjs from 'dayjs'

dayjs.extend(relativeTime)

function Poem ({
  poem = {},
  highlightWords = [],
  active = true,
  onMore,
  time,
  title="h2"
}) {
  const [starPoem] = useMutation(STAR_POEM, {
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
  })

  const [recitePoem] = useMutation(RECITE_POEM, {
    options: {
      optimisticResponse ({ poemId, recite }) {
        return {
          __typename: 'Mutation',
          starPoem: {
            id: poemId,
            userIsRecite: recite,
            __typename: 'Poem'
          }
        }
      }
    } 
  })

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

  const goLogin = () => {
    Router.pushRoute('/login')
  }

  const author = get(poem, 'author.uuid')

  return <div>
    <style jsx>{`
      time {
        color: #aaa;
        margin-left: auto;
        font-family: defalut;
      }
      .more {
        cursor: pointer; 
      }
      .footer {
        display: flex; 
        align-items: center;
        flex-wrap: wrap;
        color: #aaa;
        min-height: 28px;
      }
      .tag-item {
        cursor: pointer; 
        font-size: 1rem;
      }
      .tag-item:hover {
        color: #f60c;
      }
      .tag-item:not(:last-child):after {
        content: "/";
        margin: 0 .2em;
        color: #b2bac2;
      }
    `}</style>
    <div className="poem">
      {
        React.createElement(title, {
          children: poem.uuid ?
            <Link route="poem" params={{ uuid: poem.uuid }}>
              <a>
                { 
                  highlight(poem.title, highlightWords)
                }
              </a>
            </Link> : highlight(poem.title, highlightWords)
        }) 
      }
      {
        author && <div className="author">
          <Link route="author" params={{ uuid: get(poem, 'author.uuid') }}>
            <a>
              { get(poem, 'author.dynasty') }·{ get(poem, 'author.name') }
            </a>
          </Link>
        </div>
      }
      <div>
        {
          // 当折叠时，只显示四段
          slice(poem.paragraphs, 0, active ? undefined : 4).map((p, index) => (
            <p key={index}>
              { highlight(p, highlightWords) } 
            </p>
          )) 
        } 
        {
          !active && poem.paragraphs && poem.paragraphs.length > 4 && <p className="more" onClick={onMore}>
          ...
          </p>
        }
      </div>
    </div>
    <div className="footer">
      <Tag
        onChange={() => poem.userIsStar === null ? goLogin() : handleStar(poem.id, !poem.userIsStar)}
        checked={poem.userIsStar}
      >喜欢</Tag>
      <Tag
        onChange={() => poem.userIsStar === null ? goLogin() : handleRecite(poem.id, !poem.userIsRecite)}
        checked={poem.userIsRecite}
      >会背</Tag>
      {
        get(poem, 'tags', []).map(tag => 
          <Link route="poems" params={{ tagId: tag.id, tagName: tag.name }} key={tag.id}>
            <div className="tag-item">{tag.name}</div>
          </Link>
        )
      }
      {
        time && <time>{
          dayjs(new Date()).diff(time, 'day') > 60 ?
            dayjs(time).format('YYYY-MM-DD HH:mm') : dayjs(time).locale('zh-cn').fromNow()
        }</time>
      }
    </div>
  </div>
}
 
export default Poem
