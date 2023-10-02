const { loadFilesSync } = require('@graphql-tools/load-files')
const path = require('path')

// Load TypesDef and resolvers
const schemaTypes = loadFilesSync(path.join(process.cwd(), 'src/**/**/*'), {
  extensions: ['gql'],
})
const resolvers = loadFilesSync(
  path.join(process.cwd(), 'src/types/**/*.resolvers.*'),
  {
    extensions: ['js'],
  }
)

module.exports = {
  schemaTypes,
  resolvers,
}
