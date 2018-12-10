const isProduction = process.env.NODE_ENV === 'production'

export default {
  url: isProduction ? 'https://oneday.xiange.tech/graphql' : 'http://localhost:5000/graphql'
}
