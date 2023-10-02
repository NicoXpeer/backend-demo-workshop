const { RESTDataSource } = require('@apollo/datasource-rest')

class XpeerBackendAPI extends RESTDataSource {
  baseURL = 'https://dev.xpeer.app/xpeer-backend-ms/api/'

  constructor(options) {
    // console.log('Options datasource:', options);
    super(options) // this sends our server's `cache` through

    // if (options.token) {
    this.token = options.token
    // console.log(this.token);
    // }
  }

  willSendRequest(_path, request) {
    request.headers['authorization'] = this.token
  }

  async signup(params) {
    try {
      const data = await this.post('users/register', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })
      return { success: data }
    } catch (error) {
      return {
        success: false,
        message: error.extensions.response.body.message,
      }
    }
  }

  async signin(params) {
    try {
      const { data } = await this.get('users/identity', {
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(params),
      })
      console.log(data)
      return { success: true, user: data }
    } catch (error) {
      return {
        success: false,
        message: error.extensions.response.body.error_description,
      }
    }
  }

  async getCourses(params) {
    try {
      const { courses } = await this.get(
        'courses/today-trending?maxElements=10',
        {
          headers: {
            'Content-Type': 'application/json',
          },
          data: JSON.stringify(params),
        }
      )

      return {
        success: true,
        courses: [
          ...courses.PROFESSIONAL_SKILL,
          ...courses.SCIENCE,
          ...courses.SOFT_SKILL,
          ...courses.TECHNOLOGY,
        ],
      }
    } catch (error) {
      return {
        success: false,
        message: error.extensions.response.body.error_description,
      }
    }
  }
}

module.exports = XpeerBackendAPI
