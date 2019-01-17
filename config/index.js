const isProduction = process.env.NODE_ENV === 'production'

export default {
  url: isProduction ? 'https://shici.xiange.tech/graphql' : 'http://localhost:5000/graphql'
}
