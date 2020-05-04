import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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
  tags?: Maybe<Array<Tag>>;
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

export type PoemsQueryVariables = {
  page?: Maybe<Scalars['Int']>;
  q?: Maybe<Scalars['String']>;
  tagId?: Maybe<Scalars['ID']>;
};


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

export type PoemsUserStarQueryVariables = {
  page?: Maybe<Scalars['Int']>;
  q?: Maybe<Scalars['String']>;
  tagId?: Maybe<Scalars['ID']>;
};


export type PoemsUserStarQuery = (
  { __typename?: 'Query' }
  & { poems: Array<(
    { __typename?: 'Poem' }
    & Pick<Poem, 'id' | 'userIsStar' | 'userIsRecite'>
  )> }
);

export type PoemUserStarQueryVariables = {
  id: Scalars['ID'];
};


export type PoemUserStarQuery = (
  { __typename?: 'Query' }
  & { poem?: Maybe<(
    { __typename?: 'Poem' }
    & Pick<Poem, 'id' | 'userIsStar' | 'userIsRecite'>
  )> }
);

export type RecitePoemMutationVariables = {
  poemId: Scalars['ID'];
  recite?: Maybe<Scalars['Boolean']>;
};


export type RecitePoemMutation = (
  { __typename?: 'Mutation' }
  & { recitePoem: (
    { __typename?: 'Poem' }
    & Pick<Poem, 'id' | 'userIsRecite'>
  ) }
);

export type StarPoemMutationVariables = {
  poemId: Scalars['ID'];
  star?: Maybe<Scalars['Boolean']>;
};


export type StarPoemMutation = (
  { __typename?: 'Mutation' }
  & { starPoem: (
    { __typename?: 'Poem' }
    & Pick<Poem, 'id' | 'userIsStar'>
  ) }
);

export type PoemQueryVariables = {
  poemId: Scalars['ID'];
  phraseId?: Maybe<Scalars['ID']>;
};


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

export type RegisterMutationVariables = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
  verifyCode: Scalars['String'];
};


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
  ) }
);

export type LoginMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createUserToken'>
);

export type SendVerifyCodeMutationVariables = {
  email: Scalars['String'];
};


export type SendVerifyCodeMutation = (
  { __typename?: 'Mutation' }
  & { token: Mutation['sendEmailVerifyCode'] }
);

export type PhrasesQueryVariables = {
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
};


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

export type StarPoemsQueryVariables = {
  userId: Scalars['ID'];
};


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

export type RecitePoemsQueryVariables = {
  userId: Scalars['ID'];
};


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

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
  )> }
);

export type TagsQueryVariables = {};


export type TagsQuery = (
  { __typename?: 'Query' }
  & { tags?: Maybe<Array<(
    { __typename?: 'Tag' }
    & Pick<Tag, 'id' | 'name' | 'kind'>
  )>> }
);

export type AuthorsQueryVariables = {
  page?: Maybe<Scalars['Int']>;
  q?: Maybe<Scalars['String']>;
};


export type AuthorsQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'authorsCount'>
  & { authors: Array<(
    { __typename?: 'Author' }
    & Pick<Author, 'id' | 'name' | 'intro' | 'dynasty' | 'birthYear' | 'deathYear'>
  )> }
);

export type AuthorQueryVariables = {
  id: Scalars['ID'];
};


export type AuthorQuery = (
  { __typename?: 'Query' }
  & { author?: Maybe<(
    { __typename?: 'Author' }
    & Pick<Author, 'id' | 'name' | 'intro' | 'birthYear' | 'deathYear' | 'dynasty'>
  )> }
);

export type AuthorPoemsQueryVariables = {
  id: Scalars['ID'];
  page?: Maybe<Scalars['Int']>;
};


