export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the
   * `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO
   * 8601 standard for representation of dates and times using the Gregorian calendar.
   */
  DateTime: Date;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { [key: string]: any };
  ConstraintString: any;
  ConstraintNumber: any;
};

export type Author = {
  __typename?: "Author";
  id: Scalars["ID"];
  uuid: Scalars["ID"];
  name: Scalars["String"];
  dynasty?: Maybe<Scalars["String"]>;
  birthYear?: Maybe<Scalars["String"]>;
  deathYear?: Maybe<Scalars["String"]>;
  baikeUrl?: Maybe<Scalars["String"]>;
  star?: Maybe<Scalars["Int"]>;
  intro?: Maybe<Scalars["String"]>;
  poems: Array<Poem>;
  poemsCount: Scalars["Int"];
};

export type AuthorPoemsArgs = {
  page?: Maybe<Scalars["Int"]>;
  pageSize?: Maybe<Scalars["Int"]>;
};

export type Like = {
  like: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  /** 登录，如果返回 null，则登录失败 */
  createUserToken?: Maybe<Scalars["String"]>;
  /** 注册 */
  createUser: User;
  /** 发送邮件
   * 返回一个 token，注册时需要携带 token，用以校验验证码
   */
  sendEmailVerifyCode: Scalars["String"];
  starPoem: Poem;
  recitePoem: Poem;
  createTodo?: Maybe<Todo>;
  updateTodo?: Maybe<Scalars["Boolean"]>;
};

export type MutationCreateUserTokenArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationCreateUserArgs = {
  name: Scalars["String"];
  password: Scalars["String"];
  email: Scalars["String"];
  verifyCode: Scalars["String"];
  token: Scalars["String"];
};

export type MutationSendEmailVerifyCodeArgs = {
  email: Scalars["String"];
};

export type MutationStarPoemArgs = {
  id: Scalars["ID"];
  star?: Maybe<Scalars["Boolean"]>;
};

export type MutationRecitePoemArgs = {
  id: Scalars["ID"];
  recite?: Maybe<Scalars["Boolean"]>;
};

export type MutationCreateTodoArgs = {
  todo: TodoCreate;
};

export type MutationUpdateTodoArgs = {
  todo: TodoUpdate;
};

export type Order = {
  field: Scalars["String"];
  asc?: Maybe<Scalars["Boolean"]>;
};

export type Phrase = {
  __typename?: "Phrase";
  id: Scalars["ID"];
  phrase: Scalars["String"];
  text: Scalars["String"];
  authorName?: Maybe<Scalars["String"]>;
  poem: Poem;
};

export type Poem = {
  __typename?: "Poem";
  id: Scalars["ID"];
  uuid: Scalars["ID"];
  title: Scalars["String"];
  kind?: Maybe<Scalars["String"]>;
  baikeUrl?: Maybe<Scalars["String"]>;
  paragraphs: Array<Scalars["String"]>;
  starCount: Scalars["Int"];
  appreciation?: Maybe<Array<Maybe<Scalars["String"]>>>;
  translation?: Maybe<Array<Maybe<Scalars["String"]>>>;
  intro?: Maybe<Array<Maybe<Scalars["String"]>>>;
  annotations?: Maybe<Scalars["JSON"]>;
  expertComments?: Maybe<Scalars["JSON"]>;
  author?: Maybe<Author>;
  phrases?: Maybe<Array<Phrase>>;
  tags?: Maybe<Array<Tag>>;
  /** 用户是否喜欢该诗词，null 为未登录 */
  userIsStar?: Maybe<Scalars["Boolean"]>;
  /** 用户是否会背该诗词，null 为未登录 */
  userIsRecite?: Maybe<Scalars["Boolean"]>;
};

export type Query = {
  __typename?: "Query";
  ping: Scalars["String"];
  error: Scalars["Int"];
  reqError?: Maybe<Scalars["Int"]>;
  cache: Scalars["Int"];
  exceptionWithData?: Maybe<Scalars["Int"]>;
  me?: Maybe<User>;
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
  phrase: Phrase;
  author?: Maybe<Author>;
  poems: Array<Poem>;
  authors: Array<Author>;
  phrases: Array<Phrase>;
  phrasesCount: Scalars["Int"];
  poemsCount: Scalars["Int"];
  authorsCount: Scalars["Int"];
  poem?: Maybe<Poem>;
  tags?: Maybe<Array<Tag>>;
  tag?: Maybe<Tag>;
};

export type QueryUserArgs = {
  id: Scalars["ID"];
};

export type QueryPhraseArgs = {
  id?: Maybe<Scalars["ID"]>;
  date?: Maybe<Scalars["DateTime"]>;
  random?: Maybe<Scalars["Boolean"]>;
};

export type QueryAuthorArgs = {
  uuid: Scalars["ID"];
};

export type QueryPoemsArgs = {
  page?: Maybe<Scalars["Int"]>;
  pageSize?: Maybe<Scalars["Int"]>;
  q?: Maybe<Scalars["String"]>;
  tagId?: Maybe<Scalars["ID"]>;
};

export type QueryAuthorsArgs = {
  page?: Maybe<Scalars["Int"]>;
  pageSize?: Maybe<Scalars["Int"]>;
  q?: Maybe<Scalars["String"]>;
};

export type QueryPhrasesArgs = {
  page?: Maybe<Scalars["Int"]>;
  pageSize?: Maybe<Scalars["Int"]>;
  q?: Maybe<Scalars["String"]>;
};

export type QueryPhrasesCountArgs = {
  q?: Maybe<Scalars["String"]>;
};

export type QueryPoemsCountArgs = {
  q?: Maybe<Scalars["String"]>;
  tagId?: Maybe<Scalars["ID"]>;
};

export type QueryAuthorsCountArgs = {
  q?: Maybe<Scalars["String"]>;
};

export type QueryPoemArgs = {
  uuid?: Maybe<Scalars["ID"]>;
  id?: Maybe<Scalars["ID"]>;
};

export type QueryTagArgs = {
  id: Scalars["ID"];
};

export type Tag = {
  __typename?: "Tag";
  id: Scalars["ID"];
  name: Scalars["String"];
  kind: Scalars["Int"];
  poems: Array<Poem>;
};

export type TagPoemsArgs = {
  page?: Maybe<Scalars["Int"]>;
  pageSize?: Maybe<Scalars["Int"]>;
};

export type TimeBetween = {
  /** [DateTime, DateTime] 表示起止时间 */
  between: Array<Scalars["DateTime"]>;
};

export type Todo = {
  __typename?: "Todo";
  id: Scalars["ID"];
  name: Scalars["String"];
  createTime: Scalars["DateTime"];
  user: User;
  status: TodoStatus;
};

export type TodoCreate = {
  name: Scalars["ConstraintString"];
};

export enum TodoStatus {
  DONE = "DONE",
  UNDO = "UNDO"
}

export type TodoUpdate = {
  id: Scalars["ID"];
  name?: Maybe<Scalars["ConstraintString"]>;
  status?: Maybe<TodoStatus>;
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  name: Scalars["String"];
  email: Scalars["String"];
  createTime: Scalars["DateTime"];
  todos?: Maybe<Array<Todo>>;
  starPoems?: Maybe<Array<Poem>>;
  starPoemsWithDate?: Maybe<Array<UserPoem>>;
  recitePoems?: Maybe<Array<Poem>>;
  recitePoemsWithDate?: Maybe<Array<UserPoem>>;
};

/** 用户与诗词的喜欢与背诵数据 */
export type UserPoem = {
  __typename?: "UserPoem";
  updateTime: Scalars["DateTime"];
  user: User;
  poem: Poem;
};
export type PoemsQueryVariables = {
  page?: Maybe<Scalars["Int"]>;
  q?: Maybe<Scalars["String"]>;
  tagId?: Maybe<Scalars["ID"]>;
};

export type PoemsQuery = { __typename?: "Query" } & Pick<
  Query,
  "poemsCount"
> & {
    poems: Array<
      { __typename?: "Poem" } & Pick<
        Poem,
        "id" | "uuid" | "title" | "paragraphs" | "kind"
      > & {
          tags: Maybe<Array<{ __typename?: "Tag" } & Pick<Tag, "id" | "name">>>;
          author: Maybe<
            { __typename?: "Author" } & Pick<
              Author,
              "id" | "uuid" | "name" | "dynasty"
            >
          >;
        }
    >;
  };

export type PoemsUserStarQueryVariables = {
  page?: Maybe<Scalars["Int"]>;
  q?: Maybe<Scalars["String"]>;
  tagId?: Maybe<Scalars["ID"]>;
};

export type PoemsUserStarQuery = { __typename?: "Query" } & {
  poems: Array<
    { __typename?: "Poem" } & Pick<Poem, "id" | "userIsStar" | "userIsRecite">
  >;
};

export type PoemUserStarQueryVariables = {
  uuid: Scalars["ID"];
};

export type PoemUserStarQuery = { __typename?: "Query" } & {
  poem: Maybe<
    { __typename?: "Poem" } & Pick<Poem, "id" | "userIsStar" | "userIsRecite">
  >;
};

export type RecitePoemMutationVariables = {
  poemId: Scalars["ID"];
  recite?: Maybe<Scalars["Boolean"]>;
};

export type RecitePoemMutation = { __typename?: "Mutation" } & {
  recitePoem: { __typename?: "Poem" } & Pick<Poem, "id" | "userIsRecite">;
};

export type StarPoemMutationVariables = {
  poemId: Scalars["ID"];
  star?: Maybe<Scalars["Boolean"]>;
};

export type StarPoemMutation = { __typename?: "Mutation" } & {
  starPoem: { __typename?: "Poem" } & Pick<Poem, "id" | "userIsStar">;
};

export type PoemQueryVariables = {
  uuid: Scalars["ID"];
};

export type PoemQuery = { __typename?: "Query" } & {
  poem: Maybe<
    { __typename?: "Poem" } & Pick<
      Poem,
      | "id"
      | "uuid"
      | "title"
      | "intro"
      | "paragraphs"
      | "appreciation"
      | "translation"
      | "kind"
      | "annotations"
    > & {
        phrases: Maybe<
          Array<{ __typename?: "Phrase" } & Pick<Phrase, "id" | "phrase">>
        >;
        tags: Maybe<
          Array<
            { __typename?: "Tag" } & Pick<Tag, "id" | "name"> & {
                poems: Array<
                  { __typename?: "Poem" } & Pick<
                    Poem,
                    "id" | "uuid" | "title" | "paragraphs"
                  > & {
                      author: Maybe<
                        { __typename?: "Author" } & Pick<
                          Author,
                          "id" | "dynasty" | "uuid" | "name"
                        >
                      >;
                    }
                >;
              }
          >
        >;
        author: Maybe<
          { __typename?: "Author" } & Pick<
            Author,
            | "id"
            | "uuid"
            | "name"
            | "dynasty"
            | "birthYear"
            | "deathYear"
            | "intro"
          > & {
              poems: Array<
                { __typename?: "Poem" } & Pick<
                  Poem,
                  "id" | "uuid" | "title" | "paragraphs"
                >
              >;
            }
        >;
      }
  >;
  poems: Array<
    { __typename?: "Poem" } & Pick<Poem, "id" | "uuid" | "title" | "paragraphs">
  >;
};

export type RegisterMutationVariables = {
  email: Scalars["String"];
  name: Scalars["String"];
  password: Scalars["String"];
  token: Scalars["String"];
  verifyCode: Scalars["String"];
};

export type RegisterMutation = { __typename?: "Mutation" } & {
  createUser: { __typename?: "User" } & Pick<User, "id">;
};

export type LoginMutationVariables = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type LoginMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "createUserToken"
>;

export type SendVerifyCodeMutationVariables = {
  email: Scalars["String"];
};

export type SendVerifyCodeMutation = { __typename?: "Mutation" } & {
  token: Mutation["sendEmailVerifyCode"];
};

export type PhrasesQueryVariables = {
  page?: Maybe<Scalars["Int"]>;
  pageSize?: Maybe<Scalars["Int"]>;
};

export type PhrasesQuery = { __typename?: "Query" } & Pick<
  Query,
  "phrasesCount"
> & {
    phrases: Array<
      { __typename?: "Phrase" } & Pick<
        Phrase,
        "id" | "phrase" | "authorName"
      > & {
          poem: { __typename?: "Poem" } & Pick<Poem, "uuid" | "title"> & {
              author: Maybe<
                { __typename?: "Author" } & Pick<
                  Author,
                  "uuid" | "name" | "dynasty"
                >
              >;
            };
        }
    >;
  };

export type StarPoemsQueryVariables = {
  userId: Scalars["ID"];
};

export type StarPoemsQuery = { __typename?: "Query" } & {
  user: Maybe<
    { __typename?: "User" } & Pick<User, "id" | "name"> & {
        starPoemsWithDate: Maybe<
          Array<
            { __typename?: "UserPoem" } & Pick<UserPoem, "updateTime"> & {
                poem: { __typename?: "Poem" } & Pick<
                  Poem,
                  | "id"
                  | "uuid"
                  | "title"
                  | "kind"
                  | "paragraphs"
                  | "userIsRecite"
                  | "userIsStar"
                > & {
                    author: Maybe<
                      { __typename?: "Author" } & Pick<
                        Author,
                        "id" | "uuid" | "name" | "dynasty"
                      >
                    >;
                  };
              }
          >
        >;
      }
  >;
};

export type RecitePoemsQueryVariables = {
  userId: Scalars["ID"];
};

export type RecitePoemsQuery = { __typename?: "Query" } & {
  user: Maybe<
    { __typename?: "User" } & Pick<User, "id" | "name"> & {
        recitePoemsWithDate: Maybe<
          Array<
            { __typename?: "UserPoem" } & Pick<UserPoem, "updateTime"> & {
                poem: { __typename?: "Poem" } & Pick<
                  Poem,
                  | "id"
                  | "uuid"
                  | "title"
                  | "kind"
                  | "paragraphs"
                  | "userIsRecite"
                  | "userIsStar"
                > & {
                    author: Maybe<
                      { __typename?: "Author" } & Pick<
                        Author,
                        "id" | "uuid" | "name" | "dynasty"
                      >
                    >;
                  };
              }
          >
        >;
      }
  >;
};

export type MeQueryVariables = {};

export type MeQuery = { __typename?: "Query" } & {
  me: Maybe<{ __typename?: "User" } & Pick<User, "id" | "name">>;
};

export type TagsQueryVariables = {};

export type TagsQuery = { __typename?: "Query" } & {
  tags: Maybe<
    Array<{ __typename?: "Tag" } & Pick<Tag, "id" | "name" | "kind">>
  >;
};

export type AuthorsQueryVariables = {
  page?: Maybe<Scalars["Int"]>;
  q?: Maybe<Scalars["String"]>;
};

export type AuthorsQuery = { __typename?: "Query" } & Pick<
  Query,
  "authorsCount"
> & {
    authors: Array<
      { __typename?: "Author" } & Pick<
        Author,
        "id" | "uuid" | "name" | "intro" | "dynasty" | "birthYear" | "deathYear"
      >
    >;
  };

export type AuthorQueryVariables = {
  uuid: Scalars["ID"];
};

export type AuthorQuery = { __typename?: "Query" } & {
  author: Maybe<
    { __typename?: "Author" } & Pick<
      Author,
      "id" | "uuid" | "name" | "intro" | "birthYear" | "deathYear" | "dynasty"
    >
  >;
};

export type AuthorPoemsQueryVariables = {
  uuid: Scalars["ID"];
  page?: Maybe<Scalars["Int"]>;
};

export type AuthorPoemsQuery = { __typename?: "Query" } & {
  author: Maybe<
    { __typename?: "Author" } & Pick<Author, "id" | "poemsCount"> & {
        poems: Array<
          { __typename?: "Poem" } & Pick<
            Poem,
            | "id"
            | "uuid"
            | "title"
            | "kind"
            | "userIsRecite"
            | "userIsStar"
            | "paragraphs"
          > & {
              tags: Maybe<
                Array<{ __typename?: "Tag" } & Pick<Tag, "id" | "name">>
              >;
            }
        >;
      }
  >;
};
