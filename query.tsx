import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: Date;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { [key: string]: any };
  ConstraintString: any;
  ConstraintNumber: any;
};


export type Query = {
  __typename?: 'Query';
  ping: Scalars['String'];
  error: Scalars['Int'];
  reqError?: Maybe<Scalars['Int']>;
  cache: Scalars['Int'];
  exceptionWithData?: Maybe<Scalars['Int']>;
  me?: Maybe<User>;
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
  phrase: Phrase;
  author?: Maybe<Author>;
  poems: Array<Poem>;
  authors: Array<Author>;
  phrases: Array<Phrase>;
  phrasesCount: Scalars['Int'];
  poemsCount: Scalars['Int'];
  authorsCount: Scalars['Int'];
  poem?: Maybe<Poem>;
  tags: Array<Tag>;
  tag?: Maybe<Tag>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryPhraseArgs = {
  id?: Maybe<Scalars['ID']>;
  date?: Maybe<Scalars['DateTime']>;
  random?: Maybe<Scalars['Boolean']>;
};


export type QueryAuthorArgs = {
  id: Scalars['ID'];
};


export type QueryPoemsArgs = {
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  q?: Maybe<Scalars['String']>;
  tagId?: Maybe<Scalars['ID']>;
};


export type QueryAuthorsArgs = {
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  q?: Maybe<Scalars['String']>;
};


export type QueryPhrasesArgs = {
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  q?: Maybe<Scalars['String']>;
};


export type QueryPhrasesCountArgs = {
  q?: Maybe<Scalars['String']>;
};


export type QueryPoemsCountArgs = {
  q?: Maybe<Scalars['String']>;
  tagId?: Maybe<Scalars['ID']>;
};


export type QueryAuthorsCountArgs = {
  q?: Maybe<Scalars['String']>;
};


export type QueryPoemArgs = {
  uuid?: Maybe<Scalars['ID']>;
  id?: Maybe<Scalars['ID']>;
};


export type QueryTagArgs = {
  id: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  createTime: Scalars['DateTime'];
  todos?: Maybe<Array<Todo>>;
  starPoems?: Maybe<Array<Poem>>;
  starPoemsWithDate?: Maybe<Array<UserPoem>>;
  recitePoems?: Maybe<Array<Poem>>;
  recitePoemsWithDate?: Maybe<Array<UserPoem>>;
};


export type Todo = {
  __typename?: 'Todo';
  id: Scalars['ID'];
  name: Scalars['String'];
  createTime: Scalars['DateTime'];
  user: User;
  status: TodoStatus;
};

export enum TodoStatus {
  DONE = 'DONE',
  UNDO = 'UNDO'
}

export type Poem = {
  __typename?: 'Poem';
  id: Scalars['ID'];
  uuid: Scalars['ID'];
  title: Scalars['String'];
  kind?: Maybe<Scalars['String']>;
  baikeUrl?: Maybe<Scalars['String']>;
  paragraphs: Array<Scalars['String']>;
  starCount: Scalars['Int'];
  appreciation?: Maybe<Array<Maybe<Scalars['String']>>>;
  translation?: Maybe<Array<Maybe<Scalars['String']>>>;
  intro?: Maybe<Array<Maybe<Scalars['String']>>>;
  annotations?: Maybe<Scalars['JSON']>;
  expertComments?: Maybe<Scalars['JSON']>;
  author?: Maybe<Author>;
  phrases?: Maybe<Array<Phrase>>;
  tags?: Maybe<Array<Tag>>;
  /** 用户是否喜欢该诗词，null 为未登录 */
  userIsStar?: Maybe<Scalars['Boolean']>;
  /** 用户是否会背该诗词，null 为未登录 */
  userIsRecite?: Maybe<Scalars['Boolean']>;
};


export type Author = {
  __typename?: 'Author';
  id: Scalars['ID'];
  uuid: Scalars['ID'];
  name: Scalars['String'];
  dynasty?: Maybe<Scalars['String']>;
  birthYear?: Maybe<Scalars['String']>;
  deathYear?: Maybe<Scalars['String']>;
  baikeUrl?: Maybe<Scalars['String']>;
  star?: Maybe<Scalars['Int']>;
  intro?: Maybe<Scalars['String']>;
  poems: Array<Poem>;
  poemsCount: Scalars['Int'];
};


export type AuthorPoemsArgs = {
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
};

export type Phrase = {
  __typename?: 'Phrase';
  id: Scalars['ID'];
  phrase: Scalars['String'];
  text: Scalars['String'];
  authorName?: Maybe<Scalars['String']>;
  poem: Poem;
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['ID'];
  name: Scalars['String'];
  kind: Scalars['Int'];
  poems: Array<Poem>;
};


export type TagPoemsArgs = {
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
};

/** 用户与诗词的喜欢与背诵数据 */
export type UserPoem = {
  __typename?: 'UserPoem';
  updateTime: Scalars['DateTime'];
  user: User;
  poem: Poem;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** 登录，如果返回 null，则登录失败 */
  createUserToken?: Maybe<Scalars['String']>;
  /** 注册 */
  createUser: User;
  /**
   * 发送邮件
   * 返回一个 token，注册时需要携带 token，用以校验验证码
   */
  sendEmailVerifyCode: Scalars['String'];
  starPoem: Poem;
  recitePoem: Poem;
  createTodo?: Maybe<Todo>;
  updateTodo?: Maybe<Scalars['Boolean']>;
};


export type MutationCreateUserTokenArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreateUserArgs = {
  name: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
  verifyCode: Scalars['String'];
  token: Scalars['String'];
};


export type MutationSendEmailVerifyCodeArgs = {
  email: Scalars['String'];
};


export type MutationStarPoemArgs = {
  id: Scalars['ID'];
  star?: Maybe<Scalars['Boolean']>;
};


export type MutationRecitePoemArgs = {
  id: Scalars['ID'];
  recite?: Maybe<Scalars['Boolean']>;
};


export type MutationCreateTodoArgs = {
  todo: TodoCreate;
};


export type MutationUpdateTodoArgs = {
  todo: TodoUpdate;
};

export type TodoCreate = {
  name: Scalars['ConstraintString'];
};

export type TodoUpdate = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['ConstraintString']>;
  status?: Maybe<TodoStatus>;
};