export type AuthorPoemsQuery = (
  { __typename?: 'Query' }
  & { author?: Maybe<(
    { __typename?: 'Author' }
    & Pick<Author, 'id' | 'poemsCount'>
    & { poems: Array<(
      { __typename?: 'Poem' }
      & Pick<Poem, 'id' | 'title' | 'kind' | 'userIsRecite' | 'userIsStar' | 'paragraphs'>
      & { tags?: Maybe<Array<(
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
export type PoemsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<PoemsQuery, PoemsQueryVariables>, 'query'>;

    export const PoemsComponent = (props: PoemsComponentProps) => (
      <ApolloReactComponents.Query<PoemsQuery, PoemsQueryVariables> query={PoemsDocument} {...props} />
    );
    
export type PoemsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<PoemsQuery, PoemsQueryVariables>
    } & TChildProps;
export function withPoems<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  PoemsQuery,
  PoemsQueryVariables,
  PoemsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, PoemsQuery, PoemsQueryVariables, PoemsProps<TChildProps, TDataName>>(PoemsDocument, {
      alias: 'poems',
      ...operationOptions
    });
};

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
export function usePoemsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PoemsQuery, PoemsQueryVariables>) {
        return ApolloReactHooks.useQuery<PoemsQuery, PoemsQueryVariables>(PoemsDocument, baseOptions);
      }
export function usePoemsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PoemsQuery, PoemsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PoemsQuery, PoemsQueryVariables>(PoemsDocument, baseOptions);
        }
export type PoemsQueryHookResult = ReturnType<typeof usePoemsQuery>;
export type PoemsLazyQueryHookResult = ReturnType<typeof usePoemsLazyQuery>;
export type PoemsQueryResult = ApolloReactCommon.QueryResult<PoemsQuery, PoemsQueryVariables>;
export const PoemsUserStarDocument = gql`
    query POEMS_USER_STAR($page: Int, $q: String, $tagId: ID) {
  poems(page: $page, q: $q, tagId: $tagId) {
    id
    userIsStar
    userIsRecite
  }
}
    `;
export type PoemsUserStarComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<PoemsUserStarQuery, PoemsUserStarQueryVariables>, 'query'>;

    export const PoemsUserStarComponent = (props: PoemsUserStarComponentProps) => (
      <ApolloReactComponents.Query<PoemsUserStarQuery, PoemsUserStarQueryVariables> query={PoemsUserStarDocument} {...props} />
    );
    
export type PoemsUserStarProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<PoemsUserStarQuery, PoemsUserStarQueryVariables>
    } & TChildProps;
export function withPoemsUserStar<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  PoemsUserStarQuery,
  PoemsUserStarQueryVariables,
  PoemsUserStarProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, PoemsUserStarQuery, PoemsUserStarQueryVariables, PoemsUserStarProps<TChildProps, TDataName>>(PoemsUserStarDocument, {
      alias: 'poemsUserStar',
      ...operationOptions
    });
};

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
export function usePoemsUserStarQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PoemsUserStarQuery, PoemsUserStarQueryVariables>) {
        return ApolloReactHooks.useQuery<PoemsUserStarQuery, PoemsUserStarQueryVariables>(PoemsUserStarDocument, baseOptions);
      }
export function usePoemsUserStarLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PoemsUserStarQuery, PoemsUserStarQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PoemsUserStarQuery, PoemsUserStarQueryVariables>(PoemsUserStarDocument, baseOptions);
        }
export type PoemsUserStarQueryHookResult = ReturnType<typeof usePoemsUserStarQuery>;
export type PoemsUserStarLazyQueryHookResult = ReturnType<typeof usePoemsUserStarLazyQuery>;
export type PoemsUserStarQueryResult = ApolloReactCommon.QueryResult<PoemsUserStarQuery, PoemsUserStarQueryVariables>;
export const PoemUserStarDocument = gql`
    query POEM_USER_STAR($id: ID!) {
  poem(id: $id) {
    id
    userIsStar
    userIsRecite
  }
}
    `;
export type PoemUserStarComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<PoemUserStarQuery, PoemUserStarQueryVariables>, 'query'> & ({ variables: PoemUserStarQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const PoemUserStarComponent = (props: PoemUserStarComponentProps) => (
      <ApolloReactComponents.Query<PoemUserStarQuery, PoemUserStarQueryVariables> query={PoemUserStarDocument} {...props} />
    );
    
export type PoemUserStarProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<PoemUserStarQuery, PoemUserStarQueryVariables>
    } & TChildProps;
export function withPoemUserStar<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  PoemUserStarQuery,
  PoemUserStarQueryVariables,
  PoemUserStarProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, PoemUserStarQuery, PoemUserStarQueryVariables, PoemUserStarProps<TChildProps, TDataName>>(PoemUserStarDocument, {
      alias: 'poemUserStar',
      ...operationOptions
    });
};

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
export function usePoemUserStarQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PoemUserStarQuery, PoemUserStarQueryVariables>) {
        return ApolloReactHooks.useQuery<PoemUserStarQuery, PoemUserStarQueryVariables>(PoemUserStarDocument, baseOptions);
      }
