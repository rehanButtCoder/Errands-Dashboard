import axios from "axios"

const instance = axios.create({
  baseURL: "http://52.57.66.243:81",
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("errand_user"))?.token.token}
    `,
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
})

export default instance