export type Like = {
  like: Scalars['String'];
};

export type Order = {
  field: Scalars['String'];
  asc?: Maybe<Scalars['Boolean']>;
};

export type TimeBetween = {
  /** [DateTime, DateTime] 表示起止时间 */
  between: Array<Scalars['DateTime']>;
};

export type PoemsQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
  q?: Maybe<Scalars['String']>;
  tagId?: Maybe<Scalars['ID']>;
}>;


export type PoemsQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'poemsCount'>
  & { poems: Array<(
    { __typename?: 'Poem' }
    & Pick<Poem, 'id' | 'title' | 'paragraphs' | 'kind'>
    & { tags?: Maybe<Array<(
      { __typename?: 'Tag' }
      & Pick<Tag, 'id' | 'name'>
    )>>, author?: Maybe<(
      { __typename?: 'Author' }
      & Pick<Author, 'id' | 'name' | 'dynasty'>
    )> }
  )> }
);

export type PoemsUserStarQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
  q?: Maybe<Scalars['String']>;
  tagId?: Maybe<Scalars['ID']>;
}>;


export type PoemsUserStarQuery = (
  { __typename?: 'Query' }
  & { poems: Array<(
    { __typename?: 'Poem' }
    & Pick<Poem, 'id' | 'userIsStar' | 'userIsRecite'>
  )> }
);

export type PoemUserStarQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PoemUserStarQuery = (
  { __typename?: 'Query' }
  & { poem?: Maybe<(
    { __typename?: 'Poem' }
    & Pick<Poem, 'id' | 'userIsStar' | 'userIsRecite'>
  )> }
);

export type RecitePoemMutationVariables = Exact<{
  poemId: Scalars['ID'];
  recite?: Maybe<Scalars['Boolean']>;
}>;


export type RecitePoemMutation = (
  { __typename?: 'Mutation' }
  & { recitePoem: (
    { __typename?: 'Poem' }
    & Pick<Poem, 'id' | 'userIsRecite'>
  ) }
);

export type StarPoemMutationVariables = Exact<{
  poemId: Scalars['ID'];
  star?: Maybe<Scalars['Boolean']>;
}>;


export type StarPoemMutation = (
  { __typename?: 'Mutation' }
  & { starPoem: (
    { __typename?: 'Poem' }
    & Pick<Poem, 'id' | 'userIsStar'>
  ) }
);

