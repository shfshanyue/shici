import React from 'react'
import { graphql } from 'react-apollo'
import { Link } from '../routes'
import { TAGS } from '../query/index.gql'
import { groupBy, get, compose } from '../lib/utils'

import Tag from './Tag'
import Card from './Card'

function Tags ({ tags = [] }) {
  return (
    <Card title="标签">
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
                  <Link route="poems" params={{ tagId: tag.id, tagName: tag.name }} key={tag.id}>
                    {tag.name}
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

export default compose(
  graphql(TAGS, {
    props ({ data }) {
      return {
        tags: get(data, 'tags', []).filter(tag => !new Set([1, 7, 8, 9, 10]).has(tag.kind)),
        loading: data.loading
      }
    }
  })
)(Tags)
