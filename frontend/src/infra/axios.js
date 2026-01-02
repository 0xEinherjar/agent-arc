import axios from 'axios'

export default class AxiosHttpClient {
  async request (data) {
    let axiosResponse;
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.data,
        headers: data.headers,
        params: data.params,
        withCredentials: data.credentials ?? false
      })
    } catch (error) {
      axiosResponse = error.response
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