export function usePoemUserStarLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PoemUserStarQuery, PoemUserStarQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PoemUserStarQuery, PoemUserStarQueryVariables>(PoemUserStarDocument, baseOptions);
        }
export type PoemUserStarQueryHookResult = ReturnType<typeof usePoemUserStarQuery>;
export type PoemUserStarLazyQueryHookResult = ReturnType<typeof usePoemUserStarLazyQuery>;
export type PoemUserStarQueryResult = ApolloReactCommon.QueryResult<PoemUserStarQuery, PoemUserStarQueryVariables>;
export const RecitePoemDocument = gql`
    mutation RECITE_POEM($poemId: ID!, $recite: Boolean) {
  recitePoem(id: $poemId, recite: $recite) {
    id
    userIsRecite
  }
}
    `;
export type RecitePoemMutationFn = ApolloReactCommon.MutationFunction<RecitePoemMutation, RecitePoemMutationVariables>;
export type RecitePoemComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<RecitePoemMutation, RecitePoemMutationVariables>, 'mutation'>;

    export const RecitePoemComponent = (props: RecitePoemComponentProps) => (
      <ApolloReactComponents.Mutation<RecitePoemMutation, RecitePoemMutationVariables> mutation={RecitePoemDocument} {...props} />
    );
    
export type RecitePoemProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<RecitePoemMutation, RecitePoemMutationVariables>
    } & TChildProps;
export function withRecitePoem<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  RecitePoemMutation,
  RecitePoemMutationVariables,
  RecitePoemProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, RecitePoemMutation, RecitePoemMutationVariables, RecitePoemProps<TChildProps, TDataName>>(RecitePoemDocument, {
      alias: 'recitePoem',
      ...operationOptions
    });
};

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
export function useRecitePoemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RecitePoemMutation, RecitePoemMutationVariables>) {
        return ApolloReactHooks.useMutation<RecitePoemMutation, RecitePoemMutationVariables>(RecitePoemDocument, baseOptions);
      }
export type RecitePoemMutationHookResult = ReturnType<typeof useRecitePoemMutation>;
export type RecitePoemMutationResult = ApolloReactCommon.MutationResult<RecitePoemMutation>;
export type RecitePoemMutationOptions = ApolloReactCommon.BaseMutationOptions<RecitePoemMutation, RecitePoemMutationVariables>;
export const StarPoemDocument = gql`
    mutation STAR_POEM($poemId: ID!, $star: Boolean) {
  starPoem(id: $poemId, star: $star) {
    id
    userIsStar
  }
}
    `;
export type StarPoemMutationFn = ApolloReactCommon.MutationFunction<StarPoemMutation, StarPoemMutationVariables>;
export type StarPoemComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<StarPoemMutation, StarPoemMutationVariables>, 'mutation'>;

    export const StarPoemComponent = (props: StarPoemComponentProps) => (
      <ApolloReactComponents.Mutation<StarPoemMutation, StarPoemMutationVariables> mutation={StarPoemDocument} {...props} />
    );
    
export type StarPoemProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<StarPoemMutation, StarPoemMutationVariables>
    } & TChildProps;
export function withStarPoem<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  StarPoemMutation,
  StarPoemMutationVariables,
  StarPoemProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, StarPoemMutation, StarPoemMutationVariables, StarPoemProps<TChildProps, TDataName>>(StarPoemDocument, {
      alias: 'starPoem',
      ...operationOptions
    });
};

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
export function useStarPoemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<StarPoemMutation, StarPoemMutationVariables>) {
        return ApolloReactHooks.useMutation<StarPoemMutation, StarPoemMutationVariables>(StarPoemDocument, baseOptions);
      }
