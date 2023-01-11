import axios from "../shared/AxiosConfig"

export default class DriverVehiclesService {
  getDriverVehicles = async (driverId) => {
    try {
      const response = await axios.get(`/api/Vehicles/GetVehiclesByUserId/${driverId}`)
      return response
    } catch (error) {
      return error.response
    }
  }
  getVehiclesById = async (vehicleId) => {
    try {
      const response = await axios.get(`/api/Vehicles/GetVehicle/${vehicleId}`)
      return response
    } catch (error) {
      return error.response
    }
  }
  update = async (data) => {
    try {
      const response = await axios.put(`/api/Vehicles/UpdateVehicleDetails`, data)
      return response
    } catch (error) {
      return error.response
    }
  }
  uploadImage = async (data) => {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
    try {
      const response = await axios.post("/api/Vehicles/UploadVehicleImage", data, config)
      return response
    } catch (error) {
      return error.response
    }
  }
}
