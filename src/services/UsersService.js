import axios from "../shared/AxiosConfig"

export default class UsersService {
  get = async (search) => {
    try {
      const response = await axios.get(`/api/Account/GetAllUsers?name=${search}`)
      return response
    } catch (error) {
      return error.response
    }
  }

  getById = async (id) => {
    try {
      const response = await axios.get("/api/Account/GetUserDetailById/" + id)
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
      const response = await axios.put(`/api/Account/UpdateUser`, data)
      return response
    } catch (error) {
      return error.response
    }
  }
}
