declare module '*.gql' {
  import { DocumentNode } from 'graphql'

  const value: Record<string, DocumentNode>
  export = value
}