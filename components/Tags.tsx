import groupBy from 'lodash.groupby'

import { useTagsQuery } from '../query'

import Tag from './Tag'
import Card from './Card'

import Link from 'next/link'

function Tags () {
  const { data, loading } = useTagsQuery()
  // 对应五个不想展示的 Tag
  const tags = data?.tags.filter(tag => !new Set([1, 7, 8, 9, 10]).has(tag.kind)) || []

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
              tags.map((tag) => (
                <Tag style={{ marginBottom: '10px' }} key={tag.id}>
                  <Link href={`/poems?tagId=${tag.id}&tagName=${tag.name}`}>
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
