import React from 'react'
import { graphql, compose } from 'react-apollo'
import { Link } from "../routes";
import { TAGS } from '../query.gql'

import Tag from './Tag'
import Card from './Card'

function Tags ({ tags }) {
  return <Card>{
    tags.slice(0, 50).map((tag) => (
      <Tag style={{ margin: '5px' }}>
        <Link route="poems" params={{ tagId: tag.id, tagName: tag.name }} key={tag.id}>
          {tag.name}
        </Link>
      </Tag>
    ))
  }</Card>
}

export default compose(
  graphql(TAGS, {
    props ({ data }) {
      return {
        tags: data.tags,
        loading: data.loading
      }
    }
  })
)(Tags)