export type PoemQueryVariables = Exact<{
  poemId?: Maybe<Scalars['ID']>;
  poemUUID?: Maybe<Scalars['ID']>;
  phraseId?: Maybe<Scalars['ID']>;
}>;


export type PoemQuery = (
  { __typename?: 'Query' }
  & { phrase: (
    { __typename?: 'Phrase' }
    & Pick<Phrase, 'id' | 'text'>
  ), poem?: Maybe<(
    { __typename?: 'Poem' }
    & Pick<Poem, 'id' | 'title' | 'intro' | 'paragraphs' | 'appreciation' | 'translation' | 'kind' | 'annotations'>
    & { phrases?: Maybe<Array<(
      { __typename?: 'Phrase' }
      & Pick<Phrase, 'id' | 'text'>
    )>>, tags?: Maybe<Array<(
      { __typename?: 'Tag' }
      & Pick<Tag, 'id' | 'name'>
      & { poems: Array<(
        { __typename?: 'Poem' }
        & Pick<Poem, 'id' | 'title' | 'paragraphs' | 'userIsRecite' | 'userIsStar'>
        & { tags?: Maybe<Array<(
          { __typename?: 'Tag' }
          & Pick<Tag, 'id' | 'name'>
        )>>, author?: Maybe<(
          { __typename?: 'Author' }
          & Pick<Author, 'id' | 'dynasty' | 'name'>
        )> }
      )> }
    )>>, author?: Maybe<(
      { __typename?: 'Author' }
      & Pick<Author, 'id' | 'name' | 'dynasty' | 'birthYear' | 'deathYear' | 'intro'>
      & { poems: Array<(
        { __typename?: 'Poem' }
        & Pick<Poem, 'id' | 'title' | 'paragraphs' | 'userIsRecite' | 'userIsStar'>
      )> }
    )> }
  )>, poems: Array<(
    { __typename?: 'Poem' }
    & Pick<Poem, 'id' | 'title' | 'paragraphs'>
  )> }
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
  verifyCode: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
  ) }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createUserToken'>
);

export type SendVerifyCodeMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type SendVerifyCodeMutation = (
  { __typename?: 'Mutation' }
  & { token: Mutation['sendEmailVerifyCode'] }
);

export type PhrasesQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
}>;


export type PhrasesQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'phrasesCount'>
  & { phrases: Array<(
    { __typename?: 'Phrase' }
    & Pick<Phrase, 'id' | 'text' | 'authorName'>
    & { poem: (
      { __typename?: 'Poem' }
      & Pick<Poem, 'id' | 'title'>
      & { author?: Maybe<(
        { __typename?: 'Author' }
        & Pick<Author, 'id' | 'name' | 'dynasty'>
      )> }
    ) }
  )> }
);

export type StarPoemsQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type StarPoemsQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
    & { starPoemsWithDate?: Maybe<Array<(
      { __typename?: 'UserPoem' }
      & Pick<UserPoem, 'updateTime'>
      & { poem: (
        { __typename?: 'Poem' }
        & Pick<Poem, 'id' | 'title' | 'kind' | 'paragraphs' | 'userIsRecite' | 'userIsStar'>
        & { author?: Maybe<(
          { __typename?: 'Author' }
          & Pick<Author, 'id' | 'name' | 'dynasty'>
        )> }
      ) }
    )>> }
  )> }
);

export type RecitePoemsQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type RecitePoemsQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
    & { recitePoemsWithDate?: Maybe<Array<(
      { __typename?: 'UserPoem' }
      & Pick<UserPoem, 'updateTime'>
      & { poem: (
        { __typename?: 'Poem' }
        & Pick<Poem, 'id' | 'title' | 'kind' | 'paragraphs' | 'userIsRecite' | 'userIsStar'>
        & { author?: Maybe<(
          { __typename?: 'Author' }
          & Pick<Author, 'id' | 'name' | 'dynasty'>
        )> }
      ) }
    )>> }
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
  )> }
);

export type TagsQueryVariables = Exact<{ [key: string]: never; }>;


export type TagsQuery = (
  { __typename?: 'Query' }
  & { tags: Array<(
    { __typename?: 'Tag' }
    & Pick<Tag, 'id' | 'name' | 'kind'>
  )> }
);

export type AuthorsQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
  q?: Maybe<Scalars['String']>;
}>;


