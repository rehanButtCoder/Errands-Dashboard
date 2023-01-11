import axios from "../shared/AxiosConfig"

export default class DriverService {
  get = async () => {
    try {
      const response = await axios.get(`/api/Account/GetAllDrivers`)
      return response
    } catch (error) {
      return error.response
    }
  }

  getById = async (id) => {
    try {
      const response = await axios.get("/api/Account/GetDriverById/" + id)
      return response
    } catch (error) {
      return error.response
    }
  }

  save = async (data) => {
    try {
      const response = await axios.post("/api/Admin/User/SaveUser", data)
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
      const response = await axios.post("/api/Account/UploadProfilePicture", data, config)
      return response
    } catch (error) {
      return error.response
    }
  }

  delete = async (userId) => {
    try {
      const response = await axios.patch(`/api/Account/DeleteUser/?id=${userId}`)
      return response
    } catch (error) {
      return error.response
    }
  }

  update = async (data) => {
    try {
      const response = await axios.put(`/api/Account/UpdateDriver`, data)
      return response
    } catch (error) {
      return error.response
    }
  }
  Approve = async (driverId) => {
    try {
      const response = await axios.patch(`/api/Account/ApproveDriver?driverId=${driverId}`)
      return response
    } catch (error) {
      return error.response
    }
  }
  uploadDocuments = async (data) => {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
    try {
      const response = await axios.post("/api/Account/UploadDriverDocuments", data, config)
      return response
    } catch (error) {
      return error.response
    }
  }
  getByDriverId = async (driverId) => {
    try {
      const response = await axios.get(`/api/Account/GetDriverDocuments/${driverId}`)
      return response
    } catch (error) {
      return error.response
    }
  }
  updateImagesData = async (data) => {
    try {
      const response = await axios.put(`/api/Account/UpdateDriverDocuments`, data)
      return response
    } catch (error) {
      return error.response
    }
  }
}