export type StarPoemMutationHookResult = ReturnType<typeof useStarPoemMutation>;
export type StarPoemMutationResult = ApolloReactCommon.MutationResult<StarPoemMutation>;
export type StarPoemMutationOptions = ApolloReactCommon.BaseMutationOptions<StarPoemMutation, StarPoemMutationVariables>;
export const PoemDocument = gql`
    query POEM($poemId: ID!, $phraseId: ID) {
  phrase(id: $phraseId) {
    id
    text
  }
  poem(id: $poemId) {
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
      poems(pageSize: 6) {
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
  poems {
    id
    title
    paragraphs
  }
}
    `;
export type PoemComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<PoemQuery, PoemQueryVariables>, 'query'> & ({ variables: PoemQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const PoemComponent = (props: PoemComponentProps) => (
      <ApolloReactComponents.Query<PoemQuery, PoemQueryVariables> query={PoemDocument} {...props} />
    );
    
export type PoemProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<PoemQuery, PoemQueryVariables>
    } & TChildProps;
export function withPoem<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  PoemQuery,
  PoemQueryVariables,
  PoemProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, PoemQuery, PoemQueryVariables, PoemProps<TChildProps, TDataName>>(PoemDocument, {
      alias: 'poem',
      ...operationOptions
    });
};

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
 *      phraseId: // value for 'phraseId'
 *   },
 * });
 */
export function usePoemQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PoemQuery, PoemQueryVariables>) {
        return ApolloReactHooks.useQuery<PoemQuery, PoemQueryVariables>(PoemDocument, baseOptions);
      }
export function usePoemLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PoemQuery, PoemQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PoemQuery, PoemQueryVariables>(PoemDocument, baseOptions);
        }
export type PoemQueryHookResult = ReturnType<typeof usePoemQuery>;
export type PoemLazyQueryHookResult = ReturnType<typeof usePoemLazyQuery>;
export type PoemQueryResult = ApolloReactCommon.QueryResult<PoemQuery, PoemQueryVariables>;
export const RegisterDocument = gql`
    mutation REGISTER($email: String!, $name: String!, $password: String!, $token: String!, $verifyCode: String!) {
  createUser(email: $email, name: $name, password: $password, token: $token, verifyCode: $verifyCode) {
    id
  }
}
    `;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;
export type RegisterComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<RegisterMutation, RegisterMutationVariables>, 'mutation'>;

    export const RegisterComponent = (props: RegisterComponentProps) => (
      <ApolloReactComponents.Mutation<RegisterMutation, RegisterMutationVariables> mutation={RegisterDocument} {...props} />
    );
    
export type RegisterProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>
    } & TChildProps;