export type AuthorsQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'authorsCount'>
  & { authors: Array<(
    { __typename?: 'Author' }
    & Pick<Author, 'id' | 'name' | 'intro' | 'dynasty' | 'birthYear' | 'deathYear'>
  )> }
);

export type AuthorQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type AuthorQuery = (
  { __typename?: 'Query' }
  & { author?: Maybe<(
    { __typename?: 'Author' }
    & Pick<Author, 'id' | 'name' | 'intro' | 'birthYear' | 'deathYear' | 'dynasty'>
  )> }
);

export type AuthorPoemsQueryVariables = Exact<{
  id: Scalars['ID'];
  page?: Maybe<Scalars['Int']>;
}>;


export type AuthorPoemsQuery = (
  { __typename?: 'Query' }
  & { author?: Maybe<(
    { __typename?: 'Author' }
    & Pick<Author, 'id' | 'poemsCount'>
    & { poems: Array<(
      { __typename?: 'Poem' }
      & Pick<Poem, 'id' | 'title' | 'kind' | 'userIsRecite' | 'userIsStar' | 'paragraphs'>
      & { phrases?: Maybe<Array<(
        { __typename?: 'Phrase' }
        & Pick<Phrase, 'id' | 'text'>
        & { poem: (
          { __typename?: 'Poem' }
          & Pick<Poem, 'id'>
        ) }
      )>>, tags?: Maybe<Array<(
        { __typename?: 'Tag' }
        & Pick<Tag, 'id' | 'name'>
      )>> }
    )> }
  )> }
);


export const PoemsDocument = gql`
    query POEMS($page: Int, $q: String, $tagId: ID) {
  poems(page: $page, q: $q, tagId: $tagId) {
    id
    title
    paragraphs
    kind
    tags {
      id
      name
    }
    author {
      id
      name
      dynasty
    }
  }
  poemsCount(q: $q, tagId: $tagId)
}
    `;

/**
 * __usePoemsQuery__
 *
 * To run a query within a React component, call `usePoemsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePoemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePoemsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      q: // value for 'q'
 *      tagId: // value for 'tagId'
 *   },
 * });
 */
export function usePoemsQuery(baseOptions?: Apollo.QueryHookOptions<PoemsQuery, PoemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PoemsQuery, PoemsQueryVariables>(PoemsDocument, options);
      }
export function usePoemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PoemsQuery, PoemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PoemsQuery, PoemsQueryVariables>(PoemsDocument, options);
        }
export type PoemsQueryHookResult = ReturnType<typeof usePoemsQuery>;
export type PoemsLazyQueryHookResult = ReturnType<typeof usePoemsLazyQuery>;
export const PoemsUserStarDocument = gql`
    query POEMS_USER_STAR($page: Int, $q: String, $tagId: ID) {
  poems(page: $page, q: $q, tagId: $tagId) {
    id
    userIsStar
    userIsRecite
  }
}
    `;

/**
 * __usePoemsUserStarQuery__
 *
 * To run a query within a React component, call `usePoemsUserStarQuery` and pass it any options that fit your needs.
 * When your component renders, `usePoemsUserStarQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePoemsUserStarQuery({
 *   variables: {
 *      page: // value for 'page'
 *      q: // value for 'q'
 *      tagId: // value for 'tagId'
 *   },
 * });
 */
export function usePoemsUserStarQuery(baseOptions?: Apollo.QueryHookOptions<PoemsUserStarQuery, PoemsUserStarQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PoemsUserStarQuery, PoemsUserStarQueryVariables>(PoemsUserStarDocument, options);
      }
export function usePoemsUserStarLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PoemsUserStarQuery, PoemsUserStarQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PoemsUserStarQuery, PoemsUserStarQueryVariables>(PoemsUserStarDocument, options);
        }
export type PoemsUserStarQueryHookResult = ReturnType<typeof usePoemsUserStarQuery>;
export type PoemsUserStarLazyQueryHookResult = ReturnType<typeof usePoemsUserStarLazyQuery>;
export const PoemUserStarDocument = gql`
    query POEM_USER_STAR($id: ID!) {
  poem(id: $id) {
    id
    userIsStar
    userIsRecite
  }
}
    `;

