const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const datasources = require('./datasources')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { schemaTypes, resolvers } = require('./utils/schema.js')

const rootSchema = `
schema {
  query: Query
}
`

let schema = makeExecutableSchema({
  typeDefs: [rootSchema, schemaTypes],
  resolvers: resolvers,
})

const start = async () => {
  const server = new ApolloServer({
    schema,
  })

  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
      const { cache } = server
      let token = req.headers.authorization

      return {
        dataSources: {
          xpeerBackendAPI: new datasources.XpeerBackendAPI({ cache, token }),
          xpeerAuthAPI: new datasources.XpeerAuthAPI({ cache }),
        },
      }
    },
  })

  console.log(`🚀 Server ready at: ${url}`)
}

module.exports = start
