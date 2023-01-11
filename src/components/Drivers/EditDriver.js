import ViewHeaderEdit from "../Common/ViewHeaderEdit"
import React, { useEffect, useState } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import Swal from "sweetalert2"
import "react-datepicker/dist/react-datepicker.css"
import DriverService from "../../services/DriverService"
import Loader from "../../shared/Loader"
import useDisplayImage from "../../hooks/useDisplayImage"
import useDisplayImageSecond from "../../hooks/useDisplayImageSecond"
import useDisplayImageThird from "../../hooks/useDisplayImageThird"
import useDisplayImageForth from "../../hooks/useDisplayImageForth"
import { documentTypeId } from "../../shared/Constants"
import DataTable from "../Common/Datatable"
import { Vehiclescolumns, pdfHeaders, columnNames } from "../../tabledata/DriverVehiclesTable"
import DriverVehiclesService from "../../services/DriverVehiclesService"

function EditDriver() {
  //State
  const { driverId } = useParams()
  const history = useHistory()
  const [driverCount, setDriverCount] = useState(0)
  const [data, setData] = useState([])
  const [loader, setLoader] = useState(true)
  const [uploadImageSecond, setUploadImageSecond] = useState(null)
  const [uploadImageFirst, setUploadImageFirst] = useState(null)
  const [uploadImageThird, setUploadImageThird] = useState(null)
  const [uploadImageForth, setUploadImageForth] = useState(null)
  const { result, uploader, setResult } = useDisplayImage()
  const { resultSecond, uploaderSecond, setResultSecond } = useDisplayImageSecond()
  const { resultThird, uploaderThird, setResultThird } = useDisplayImageThird()
  const { resultForth, uploaderForth, setResultForth } = useDisplayImageForth()
  const [imagesData, setImagesData] = useState([
    {
      userId: driverId,
      documentTypeId: documentTypeId.driverlicense, //driverlicense
      filePath: "",
    },
    {
      userId: driverId,
      documentTypeId: documentTypeId.vehiclelicense, //driverlicense
      filePath: "",
    },
    {
      userId: driverId,
      documentTypeId: documentTypeId.insurance, //driverlicense
      filePath: "",
    },
    {
      userId: driverId,
      documentTypeId: documentTypeId.roadworthiness, //driverlicense
      filePath: "",
    },
    {
      userId: driverId,
      documentTypeId: documentTypeId.driverbadge, //driverlicense
      filePath: "",
    },
  ])

  const [drivers, setDrivers] = useState({
    id: "string",
    firstName: "string",
    lastName: "string",
    profilePicture: "string",
    phoneNumber: "string",
    email: "string",
    address: "string",
  })
  const [picture, setPicture] = useState(null)
  const [imgData, setImgData] = useState(null)
  const [btnLock, setBtnLock] = useState(false)
  const [emptyValidation, setEmptyValidation] = useState({
    firstNameEmpty: false,
    lastNameEmpty: false,
    phoneNumberEmpty: false,
    emailEmpty: false,
    addressEmpty: false,
  })
  // SERVICES
  const driverService = new DriverService()
  const vehiclesService = new DriverVehiclesService()

  //UseEffect
  useEffect(() => {
    if (driverCount === 0) {
      getDrivers()
      getImages()
      getVehicles()
      setDriverCount(1)
    }
  }, [drivers, imgData]) // eslint-disable-line react-hooks/exhaustive-deps

  //Functions
  const imagesPreview = (e) => {
    if (e.target.files[0]) {
      setPicture(e.target.files[0])
      const reader = new FileReader()
      reader.addEventListener("load", () => {
        setImgData(reader.result)
      })
      reader.readAsDataURL(e.target.files[0])
    }
  }
  const getVehicles = async () => {
    try {
      const response = await vehiclesService.getDriverVehicles(driverId)
      if (response.data.code === 1) {
        setData(response.data.data)
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    let validCount = 0
    const c = { ...emptyValidation }

    if (drivers.firstName === "") {
      c.firstNameEmpty = true
      validCount++
    } else {
      c.firstNameEmpty = false
    }

    if (drivers.lastName === "") {
      c.lastNameEmpty = true
      validCount++
    } else {
      c.lastNameEmpty = false
    }

    if (drivers.phoneNumber === "") {
      c.phoneNumberEmpty = true
      validCount++
    } else {
      c.phoneNumberEmpty = false
    }

    if (drivers.address === "") {
      c.addressEmpty = true
      validCount++
    } else {
      c.addressEmpty = false
    }

    if (drivers.email === "") {
      c.emailEmpty = true
      validCount++
    } else {
      c.emailEmpty = false
    }

    setEmptyValidation(c)

    if (validCount > 0) {
      return
    }
    setBtnLock(true)
    debugger
    if (!(picture === null)) {
      const formData = new FormData()
      formData.append("file", picture)
      const response = await driverService.uploadImage(formData)
      drivers.profilePicture = response.data.data.url
    }
    try {
      const editDriverResponse = await driverService.update(drivers)
      if (editDriverResponse.data.code === 1) {
        setBtnLock(false)
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Driver has been updated",
          showConfirmButton: true,
          timer: 5000,
        })
      }
      setLoader(false)

      if (editDriverResponse.data.code === 0) {
        setBtnLock(false)
        Swal.fire({
          position: "center",
          icon: "error",
          title: editDriverResponse.data.data.message,
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

  const getDrivers = async () => {
    try {
      const response = await driverService.getById(driverId)
      if (response.data.code === 1) {
        const copyDriver = { ...drivers }
        copyDriver.firstName = response.data.data.firstName
        copyDriver.lastName = response.data.data.lastName
        copyDriver.phoneNumber = response.data.data.phoneNumber
        copyDriver.address = response.data.data.address
        copyDriver.email = response.data.data.email
        copyDriver.id = response.data.data.id
        copyDriver.profilePicture = response.data.data.profilePicture
        setDrivers(copyDriver)
        setImgData(response.data.data.profilePicture)
        setLoader(false)
      }

      if (response.data.code === 0) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: response.data.data.message,
          showConfirmButton: true,
          timer: 5000,
        })
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something Went Wrong",
        showConfirmButton: true,
        timer: 5000,
      })
      history.push("/Users")
    }
  }
  const getImages = async () => {
    try {
      const response = await driverService.getByDriverId(driverId)
      if (response.data.code === 1) {
        setResult(response.data.data[0].filePath)
        setResultSecond(response.data.data[1].filePath)
        setResultThird(response.data.data[2].filePath)
        setResultForth(response.data.data[3].filePath)
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

  const imagesSubmit = async (e) => {
    e.preventDefault()

    setBtnLock(true)

    if (uploadImageFirst !== null) {
      const formData1 = new FormData()
      formData1.append("", uploadImageFirst)
      const imageResponse1 = await driverService.uploadDocuments(formData1)
      imagesData[0].filePath = imageResponse1.data.data.url
    }
    if (uploadImageSecond !== null) {
      const formData2 = new FormData()
      formData2.append("", uploadImageSecond)
      const imageResponse2 = await driverService.uploadDocuments(formData2)
      imagesData[1].filePath = imageResponse2.data.data.url
    }
    if (uploadImageThird !== null) {
      const formData3 = new FormData()
      formData3.append("", uploadImageThird)
      const imageResponse2 = await driverService.uploadDocuments(formData3)
      imagesData[2].filePath = imageResponse2.data.data.url
    }
    if (uploadImageForth !== null) {
      const formData4 = new FormData()
      formData4.append("", uploadImageForth)
      const imageResponse2 = await driverService.uploadDocuments(formData4)
      imagesData[3].filePath = imageResponse2.data.data.url
    }
    try {
      const updateImageResponse = await driverService.updateImagesData(imagesData)
      if (updateImageResponse.data.code === 1) {
        setBtnLock(false)

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Images Updated",
          showConfirmButton: true,
          timer: 5000,
        })
      }

      if (updateImageResponse.data.code === 0) {
        setBtnLock(false)
        Swal.fire({
          position: "center",
          icon: "error",
          title: updateImageResponse.data.data.message,
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
          <ViewHeaderEdit name="Driver" link="/Drivers" />
          <div className="row mb-12">
            <div className="col-lg-12 col-md-12 mb-4">
              <div className="card">
                {loader ? (
                  Loader
                ) : (
                  <form id="form" onSubmit={handleSubmit}>
                    <div className="card-body">
                      <h4 className="section_head_line">Personal Information</h4>
                      <div className="formwithimageupload">
                        <div className="formwithimageupload__column">
                          <div className="row">
                            <div className="form-group col-md-6 select_forms">
                              <label>First Name</label>
                              <input
                                className="form-control"
                                type="text"
                                id="fname"
                                name="firstName"
                                placeholder="First Name"
                                value={drivers.firstName}
                                onChange={(e) => {
                                  const x = { ...drivers }
                                  x.firstName = e.target.value
                                  setDrivers(x)
                                }}
                              />
                              {emptyValidation.firstNameEmpty ? <p style={{ marginTop: "5px", color: "red" }}>First Name is required </p> : ""}
                            </div>
                            <div className="form-group col-md-6 select_forms">
                              <label>Last Name</label>
                              <input
                                className="form-control"
                                type="text"
                                id="lname"
                                name="lastName"
                                placeholder="Last Name"
                                value={drivers.lastName}
                                onChange={(e) => {
                                  const x = { ...drivers }
                                  x.lastName = e.target.value
                                  setDrivers(x)
                                }}
                              />
                              {emptyValidation.lastNameEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Last Name is required </p> : ""}
                            </div>
                            <div className="form-group col-md-6 select_forms">
                              <label>Phone number</label>
                              <input
                                className="form-control"
                                type="number"
                                id="pnumber"
                                name="pnumber"
                                placeholder="Phone Number"
                                value={drivers.phoneNumber}
                                onChange={(e) => {
                                  const x = { ...drivers }
                                  x.phoneNumber = e.target.value
                                  setDrivers(x)
                                }}
                              />
                              {emptyValidation.phoneNumberEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Phone Number is required </p> : ""}
                            </div>
                            <div className="form-group col-md-6 select_forms">
                              <label>Email</label>
                              <input
                                className="form-control"
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={drivers.email}
                                onChange={(e) => {
                                  const x = { ...drivers }
                                  x.email = e.target.value
                                  setDrivers(x)
                                }}
                              />
                              {emptyValidation.emailEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Email is required </p> : ""}
                            </div>
                            <div className="form-group col-md-6 select_forms">
                              <label>Address</label>
                              <input
                                className="form-control"
                                type="text"
                                id="lname"
                                name="lastName"
                                placeholder="Address"
                                value={drivers.address}
                                onChange={(e) => {
                                  const x = { ...drivers }
                                  x.address = e.target.value
                                  setDrivers(x)
                                }}
                              />
                              {emptyValidation.addressEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Address is required </p> : ""}
                            </div>
                          </div>
                        </div>
                        <div className="formwithimageupload__column">
                          <div className="imgupload">
                            <div className="file-upload position-relative">
                              <div className="imagecontainer">
                                <div className="uploadedimages">
                                  <img className="uploadedimage" src={picture ? imgData : imgData} alt="uploaded_image" />
                                </div>
                              </div>
                              <label for="upload-image" className="btn btn-primary btn_upload">
                                Upload Picture
                              </label>
                              <p>Photo should not exceed size of 5 MB.</p>
                              <input onChange={imagesPreview} id="upload-image" name="upload-image" hidden type="file" accept=".png, .jpg, .jpeg" />
                              {emptyValidation.imageEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Image is required </p> : ""}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="btnscontainer">
                        <button type="submit" disabled={btnLock} className="btn btn-primary">
                          Update
                          {btnLock ? <div className="btnloader">{Loader}</div> : ""}
                        </button>
                        <Link to="/Drivers" className="btn_primary_outline cancelbtn">
                          Cancel
                        </Link>
                      </div>
                    </div>
                  </form>
                )}
              </div>
              <div className="card" style={{ marginTop: "40px" }}>
                {loader ? (
                  Loader
                ) : (
                  <form id="form" onSubmit={imagesSubmit}>
                    <div className="card-body">
                      <h4 className="section_head_line">Vehicle Information</h4>
                      <div className="row">
                        <div className="col-md-3">
                          <div className="file-upload position-relative">
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
                        </div>
                        <div className="col-md-3">
                          <div className="file-upload position-relative">
                            <div className="imagecontainer" style={{ paddingBottom: "15px" }}>
                              <div className="card">
                                <div className="uploadedimages doc_card_section">
                                  <img
                                    className="uploadDocument"
                                    src={resultSecond ? resultSecond : "./img/icon_upload_complate.svg"}
                                    alt="uploaded_image"
                                  />
                                </div>
                              </div>
                            </div>
                            <label for="uploaderSecond" className="btn btn-primary btn_upload doc_btnUpload">
                              Upload Picture
                            </label>
                            <p className="picture_para">Photo should not exceed size of 5 MB.</p>
                            <input
                              onChange={(e) => {
                                setUploadImageSecond(e.target.files[0])
                                uploaderSecond(e)
                              }}
                              id="uploaderSecond"
                              name="uploaderSecond"
                              hidden
                              type="file"
                              accept=".png, .jpg, .jpeg"
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="file-upload position-relative">
                            <div className="imagecontainer" style={{ paddingBottom: "15px" }}>
                              <div className="card">
                                <div className="uploadedimages doc_card_section">
                                  <img
                                    className="uploadDocument"
                                    src={resultThird ? resultThird : "./img/icon_upload_complate.svg"}
                                    alt="uploaded_image"
                                  />
                                </div>
                              </div>
                            </div>
                            <label for="uploaderThird" className="btn btn-primary btn_upload doc_btnUpload">
                              Upload Picture
                            </label>
                            <p className="picture_para">Photo should not exceed size of 5 MB.</p>
                            <input
                              onChange={(e) => {
                                setUploadImageThird(e.target.files[0])
                                uploaderThird(e)
                              }}
                              id="uploaderThird"
                              name="uploaderThird"
                              hidden
                              type="file"
                              accept=".png, .jpg, .jpeg"
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="file-upload position-relative">
                            <div className="imagecontainer" style={{ paddingBottom: "15px" }}>
                              <div className="card">
                                <div className="uploadedimages doc_card_section">
                                  <img
                                    className="uploadDocument"
                                    src={resultForth ? resultForth : "./img/icon_upload_complate.svg"}
                                    alt="uploaded_image"
                                  />
                                </div>
                              </div>
                            </div>
                            <label for="uploaderForth" className="btn btn-primary btn_upload doc_btnUpload">
                              Upload Picture
                            </label>
                            <p className="picture_para" style={{ paddingLeft: "28px" }}>
                              Photo should not exceed size of 5 MB.
                            </p>
                            <input
                              onChange={(e) => {
                                setUploadImageForth(e.target.files[0])
                                uploaderForth(e)
                              }}
                              id="uploaderForth"
                              name="uploaderForth"
                              hidden
                              type="file"
                              accept=".png, .jpg, .jpeg"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="btnscontainer pdTop">
                        <button type="submit" disabled={btnLock} className="btn btn-primary">
                          Save
                          {btnLock ? <div className="btnloader">{Loader}</div> : ""}
                        </button>
                        <Link to="/Drivers" className="btn_primary_outline cancelbtn">
                          Cancel
                        </Link>
                      </div>
                    </div>
                  </form>
                )}
              </div>
              <div className="row mb-12">
                <div className="col-lg-12 col-md-12 mb-4">
                  <div className="card" style={{ marginTop: "40px" }}>
                    <div className="card-body">
                      <h4 className="section_head_line">Vehicle Information</h4>
                      <div class="card-body">
                        {/* <DataTableHeader
                          columnNames={columnNames}
                          pdfHeaders={pdfHeaders}
                          incomingFilteredData={filteredPdfData}
                          incomingData={data}
                          inComingName={"Users"}
                        /> */}
                        <DataTable incomingData={data} columns={Vehiclescolumns(data, setLoader)} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* <EditDriverVehicle /> */}
    </div>
  )
}

export default EditDriver
