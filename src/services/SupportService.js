import axios from "../shared/AxiosConfig"

export default class SupportService {
  get = async () => {
    try {
      const response = await axios.get(`/api/Queries/GetSupportQueries`)
      return response
    } catch (error) {
      return error.response
    }
  }
  getById = async (supportQueryId) => {
    try {
      const response = await axios.get(`/api/Queries/GetSupportQueryById/${supportQueryId}`)
      return response
    } catch (error) {
      return error.response
    }
  }
  resolveQuery = async (supportQueryId) => {
    try {
      const response = await axios.patch(`/api/Queries/ResolveSupportQuery/${supportQueryId}`)
      return response
    } catch (error) {
      return error.response
    }
  }
}
