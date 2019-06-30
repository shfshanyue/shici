import React from 'react'
import { graphql, compose } from 'react-apollo'
import { Router, Link } from '../routes'
import { TAGS } from '../query.gql'

import Tag from './Tag'

function Tags ({ tags }) {
  return tags.map((tag) => (
    <Link route="poems" params={{ tagId: tag.id, tagName: tag.name }} key={tag.id}>
      { tag.name }
    </Link>
  ))
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
