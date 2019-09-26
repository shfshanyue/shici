import { useQuery } from 'react-apollo'
import * as routes from '../routes'
import * as query from '../query/index.gql'
import { groupBy } from '../lib/utils'
import { TagsQuery, Tag as TagType } from '../query'

import Tag from './Tag'
import Card from './Card'

const { TAGS } = query
const { Link } = routes

function Tags () {
  const { data, loading } = useQuery<TagsQuery>(TAGS)
  const tags = data ? data.tags.filter(tag => !new Set([1, 7, 8, 9, 10]).has(tag.kind)) : []

  return (
    <Card title="标签" loading={loading}>
      <style jsx>{`
        .tags:not(:last-child) {
          border-bottom: 1px solid #eee;
        }
        .tags {
          padding-top: 10px;
        }
      `}</style>
      {
        Object.entries(groupBy(tags, 'kind')).map(([kind, tags]) =>
          <div key={kind} className="tags">
            {
              (tags as TagType[]).map((tag) => (
                <Tag style={{ marginBottom: '10px' }} key={tag.id}>
                  <Link route="poems" params={{ tagId: tag.id, tagName: tag.name }}>
                    <a>{ tag.name }</a>
                  </Link>
                </Tag>
              ))
            }
          </div>
        )
      }
    </Card>
  )
}

export default Tags