/**
 * __usePoemUserStarQuery__
 *
 * To run a query within a React component, call `usePoemUserStarQuery` and pass it any options that fit your needs.
 * When your component renders, `usePoemUserStarQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePoemUserStarQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePoemUserStarQuery(baseOptions: Apollo.QueryHookOptions<PoemUserStarQuery, PoemUserStarQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PoemUserStarQuery, PoemUserStarQueryVariables>(PoemUserStarDocument, options);
      }
export function usePoemUserStarLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PoemUserStarQuery, PoemUserStarQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PoemUserStarQuery, PoemUserStarQueryVariables>(PoemUserStarDocument, options);
        }
export type PoemUserStarQueryHookResult = ReturnType<typeof usePoemUserStarQuery>;
export type PoemUserStarLazyQueryHookResult = ReturnType<typeof usePoemUserStarLazyQuery>;
export const RecitePoemDocument = gql`
    mutation RECITE_POEM($poemId: ID!, $recite: Boolean) {
  recitePoem(id: $poemId, recite: $recite) {
    id
    userIsRecite
  }
}
    `;
export type RecitePoemMutationFn = Apollo.MutationFunction<RecitePoemMutation, RecitePoemMutationVariables>;

/**
 * __useRecitePoemMutation__
 *
 * To run a mutation, you first call `useRecitePoemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRecitePoemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [recitePoemMutation, { data, loading, error }] = useRecitePoemMutation({
 *   variables: {
 *      poemId: // value for 'poemId'
 *      recite: // value for 'recite'
 *   },
 * });
 */
export function useRecitePoemMutation(baseOptions?: Apollo.MutationHookOptions<RecitePoemMutation, RecitePoemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RecitePoemMutation, RecitePoemMutationVariables>(RecitePoemDocument, options);
      }
export type RecitePoemMutationHookResult = ReturnType<typeof useRecitePoemMutation>;
export type RecitePoemMutationOptions = Apollo.BaseMutationOptions<RecitePoemMutation, RecitePoemMutationVariables>;
export const StarPoemDocument = gql`
    mutation STAR_POEM($poemId: ID!, $star: Boolean) {
  starPoem(id: $poemId, star: $star) {
    id
    userIsStar
  }
}
    `;
export type StarPoemMutationFn = Apollo.MutationFunction<StarPoemMutation, StarPoemMutationVariables>;

/**
 * __useStarPoemMutation__
 *
 * To run a mutation, you first call `useStarPoemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStarPoemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [starPoemMutation, { data, loading, error }] = useStarPoemMutation({
 *   variables: {
 *      poemId: // value for 'poemId'
 *      star: // value for 'star'
 *   },
 * });
 */
export function useStarPoemMutation(baseOptions?: Apollo.MutationHookOptions<StarPoemMutation, StarPoemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StarPoemMutation, StarPoemMutationVariables>(StarPoemDocument, options);
      }
export type StarPoemMutationHookResult = ReturnType<typeof useStarPoemMutation>;
export type StarPoemMutationOptions = Apollo.BaseMutationOptions<StarPoemMutation, StarPoemMutationVariables>;
export const PoemDocument = gql`
    query POEM($poemId: ID, $poemUUID: ID, $phraseId: ID) {
  phrase(id: $phraseId) {
    id
    text
  }
  poem(id: $poemId, uuid: $poemUUID) {
    id
    title
    intro
    paragraphs
    appreciation
    translation
    kind
    annotations
    phrases {
      id
      text
    }
    tags {
      id
      name
      poems(pageSize: 3) {
        id
        title
        paragraphs
        userIsRecite
        userIsStar
        tags {
          id
          name
        }
        author {
          id
          dynasty
          name
        }
      }
    }
    author {
      id
      name
      dynasty
      birthYear
      deathYear
      intro
      poems {
        id
        title
        paragraphs
        userIsRecite
        userIsStar
      }
    }
  }
  poems(pageSize: 5) {
    id
    title
    paragraphs
  }
}
    `;

/**
 * __usePoemQuery__
 *
 * To run a query within a React component, call `usePoemQuery` and pass it any options that fit your needs.
 * When your component renders, `usePoemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePoemQuery({
 *   variables: {
 *      poemId: // value for 'poemId'
 *      poemUUID: // value for 'poemUUID'
 *      phraseId: // value for 'phraseId'
 *   },
 * });
 */
export function usePoemQuery(baseOptions?: Apollo.QueryHookOptions<PoemQuery, PoemQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PoemQuery, PoemQueryVariables>(PoemDocument, options);
      }
export function usePoemLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PoemQuery, PoemQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PoemQuery, PoemQueryVariables>(PoemDocument, options);
        }
