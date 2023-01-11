import axios from "../shared/AxiosConfig"

export default class PromoCodesService {
  get = async () => {
    try {
      const response = await axios.get(`/api/PromoCodes/GetAllPromoCodes`)
      return response
    } catch (error) {
      return error.response
    }
  }

  save = async (data) => {
    try {
      const response = await axios.post("/api/PromoCodes/SavePromoCode", data)
      return response
    } catch (error) {
      return error.response
    }
  }
  getReferals = async () => {
    try {
      const response = await axios.get("/api/Referrals/GetReferralList")
      return response
    } catch (error) {
      return error.response
    }
  }

  delete = async (id) => {
    try {
      const response = await axios.patch(`/api/PromoCodes/DeletePromoCode/${id}`)
      return response
    } catch (error) {
      return error.response
    }
  }
  getAccountsDetails = async () => {
    try {
      const response = await axios.get(`/api/Wallet/GetDriverAccounts`)
      return response
    } catch (error) {
      return error.response
    }
  }
  getTransactions = async () => {
    try {
      const response = await axios.get(`/api/Wallet/GetOrderTransactions`)
      return response
    } catch (error) {
      return error.response
    }
  }
}
