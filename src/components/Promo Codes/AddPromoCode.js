import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import "react-datepicker/dist/react-datepicker.css"
import DatePicker from "react-datepicker"
import Loader from "../../shared/Loader"
import Swal from "sweetalert2"
import PromoCodesService from "../../services/PromoCodesService"
import moment from "moment"

function AddPromoCode() {
  //State
  const promoCodeService = new PromoCodesService()
  const history = useHistory()

  const [loader, setLoader] = useState(true)
  const [promoCode, setPromoCode] = useState({
    code: "",
    discountPercentage: "",
    maxDiscount: "",
    expiryDate: new Date(),
    createdBy: JSON.parse(localStorage.getItem("errand_user")).user.id,
  })

  const [btnLock, setBtnLock] = useState(false)
  const [emptyValidation, setEmptyValidation] = useState({
    codeEmpty: false,
    discountPercentageEmpty: false,
    maxDiscountEmpty: false,
    expiryDateEmpty: false,
  })
  // SERVICES

  //Functions
  const handleSubmit = async (e) => {
    e.preventDefault()
    let validCount = 0
    const c = { ...emptyValidation }

    if (promoCode.code === "") {
      c.codeEmpty = true
      validCount++
    } else {
      c.codeEmpty = false
    }

    if (promoCode.discountPercentage === "") {
      c.discountPercentageEmpty = true
      validCount++
    } else {
      c.discountPercentageEmpty = false
    }
    if (promoCode.maxDiscount === "") {
      c.maxDiscountEmpty = true
      validCount++
    } else {
      c.maxDiscountEmpty = false
    }

    if (promoCode.expiryDate === "") {
      c.expiryDateEmpty = true
      validCount++
    } else {
      c.expiryDateEmpty = false
    }

    setEmptyValidation(c)

    if (validCount > 0) {
      return
    }
    setBtnLock(true)
    try {
      debugger
      const response = await promoCodeService.save(promoCode)
      if (response.data.code === 1) {
        history.push("/PromoCodes")
        setBtnLock(false)
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Promo code has been saved",
          showConfirmButton: true,
          timer: 5000,
        })
      }
      setLoader(false)

      if (response.data.code === 0) {
        setBtnLock(false)
        Swal.fire({
          position: "center",
          icon: "error",
          title: response.data.data.message,
          showConfirmButton: true,
          timer: 5000,
        })
      }
    } catch (error) {
      setBtnLock(false)

      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something Went Wrong!",
        showConfirmButton: true,
        timer: 5000,
      })
    }
  }

  return (
    <main>
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="topheader">
              <Link to="/PromoCodes">
                <h2 class="topheader__title">
                  <img src="./img/icon_back.svg" alt="back_icon" />
                  Add Promo Code
                </h2>
              </Link>
            </div>
          </div>
        </div>
        <form id="form" onSubmit={handleSubmit}>
          <div class="row mb-12">
            <div class="col-lg-12 col-md-12 mb-4">
              <div class="card">
                <div class="card_section_padding">
                  <div class="formwithimageupload">
                    <div class="formwidthcard">
                      <div class="row">
                        <div class="form-group col-md-4 select_forms">
                          <label>Promo code</label>
                          <input
                            class="form-control"
                            type="text"
                            id="fname"
                            name="firstName"
                            placeholder="Promo code"
                            value={promoCode.code}
                            onChange={(e) => {
                              const x = { ...promoCode }
                              x.code = e.target.value
                              setPromoCode(x)
                            }}
                          />
                          {emptyValidation.codeEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Code is required </p> : ""}
                        </div>
                        <div class="form-group col-md-4 select_forms">
                          <label>Add Discount</label>
                          <input
                            class="form-control"
                            type="text"
                            id="lname"
                            name="lastName"
                            placeholder="Add Discount"
                            value={promoCode.discountPercentage}
                            onChange={(e) => {
                              const x = { ...promoCode }
                              x.discountPercentage = e.target.value
                              setPromoCode(x)
                            }}
                          />
                          {emptyValidation.discountPercentageEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Percentage is required </p> : ""}
                        </div>
                        <div class="form-group col-md-4 select_forms">
                          <label>Max Discount</label>
                          <input
                            class="form-control"
                            type="number"
                            id="pnumber"
                            name="pnumber"
                            placeholder="Valid From"
                            value={promoCode.maxDiscount}
                            onChange={(e) => {
                              const x = { ...promoCode }
                              x.maxDiscount = e.target.value
                              setPromoCode(x)
                            }}
                          />
                          {emptyValidation.maxDiscountEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Max discount is required </p> : ""}
                        </div>
                        <div class="form-group col-md-4 select_forms">
                          <label>Valid Till</label>
                          <DatePicker
                            selected={promoCode.expiryDate}
                            minDate={moment().toDate()}
                            className="form-control"
                            onChange={(date) => {
                              const c = { ...promoCode }
                              c.expiryDate = date
                              setPromoCode(c)
                            }}
                          />
                          {emptyValidation.expiryDateEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Expiry date is required </p> : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="btnscontainer" style={{ paddingTop: "70px" }}>
                <button type="submit" disabled={btnLock} className="btn btn-primary">
                  Save
                  {btnLock ? <div class="btnloader">{Loader}</div> : ""}
                </button>
                <Link to="/Users" className="btn_primary_outline cancelbtn">
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}

export default AddPromoCode
