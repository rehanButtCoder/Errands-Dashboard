import axios from "../shared/AxiosConfig"

export default class ConfigurationsService {
  get = async () => {
    try {
      const response = await axios.get(`/api/Configurations/GetVehicleTypes`)
      return response
    } catch (error) {
      return error.response
    }
  }
  getById = async (vehicleTypeId) => {
    try {
      const response = await axios.get(`/api/Configurations/GetVehicleTypeById/${vehicleTypeId}`)
      return response
    } catch (error) {
      return error.response
    }
  }
  update = async (data) => {
    try {
      const response = await axios.patch(`/api/Configurations/UpdateVehicleType`, data)
      return response
    } catch (error) {
      return error.response
    }
  }

  save = async (data) => {
    try {
      const response = await axios.post("/api/Configurations/SaveVehicleType", data)
      return response
    } catch (error) {
      return error.response
    }
  }
  delete = async (id) => {
    try {
      const response = await axios.patch(`/api/Configurations/DeleteVehicleTypes/${id}`)
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
