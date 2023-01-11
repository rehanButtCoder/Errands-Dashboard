import React, { useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import "react-datepicker/dist/react-datepicker.css"

import Swal from "sweetalert2"

import useDisplayImage from "../../../hooks/useDisplayImage"
import ConfigurationsService from "../../../services/ConfigurationsService"

function AddVehicleConfig() {
  const configurationService = new ConfigurationsService()
  const history = useHistory()
  const { VehicleName } = useParams()
  const [loader, setLoader] = useState(true)
  const [uploadImageFirst, setUploadImageFirst] = useState(null)
  const { result, uploader, setResult } = useDisplayImage()
  const [data, setData] = useState({
    title: "",
    capacity: "",
    vehicleCategory: VehicleName,
    basePrice: "",
    imagePath: "",
  })

  const [btnLock, setBtnLock] = useState(false)
  const [emptyValidation, setEmptyValidation] = useState({
    titleEmpty: false,
    capacityEmpty: false,
    basePriceEmpty: false,
  })

  //Functions
  const handleSubmit = async (e) => {
    e.preventDefault()
    let validCount = 0
    const c = { ...emptyValidation }
    debugger
    if (data.title === "") {
      c.titleEmpty = true
      validCount++
    } else {
      c.titleEmpty = false
    }

    if (data.capacity === "") {
      c.capacityEmpty = true
      validCount++
    } else {
      c.capacityEmpty = false
    }

    if (data.basePrice === "") {
      c.basePriceEmpty = true
      validCount++
    } else {
      c.basePriceEmpty = false
    }

    setEmptyValidation(c)

    if (validCount > 0) {
      return
    }
    setBtnLock(true)

    const formData1 = new FormData()
    formData1.append("", uploadImageFirst)
    const imageResponse1 = await configurationService.uploadImage(formData1)
    data.imagePath = imageResponse1.data.data.url
    try {
      const response = await configurationService.save(data)
      if (response.data.code === 1) {
        history.push("/VehicleConfig")
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
    <div>
      <main>
        <div className="container-fluid">
          <form id="form" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12">
                <div className="topheader">
                  <Link className="btnscontainer__btn" to="/VehicleConfig">
                    <h2 className="topheader__title">
                      <img src="./img/icon_back.svg" alt="" />
                      Add Vehicle
                    </h2>
                  </Link>
                </div>
              </div>
            </div>
            <div className="row mb-12">
              <div className="col-lg-12 col-md-12 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="formwithimageupload">
                      <div className="formwithimageupload__column_L">
                        <div className="imgupload">
                          <img id="output" src={result ? result : "./img/icon_upload_complate.svg"} alt="" />
                          <input
                            hidden
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            name="file"
                            id="file"
                            onChange={(e) => {
                              setUploadImageFirst(e.target.files[0])
                              uploader(e)
                            }}
                          />
                          <label
                            for="file"
                            style={{ cursor: "pointer", marginBottom: "10px", marginLeft: "0px" }}
                            className="btn btn-primary btn_upload"
                          >
                            Upload Picture
                          </label>
                          <p className="picture_para" style={{ paddingLeft: "6px" }}>
                            Photo should not exceed size of 5 MB.
                          </p>
                        </div>
                      </div>
                      <div className="formwithimageupload__column_R">
                        <div className="row">
                          <div className="form-group col-md-5 select_forms">
                            <label>Make</label>
                            <input
                              className="form-control"
                              type="text"
                              id="fname"
                              name="full name"
                              placeholder="Name"
                              value={data.title}
                              onChange={(e) => {
                                const x = { ...data }
                                x.title = e.target.value
                                setData(x)
                              }}
                            />
                            {emptyValidation.titleEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Make is required </p> : ""}
                          </div>
                          <div className="form-group col-md-5 select_forms">
                            <label>Capacity</label>
                            <input
                              className="form-control"
                              type="number"
                              id=""
                              name="number"
                              placeholder="Capacity"
                              onChange={(e) => {
                                const x = { ...data }
                                x.capacity = e.target.value
                                setData(x)
                              }}
                            />
                            {emptyValidation.capacityEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Capacity is required </p> : ""}
                          </div>

                          <div className="form-group col-md-5 select_forms">
                            <label>Base price</label>
                            <input
                              className="form-control"
                              type="number"
                              id=""
                              name="email"
                              placeholder="Enter"
                              onChange={(e) => {
                                const x = { ...data }
                                x.basePrice = e.target.value
                                setData(x)
                              }}
                            />
                            {emptyValidation.basePriceEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Base price is required </p> : ""}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="btnscontainer" style={{ paddingTop: "70px" }}>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>

                  <Link className="btnscontainer__btn" to="/VehicleConfig">
                    <button type="button" className="btn_primary_outline cancelbtn">
                      Cancel
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default AddVehicleConfig