export type PoemQueryHookResult = ReturnType<typeof usePoemQuery>;
export type PoemLazyQueryHookResult = ReturnType<typeof usePoemLazyQuery>;
export const RegisterDocument = gql`
    mutation REGISTER($email: String!, $name: String!, $password: String!, $token: String!, $verifyCode: String!) {
  createUser(
    email: $email
    name: $name
    password: $password
    token: $token
    verifyCode: $verifyCode
  ) {
    id
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      name: // value for 'name'
 *      password: // value for 'password'
 *      token: // value for 'token'
 *      verifyCode: // value for 'verifyCode'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = gql`
    mutation LOGIN($email: String!, $password: String!) {
  createUserToken(email: $email, password: $password)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SendVerifyCodeDocument = gql`
    mutation SEND_VERIFY_CODE($email: String!) {
  token: sendEmailVerifyCode(email: $email)
}
    `;
export type SendVerifyCodeMutationFn = Apollo.MutationFunction<SendVerifyCodeMutation, SendVerifyCodeMutationVariables>;

/**
 * __useSendVerifyCodeMutation__
 *
 * To run a mutation, you first call `useSendVerifyCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendVerifyCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendVerifyCodeMutation, { data, loading, error }] = useSendVerifyCodeMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSendVerifyCodeMutation(baseOptions?: Apollo.MutationHookOptions<SendVerifyCodeMutation, SendVerifyCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendVerifyCodeMutation, SendVerifyCodeMutationVariables>(SendVerifyCodeDocument, options);
      }
export type SendVerifyCodeMutationHookResult = ReturnType<typeof useSendVerifyCodeMutation>;
export type SendVerifyCodeMutationOptions = Apollo.BaseMutationOptions<SendVerifyCodeMutation, SendVerifyCodeMutationVariables>;
export const PhrasesDocument = gql`
    query PHRASES($page: Int, $pageSize: Int) {
  phrases(page: $page, pageSize: $pageSize) {
    id
    text
    authorName
    poem {
      id
      title
      author {
        id
        name
        dynasty
      }
    }
  }
  phrasesCount
}
    `;

/**
 * __usePhrasesQuery__
 *
 * To run a query within a React component, call `usePhrasesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePhrasesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePhrasesQuery({
 *   variables: {
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function usePhrasesQuery(baseOptions?: Apollo.QueryHookOptions<PhrasesQuery, PhrasesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PhrasesQuery, PhrasesQueryVariables>(PhrasesDocument, options);
      }
export function usePhrasesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PhrasesQuery, PhrasesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PhrasesQuery, PhrasesQueryVariables>(PhrasesDocument, options);
        }
export type PhrasesQueryHookResult = ReturnType<typeof usePhrasesQuery>;
export type PhrasesLazyQueryHookResult = ReturnType<typeof usePhrasesLazyQuery>;
export const StarPoemsDocument = gql`
    query STAR_POEMS($userId: ID!) {
  user(id: $userId) {
    id
    name
    starPoemsWithDate {
      poem {
        id
        title
        kind
        paragraphs
        userIsRecite
        userIsStar
        author {
          id
          name
          dynasty
        }
      }
      updateTime
    }
  }
}
    `;

/**
 * __useStarPoemsQuery__
 *
 * To run a query within a React component, call `useStarPoemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStarPoemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStarPoemsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useStarPoemsQuery(baseOptions: Apollo.QueryHookOptions<StarPoemsQuery, StarPoemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StarPoemsQuery, StarPoemsQueryVariables>(StarPoemsDocument, options);
      }
export function useStarPoemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StarPoemsQuery, StarPoemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StarPoemsQuery, StarPoemsQueryVariables>(StarPoemsDocument, options);
        }
export type StarPoemsQueryHookResult = ReturnType<typeof useStarPoemsQuery>;
export type StarPoemsLazyQueryHookResult = ReturnType<typeof useStarPoemsLazyQuery>;
export const RecitePoemsDocument = gql`
    query RECITE_POEMS($userId: ID!) {
  user(id: $userId) {
    id
    name
    recitePoemsWithDate {
      poem {
        id
        title
        kind
        paragraphs
        userIsRecite
        userIsStar
        author {
          id
          name
          dynasty
        }
      }
      updateTime
    }
  }
}
    `;

/**
 * __useRecitePoemsQuery__
 *
 * To run a query within a React component, call `useRecitePoemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecitePoemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecitePoemsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useRecitePoemsQuery(baseOptions: Apollo.QueryHookOptions<RecitePoemsQuery, RecitePoemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RecitePoemsQuery, RecitePoemsQueryVariables>(RecitePoemsDocument, options);
      }
export function useRecitePoemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecitePoemsQuery, RecitePoemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RecitePoemsQuery, RecitePoemsQueryVariables>(RecitePoemsDocument, options);
        }
export type RecitePoemsQueryHookResult = ReturnType<typeof useRecitePoemsQuery>;
export type RecitePoemsLazyQueryHookResult = ReturnType<typeof useRecitePoemsLazyQuery>;
export const MeDocument = gql`
    query ME {
  me {
    id
    name
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export const TagsDocument = gql`
    query TAGS {
  tags {
    id
    name
    kind
  }
}
    `;

/**
 * __useTagsQuery__
 *
 * To run a query within a React component, call `useTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTagsQuery(baseOptions?: Apollo.QueryHookOptions<TagsQuery, TagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TagsQuery, TagsQueryVariables>(TagsDocument, options);
      }
export function useTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TagsQuery, TagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TagsQuery, TagsQueryVariables>(TagsDocument, options);
        }
export type TagsQueryHookResult = ReturnType<typeof useTagsQuery>;
export type TagsLazyQueryHookResult = ReturnType<typeof useTagsLazyQuery>;
export const AuthorsDocument = gql`
    query AUTHORS($page: Int, $q: String) {
  authors(page: $page, q: $q) {
    id
    name
    intro
    dynasty
    birthYear
    deathYear
  }
  authorsCount(q: $q)
}
    `;

/**
 * __useAuthorsQuery__
 *
 * To run a query within a React component, call `useAuthorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthorsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      q: // value for 'q'
 *   },
 * });
 */
export function useAuthorsQuery(baseOptions?: Apollo.QueryHookOptions<AuthorsQuery, AuthorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AuthorsQuery, AuthorsQueryVariables>(AuthorsDocument, options);
      }
export function useAuthorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuthorsQuery, AuthorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AuthorsQuery, AuthorsQueryVariables>(AuthorsDocument, options);
        }
