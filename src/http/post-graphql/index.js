let arc = require('@architect/functions')
let {ApolloServer, gql} = require('apollo-server-lambda')
const { typeDefs } = require('./schema')
const { resolvers } = require('./resolver')

let server = new ApolloServer({cors: false, typeDefs, resolvers})
let handler = server.createHandler()

exports.handler = function(event, context, callback) {
  let body = arc.http.helpers.bodyParser(event)
  console.log(body)
  // Support for AWS HTTP API syntax
  event.httpMethod = event.httpMethod
    ? event.httpMethod
    : event.requestContext.http.method
  // Body is now parsed, re-encode to JSON for Apollo
  event.body = JSON.stringify(body)
  handler(event, context, callback)
}
