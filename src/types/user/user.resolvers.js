const token = async (_, { input }, { dataSources }) => {
  console.log('Soy resolver!', _)
  const data = dataSources.xpeerAuthAPI.token(input)
  console.log('He acabadao, soy el resolver!')
  return data
}

const signup = async (_, { input }, { dataSources }) => {
  return dataSources.xpeerBackendAPI.signup(input)
}

const signin = async (_, { input }, { dataSources }) => {
  console.log('Entro')
  return dataSources.xpeerBackendAPI.signin(input)
}

module.exports = {
  Query: {
    token,
    signin,
  },
  Mutation: {
    signup,
  },
}
