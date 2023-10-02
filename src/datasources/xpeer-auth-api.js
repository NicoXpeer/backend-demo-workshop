const { RESTDataSource } = require('@apollo/datasource-rest')
const FormData = require('form-data')

class XpeerAuthAPI extends RESTDataSource {
  baseURL = 'https://dev.xpeer.app/authorization-server/'

  async token(params) {
    try {
      console.log('Soy la llamada a la apio!!')

      let form_data = new FormData()
      for (var key in params) {
        form_data.append(key, params[key])
      }

      const data = await this.post('oauth/token', {
        body: form_data,
      })

      return data
    } catch (error) {
      console.log(error)
      return {
        response: false,
        message: error.extensions.response.body.message,
      }
    }
  }
}

module.exports = XpeerAuthAPI
