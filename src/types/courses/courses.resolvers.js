const getCourses = async (_, { input }, { dataSources }) => {
  const data = await dataSources.xpeerBackendAPI.getCourses(input)
  console.log(data);
  return data
}

module.exports = {
  Query: {
    getCourses,
  },
}