export function withRegister<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  RegisterMutation,
  RegisterMutationVariables,
  RegisterProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, RegisterMutation, RegisterMutationVariables, RegisterProps<TChildProps, TDataName>>(RegisterDocument, {
      alias: 'register',
      ...operationOptions
    });
};

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
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = gql`
    mutation LOGIN($email: String!, $password: String!) {
  createUserToken(email: $email, password: $password)
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;
export type LoginComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LoginMutation, LoginMutationVariables>, 'mutation'>;

    export const LoginComponent = (props: LoginComponentProps) => (
      <ApolloReactComponents.Mutation<LoginMutation, LoginMutationVariables> mutation={LoginDocument} {...props} />
    );
    
export type LoginProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>
    } & TChildProps;
export function withLogin<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LoginMutation,
  LoginMutationVariables,
  LoginProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, LoginMutation, LoginMutationVariables, LoginProps<TChildProps, TDataName>>(LoginDocument, {
      alias: 'login',
      ...operationOptions
    });
};

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
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SendVerifyCodeDocument = gql`
    mutation SEND_VERIFY_CODE($email: String!) {
  token: sendEmailVerifyCode(email: $email)
}
    `;
export type SendVerifyCodeMutationFn = ApolloReactCommon.MutationFunction<SendVerifyCodeMutation, SendVerifyCodeMutationVariables>;
export type SendVerifyCodeComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SendVerifyCodeMutation, SendVerifyCodeMutationVariables>, 'mutation'>;

    export const SendVerifyCodeComponent = (props: SendVerifyCodeComponentProps) => (
      <ApolloReactComponents.Mutation<SendVerifyCodeMutation, SendVerifyCodeMutationVariables> mutation={SendVerifyCodeDocument} {...props} />
    );
    
export type SendVerifyCodeProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<SendVerifyCodeMutation, SendVerifyCodeMutationVariables>
    } & TChildProps;
export function withSendVerifyCode<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SendVerifyCodeMutation,
  SendVerifyCodeMutationVariables,
  SendVerifyCodeProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, SendVerifyCodeMutation, SendVerifyCodeMutationVariables, SendVerifyCodeProps<TChildProps, TDataName>>(SendVerifyCodeDocument, {
      alias: 'sendVerifyCode',
      ...operationOptions
    });
};

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
export function useSendVerifyCodeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SendVerifyCodeMutation, SendVerifyCodeMutationVariables>) {
        return ApolloReactHooks.useMutation<SendVerifyCodeMutation, SendVerifyCodeMutationVariables>(SendVerifyCodeDocument, baseOptions);
      }
export type SendVerifyCodeMutationHookResult = ReturnType<typeof useSendVerifyCodeMutation>;
export type SendVerifyCodeMutationResult = ApolloReactCommon.MutationResult<SendVerifyCodeMutation>;
export type SendVerifyCodeMutationOptions = ApolloReactCommon.BaseMutationOptions<SendVerifyCodeMutation, SendVerifyCodeMutationVariables>;
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
export type PhrasesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<PhrasesQuery, PhrasesQueryVariables>, 'query'>;

    export const PhrasesComponent = (props: PhrasesComponentProps) => (
      <ApolloReactComponents.Query<PhrasesQuery, PhrasesQueryVariables> query={PhrasesDocument} {...props} />
    );
    
export type PhrasesProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<PhrasesQuery, PhrasesQueryVariables>
    } & TChildProps;
export function withPhrases<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  PhrasesQuery,
  PhrasesQueryVariables,
  PhrasesProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, PhrasesQuery, PhrasesQueryVariables, PhrasesProps<TChildProps, TDataName>>(PhrasesDocument, {
      alias: 'phrases',
      ...operationOptions
    });
};

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
export function usePhrasesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PhrasesQuery, PhrasesQueryVariables>) {
        return ApolloReactHooks.useQuery<PhrasesQuery, PhrasesQueryVariables>(PhrasesDocument, baseOptions);
      }
export function usePhrasesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PhrasesQuery, PhrasesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PhrasesQuery, PhrasesQueryVariables>(PhrasesDocument, baseOptions);
        }
export type PhrasesQueryHookResult = ReturnType<typeof usePhrasesQuery>;
export type PhrasesLazyQueryHookResult = ReturnType<typeof usePhrasesLazyQuery>;
export type PhrasesQueryResult = ApolloReactCommon.QueryResult<PhrasesQuery, PhrasesQueryVariables>;
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
export type StarPoemsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<StarPoemsQuery, StarPoemsQueryVariables>, 'query'> & ({ variables: StarPoemsQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const StarPoemsComponent = (props: StarPoemsComponentProps) => (
      <ApolloReactComponents.Query<StarPoemsQuery, StarPoemsQueryVariables> query={StarPoemsDocument} {...props} />
    );
    
export type StarPoemsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<StarPoemsQuery, StarPoemsQueryVariables>
    } & TChildProps;
export function withStarPoems<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  StarPoemsQuery,
  StarPoemsQueryVariables,
  StarPoemsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, StarPoemsQuery, StarPoemsQueryVariables, StarPoemsProps<TChildProps, TDataName>>(StarPoemsDocument, {
      alias: 'starPoems',
      ...operationOptions
    });
};

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
export function useStarPoemsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<StarPoemsQuery, StarPoemsQueryVariables>) {
        return ApolloReactHooks.useQuery<StarPoemsQuery, StarPoemsQueryVariables>(StarPoemsDocument, baseOptions);
      }
export function useStarPoemsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<StarPoemsQuery, StarPoemsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<StarPoemsQuery, StarPoemsQueryVariables>(StarPoemsDocument, baseOptions);
        }
export type StarPoemsQueryHookResult = ReturnType<typeof useStarPoemsQuery>;
export type StarPoemsLazyQueryHookResult = ReturnType<typeof useStarPoemsLazyQuery>;
export type StarPoemsQueryResult = ApolloReactCommon.QueryResult<StarPoemsQuery, StarPoemsQueryVariables>;
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
export type RecitePoemsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<RecitePoemsQuery, RecitePoemsQueryVariables>, 'query'> & ({ variables: RecitePoemsQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const RecitePoemsComponent = (props: RecitePoemsComponentProps) => (
      <ApolloReactComponents.Query<RecitePoemsQuery, RecitePoemsQueryVariables> query={RecitePoemsDocument} {...props} />
    );
    
export type RecitePoemsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<RecitePoemsQuery, RecitePoemsQueryVariables>
    } & TChildProps;
export function withRecitePoems<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  RecitePoemsQuery,
  RecitePoemsQueryVariables,
  RecitePoemsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, RecitePoemsQuery, RecitePoemsQueryVariables, RecitePoemsProps<TChildProps, TDataName>>(RecitePoemsDocument, {
      alias: 'recitePoems',
      ...operationOptions
    });
};

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
export function useRecitePoemsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RecitePoemsQuery, RecitePoemsQueryVariables>) {
        return ApolloReactHooks.useQuery<RecitePoemsQuery, RecitePoemsQueryVariables>(RecitePoemsDocument, baseOptions);
      }
export function useRecitePoemsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RecitePoemsQuery, RecitePoemsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<RecitePoemsQuery, RecitePoemsQueryVariables>(RecitePoemsDocument, baseOptions);
        }
export type RecitePoemsQueryHookResult = ReturnType<typeof useRecitePoemsQuery>;
export type RecitePoemsLazyQueryHookResult = ReturnType<typeof useRecitePoemsLazyQuery>;
export type RecitePoemsQueryResult = ApolloReactCommon.QueryResult<RecitePoemsQuery, RecitePoemsQueryVariables>;
export const MeDocument = gql`
    query ME {
  me {
    id
    name
  }
}
    `;
export type MeComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MeQuery, MeQueryVariables>, 'query'>;

    export const MeComponent = (props: MeComponentProps) => (
      <ApolloReactComponents.Query<MeQuery, MeQueryVariables> query={MeDocument} {...props} />
    );
    
export type MeProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<MeQuery, MeQueryVariables>
    } & TChildProps;
export function withMe<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  MeQuery,
  MeQueryVariables,
  MeProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, MeQuery, MeQueryVariables, MeProps<TChildProps, TDataName>>(MeDocument, {
      alias: 'me',
      ...operationOptions
    });
};

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
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const TagsDocument = gql`
    query TAGS {
  tags {
    id
    name
    kind
  }
}
    `;
export type TagsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<TagsQuery, TagsQueryVariables>, 'query'>;

    export const TagsComponent = (props: TagsComponentProps) => (
      <ApolloReactComponents.Query<TagsQuery, TagsQueryVariables> query={TagsDocument} {...props} />
    );
    
export type TagsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<TagsQuery, TagsQueryVariables>
    } & TChildProps;
export function withTags<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  TagsQuery,
  TagsQueryVariables,
  TagsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, TagsQuery, TagsQueryVariables, TagsProps<TChildProps, TDataName>>(TagsDocument, {
      alias: 'tags',
      ...operationOptions
    });
};

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
export function useTagsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TagsQuery, TagsQueryVariables>) {
        return ApolloReactHooks.useQuery<TagsQuery, TagsQueryVariables>(TagsDocument, baseOptions);
      }
export function useTagsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TagsQuery, TagsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TagsQuery, TagsQueryVariables>(TagsDocument, baseOptions);
        }
export type TagsQueryHookResult = ReturnType<typeof useTagsQuery>;
export type TagsLazyQueryHookResult = ReturnType<typeof useTagsLazyQuery>;
export type TagsQueryResult = ApolloReactCommon.QueryResult<TagsQuery, TagsQueryVariables>;
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
export type AuthorsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<AuthorsQuery, AuthorsQueryVariables>, 'query'>;

    export const AuthorsComponent = (props: AuthorsComponentProps) => (
      <ApolloReactComponents.Query<AuthorsQuery, AuthorsQueryVariables> query={AuthorsDocument} {...props} />
    );
    
export type AuthorsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<AuthorsQuery, AuthorsQueryVariables>
    } & TChildProps;
export function withAuthors<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AuthorsQuery,
  AuthorsQueryVariables,
  AuthorsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, AuthorsQuery, AuthorsQueryVariables, AuthorsProps<TChildProps, TDataName>>(AuthorsDocument, {
      alias: 'authors',
      ...operationOptions
    });
};

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
export function useAuthorsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AuthorsQuery, AuthorsQueryVariables>) {
        return ApolloReactHooks.useQuery<AuthorsQuery, AuthorsQueryVariables>(AuthorsDocument, baseOptions);
      }
export function useAuthorsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AuthorsQuery, AuthorsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AuthorsQuery, AuthorsQueryVariables>(AuthorsDocument, baseOptions);
        }
export type AuthorsQueryHookResult = ReturnType<typeof useAuthorsQuery>;
export type AuthorsLazyQueryHookResult = ReturnType<typeof useAuthorsLazyQuery>;
export type AuthorsQueryResult = ApolloReactCommon.QueryResult<AuthorsQuery, AuthorsQueryVariables>;
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
export type AuthorComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<AuthorQuery, AuthorQueryVariables>, 'query'> & ({ variables: AuthorQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const AuthorComponent = (props: AuthorComponentProps) => (
      <ApolloReactComponents.Query<AuthorQuery, AuthorQueryVariables> query={AuthorDocument} {...props} />
    );
    
export type AuthorProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<AuthorQuery, AuthorQueryVariables>
    } & TChildProps;
export function withAuthor<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AuthorQuery,
  AuthorQueryVariables,
  AuthorProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, AuthorQuery, AuthorQueryVariables, AuthorProps<TChildProps, TDataName>>(AuthorDocument, {
      alias: 'author',
      ...operationOptions
    });
};

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
export function useAuthorQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AuthorQuery, AuthorQueryVariables>) {
        return ApolloReactHooks.useQuery<AuthorQuery, AuthorQueryVariables>(AuthorDocument, baseOptions);
      }
export function useAuthorLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AuthorQuery, AuthorQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AuthorQuery, AuthorQueryVariables>(AuthorDocument, baseOptions);
        }
export type AuthorQueryHookResult = ReturnType<typeof useAuthorQuery>;
export type AuthorLazyQueryHookResult = ReturnType<typeof useAuthorLazyQuery>;
export type AuthorQueryResult = ApolloReactCommon.QueryResult<AuthorQuery, AuthorQueryVariables>;
export const AuthorPoemsDocument = gql`
    query AUTHOR_POEMS($id: ID!, $page: Int) {
  author(id: $id) {
    id
    poems(page: $page) {
      id
      title
      kind
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
export type AuthorPoemsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<AuthorPoemsQuery, AuthorPoemsQueryVariables>, 'query'> & ({ variables: AuthorPoemsQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const AuthorPoemsComponent = (props: AuthorPoemsComponentProps) => (
      <ApolloReactComponents.Query<AuthorPoemsQuery, AuthorPoemsQueryVariables> query={AuthorPoemsDocument} {...props} />
    );
    
export type AuthorPoemsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<AuthorPoemsQuery, AuthorPoemsQueryVariables>
    } & TChildProps;
export function withAuthorPoems<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AuthorPoemsQuery,
  AuthorPoemsQueryVariables,
  AuthorPoemsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, AuthorPoemsQuery, AuthorPoemsQueryVariables, AuthorPoemsProps<TChildProps, TDataName>>(AuthorPoemsDocument, {
      alias: 'authorPoems',
      ...operationOptions
    });
};

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
export function useAuthorPoemsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AuthorPoemsQuery, AuthorPoemsQueryVariables>) {
        return ApolloReactHooks.useQuery<AuthorPoemsQuery, AuthorPoemsQueryVariables>(AuthorPoemsDocument, baseOptions);
      }
export function useAuthorPoemsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AuthorPoemsQuery, AuthorPoemsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AuthorPoemsQuery, AuthorPoemsQueryVariables>(AuthorPoemsDocument, baseOptions);
        }
export type AuthorPoemsQueryHookResult = ReturnType<typeof useAuthorPoemsQuery>;
export type AuthorPoemsLazyQueryHookResult = ReturnType<typeof useAuthorPoemsLazyQuery>;
export type AuthorPoemsQueryResult = ApolloReactCommon.QueryResult<AuthorPoemsQuery, AuthorPoemsQueryVariables>;