export type AuthorsQueryHookResult = ReturnType<typeof useAuthorsQuery>;
export type AuthorsLazyQueryHookResult = ReturnType<typeof useAuthorsLazyQuery>;
export const AuthorDocument = gql`
    query AUTHOR($id: ID!) {
  author(id: $id) {
    id
    name
    intro
    birthYear
    deathYear
    dynasty
  }
}
    `;

/**
 * __useAuthorQuery__
 *
 * To run a query within a React component, call `useAuthorQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthorQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAuthorQuery(baseOptions: Apollo.QueryHookOptions<AuthorQuery, AuthorQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AuthorQuery, AuthorQueryVariables>(AuthorDocument, options);
      }
export function useAuthorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuthorQuery, AuthorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AuthorQuery, AuthorQueryVariables>(AuthorDocument, options);
        }
export type AuthorQueryHookResult = ReturnType<typeof useAuthorQuery>;
export type AuthorLazyQueryHookResult = ReturnType<typeof useAuthorLazyQuery>;
export const AuthorPoemsDocument = gql`
    query AUTHOR_POEMS($id: ID!, $page: Int) {
  author(id: $id) {
    id
    poems(page: $page) {
      id
      title
      kind
      phrases {
        id
        text
        poem {
          id
        }
      }
      tags {
        id
        name
      }
      userIsRecite
      userIsStar
      paragraphs
    }
    poemsCount
  }
}
    `;

/**
 * __useAuthorPoemsQuery__
 *
 * To run a query within a React component, call `useAuthorPoemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthorPoemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthorPoemsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useAuthorPoemsQuery(baseOptions: Apollo.QueryHookOptions<AuthorPoemsQuery, AuthorPoemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AuthorPoemsQuery, AuthorPoemsQueryVariables>(AuthorPoemsDocument, options);
      }
export function useAuthorPoemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuthorPoemsQuery, AuthorPoemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AuthorPoemsQuery, AuthorPoemsQueryVariables>(AuthorPoemsDocument, options);
        }
export type AuthorPoemsQueryHookResult = ReturnType<typeof useAuthorPoemsQuery>;
export type AuthorPoemsLazyQueryHookResult = ReturnType<typeof useAuthorPoemsLazyQuery>;