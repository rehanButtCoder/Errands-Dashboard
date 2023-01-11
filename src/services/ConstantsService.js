import axios from "../shared/AxiosConfig"

export default class ConstanstService {
  getConstants = async () => {
    try {
      const response = await axios.get(`/api/Configurations/GetSystemConstants`)
      return response
    } catch (error) {
      return error.response
    }
  }
  getConstantById = async (vehicleId) => {
    try {
      const response = await axios.get(`/api/Vehicles/GetVehicle/${vehicleId}`)
      return response
    } catch (error) {
      return error.response
    }
  }
  update = async (data) => {
    try {
      const response = await axios.patch(`/api/Configurations/UpdateConstant`, data)
      return response
    } catch (error) {
      return error.response
    }
  }
}
