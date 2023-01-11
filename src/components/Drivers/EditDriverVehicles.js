import React from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import Swal from "sweetalert2"

import { useEffect, useState } from "react"
import DriverVehiclesService from "../../services/DriverVehiclesService"
import ViewHeaderEdit from "../Common/ViewHeaderEdit"

import Loader from "../../shared/Loader"
import { VahicleTypeConstants } from "../../shared/VehicleConstants"
import useDisplayImage from "../../hooks/useDisplayImage"
function EditDriverVehicle() {
  const vehicleService = new DriverVehiclesService()
  const [driverCount, setDriverCount] = useState(0)
  const [data, setData] = useState({})
  const [loader, setLoader] = useState(true)
  const [btnLock, setBtnLock] = useState(false)
  const [uploadImageFirst, setUploadImageFirst] = useState(null)
  const history = useHistory()

  useEffect(() => {
    if (driverCount === 0) {
      getVehicles()
      setDriverCount(1)
    }
  }, [data]) // eslint-disable-line react-hooks/exhaustive-deps
  const { vehicleId, userId } = useParams()
  const { result, uploader, setResult } = useDisplayImage()

  const getVehicles = async () => {
    try {
      const response = await vehicleService.getVehiclesById(vehicleId)
      if (response.data.code === 1) {
        debugger
        setData(response.data.data)
        setResult(response.data.data.picture)
        setLoader(false)
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something Went Wrong",
        showConfirmButton: true,
        timer: 5000,
      })
    }
  }
  const [emptyValidation, setEmptyValidation] = useState({
    registerationNumberEmpty: false,
    modelEmpty: false,
    markEmpty: false,
    colorEmpty: false,
    yearEmpty: false,
  })
  const handleSubmit = async (e) => {
    e.preventDefault()
    let validCount = 0
    const c = { ...emptyValidation }

    if (data.registerationNumber === "") {
      c.registerationNumberEmpty = true
      validCount++
    } else {
      c.registerationNumberEmpty = false
    }

    if (data.model === "") {
      c.modelEmpty = true
      validCount++
    } else {
      c.modelEmpty = false
    }

    if (data.year === "") {
      c.yearEmpty = true
      validCount++
    } else {
      c.yearEmpty = false
    }

    if (data.color === "") {
      c.colorEmpty = true
      validCount++
    } else {
      c.colorEmpty = false
    }

    if (data.mark === "") {
      c.markEmpty = true
      validCount++
    } else {
      c.markEmpty = false
    }

    setEmptyValidation(c)

    if (validCount > 0) {
      return
    }
    debugger
    setBtnLock(true)
    if (uploadImageFirst !== null) {
      const formData = new FormData()
      formData.append("", uploadImageFirst)
      const imageResponse1 = await vehicleService.uploadImage(formData)
      data.picture = imageResponse1.data.data.url
    }
    try {
      const response = await vehicleService.update(data)
      if (response.data.code === 1) {
        history.push(`/Driver/Edit/${userId}`)
        setBtnLock(false)

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Vehicle has been updated",
          showConfirmButton: true,
          timer: 5000,
        })
      }

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
        <ViewHeaderEdit name="Driver" link={`/Driver/Edit/${userId}`} />
        <form id="form" onSubmit={handleSubmit}>
          <div className="card">
            {loader ? (
              Loader
            ) : (
              <div className="card-body">
                <h4 className="section_head_line">Vehicle Information</h4>
                <div className="file-upload position-relative file_padding">
                  <div className="imagecontainer" style={{ paddingBottom: "15px" }}>
                    <div className="card">
                      <div className="uploadedimages doc_card_section">
                        <img className="uploadDocument" src={result ? result : "./img/icon_upload_complate.svg"} alt="uploaded_image" />
                      </div>
                    </div>
                  </div>
                  <label for="uploader" className="btn btn-primary btn_upload doc_btnUpload">
                    Upload Picture
                  </label>
                  <p className="picture_para">Photo should not exceed size of 5 MB.</p>
                  <input
                    id="uploader"
                    name="uploader"
                    hidden
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    onChange={(e) => {
                      setUploadImageFirst(e.target.files[0])
                      uploader(e)
                    }}
                  />
                </div>

                <div className="formwithimageupload__column_R">
                  <div className="row">
                    <div className="form-group col-md-4 select_forms">
                      <label>Driver type</label>
                      <select
                        className="form-control"
                        onChange={(e) => {
                          debugger
                          const x = { ...data }
                          x.vehicleTypeId = e.target.value
                          setData(x)
                        }}
                      >
                        <option selected={data.vehicleTypeId === VahicleTypeConstants.Bike ? true : false} value={VahicleTypeConstants.Bike}>
                          Bike
                        </option>
                        <option selected={data.vehicleTypeId === VahicleTypeConstants.Truck ? true : false} value={VahicleTypeConstants.Truck}>
                          Truck
                        </option>
                        <option
                          selected={data.vehicleTypeId === VahicleTypeConstants.SpecialTruck ? true : false}
                          value={VahicleTypeConstants.SpecialTruck}
                        >
                          Special Truck
                        </option>
                      </select>
                    </div>

                    <div className="form-group col-md-4 select_forms">
                      <label>Model</label>
                      <input
                        className="form-control"
                        type="text"
                        id=""
                        name="number"
                        placeholder="Model"
                        value={data.model}
                        onChange={(e) => {
                          const x = { ...data }
                          x.model = e.target.value
                          setData(x)
                        }}
                      />
                      {emptyValidation.modelEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Model is required </p> : ""}
                    </div>
                    <div className="form-group col-md-4 select_forms">
                      <label>Year</label>
                      <input
                        className="form-control"
                        type="number"
                        id=""
                        name="number"
                        placeholder="Year"
                        value={data.year}
                        onChange={(e) => {
                          const x = { ...data }
                          x.year = e.target.value
                          setData(x)
                        }}
                      />
                      {emptyValidation.yearEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Year is required </p> : ""}
                    </div>

                    <div className="form-group col-md-4 select_forms">
                      <label>Color</label>
                      <input
                        className="form-control"
                        type="text"
                        id=""
                        name="email"
                        placeholder="Color"
                        value={data.color}
                        onChange={(e) => {
                          const x = { ...data }
                          x.color = e.target.value
                          setData(x)
                        }}
                      />
                      {emptyValidation.colorEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Color is required </p> : ""}
                    </div>
                    <div className="form-group col-md-4 select_forms">
                      <label>Vehicle Number</label>
                      <input
                        className="form-control"
                        type="text"
                        id=""
                        name="email"
                        placeholder="Color"
                        value={data.registerationNumber}
                        onChange={(e) => {
                          const x = { ...data }
                          x.registerationNumber = e.target.value
                          setData(x)
                        }}
                      />
                      {emptyValidation.registerationNumber ? <p style={{ marginTop: "5px", color: "red" }}>Vehicle number is required </p> : ""}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="btnscontainer pdTop" style={{ paddingBottom: "50px" }}>
            <button type="submit" disabled={btnLock} className="btn btn-primary">
              Update
              {btnLock ? <div className="btnloader">{Loader}</div> : ""}
            </button>
            <Link to={`/Driver/Edit/${userId}`} className="btn_primary_outline cancelbtn">
              Cancel
            </Link>
          </div>
        </form>
      </main>
    </div>
  )
}

export default EditDriverVehicle
