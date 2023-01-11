import ViewHeaderEdit from "../Common/ViewHeaderEdit"
import React, { useEffect, useState } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import Swal from "sweetalert2"
import "react-datepicker/dist/react-datepicker.css"
import UsersService from "../../services/UsersService"
import Loader from "../../shared/Loader"
function EditUser() {
  //State
  const { userId } = useParams()
  const history = useHistory()
  const [userCount, setUserCount] = useState(0)
  const [loader, setLoader] = useState(true)
  const [users, setUsers] = useState({
    id: "string",
    firstName: "string",
    lastName: "string",
    profilePicture: "string",
    phoneNumber: "string",
    email: "string",
  })
  const [picture, setPicture] = useState(null)
  const [imgData, setImgData] = useState(null)
  const [btnLock, setBtnLock] = useState(false)
  const [emptyValidation, setEmptyValidation] = useState({
    firstNameEmpty: false,
    lastNameEmpty: false,
    phoneNumberEmpty: false,
    emailEmpty: false,
  })
  // SERVICES
  const userService = new UsersService()

  //UseEffect
  useEffect(() => {
    if (userCount === 0) {
      getUsers()
      setUserCount(1)
    }
  }, [users, imgData]) // eslint-disable-line react-hooks/exhaustive-deps

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    let validCount = 0
    const c = { ...emptyValidation }

    if (users.firstName === "") {
      c.firstNameEmpty = true
      validCount++
    } else {
      c.firstNameEmpty = false
    }

    if (users.lastName === "") {
      c.lastNameEmpty = true
      validCount++
    } else {
      c.lastNameEmpty = false
    }
    if (users.phoneNumber === "") {
      c.phoneNumberEmpty = true
      validCount++
    } else {
      c.phoneNumberEmpty = false
    }

    if (users.email === "") {
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
    try {
      if (!(picture === null)) {
        const formData = new FormData()
        formData.append("file", picture)
        const response = await userService.uploadImage(formData)
        if (response.data.code === 1) {
          try {
            users.profilePicture = response.data.data.url
            const editUserResponse = await userService.update(users)
            if (editUserResponse.data.code === 1) {
              history.push("/Users")
              setBtnLock(false)

              Swal.fire({
                position: "center",
                icon: "success",
                title: "User has been saved",
                showConfirmButton: true,
                timer: 5000,
              })
            }

            if (editUserResponse.data.code === 0) {
              setBtnLock(false)
              Swal.fire({
                position: "center",
                icon: "error",
                title: editUserResponse.data.data.message,
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
      } else {
        try {
          const editUserResponse = await userService.update(users)
          if (editUserResponse.data.code === 1) {
            history.push("/Users")
            setBtnLock(false)

            Swal.fire({
              position: "center",
              icon: "success",
              title: "User has been saved",
              showConfirmButton: true,
              timer: 5000,
            })
          }

          if (editUserResponse.data.code === 0) {
            setBtnLock(false)
            Swal.fire({
              position: "center",
              icon: "error",
              title: editUserResponse.data.data.message,
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

  const getUsers = async () => {
    try {
      const response = await userService.getById(userId)

      if (response.data.code === 1) {
        const copyUser = { ...users }
        copyUser.firstName = response.data.data.firstName
        copyUser.lastName = response.data.data.lastName
        copyUser.phoneNumber = response.data.data.phoneNumber
        copyUser.email = response.data.data.email
        copyUser.id = response.data.data.id
        copyUser.profilePicture = response.data.data.profilePicture
        setUsers(copyUser)
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
  return (
    <main>
      <div class="container-fluid">
        <ViewHeaderEdit name="User" link="/Users" />
        <form id="form" onSubmit={handleSubmit}>
          <div class="row mb-12">
            <div class="col-lg-12 col-md-12 mb-4">
              <div class="card">
                {loader ? (
                  Loader
                ) : (
                  <div class="card-bodyedit">
                    <div class="formwithimageupload">
                      <div class="formwithimageupload__column">
                        <div class="row">
                          <div class="form-group col-md-6 select_forms">
                            <label>First Name</label>
                            <input
                              class="form-control"
                              type="text"
                              id="fname"
                              name="firstName"
                              placeholder="First Name"
                              value={users.firstName}
                              onChange={(e) => {
                                const x = { ...users }
                                x.firstName = e.target.value
                                setUsers(x)
                              }}
                            />
                            {emptyValidation.firstNameEmpty ? <p style={{ marginTop: "5px", color: "red" }}>First Name is required </p> : ""}
                          </div>
                          <div class="form-group col-md-6 select_forms">
                            <label>Last Name</label>
                            <input
                              class="form-control"
                              type="text"
                              id="lname"
                              name="lastName"
                              placeholder="Last Name"
                              value={users.lastName}
                              onChange={(e) => {
                                const x = { ...users }
                                x.lastName = e.target.value
                                setUsers(x)
                              }}
                            />
                            {emptyValidation.lastNameEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Last Name is required </p> : ""}
                          </div>
                          <div class="form-group col-md-6 select_forms">
                            <label>Phone number</label>
                            <input
                              class="form-control"
                              type="number"
                              id="pnumber"
                              name="pnumber"
                              placeholder="Phone Number"
                              value={users.phoneNumber}
                              onChange={(e) => {
                                const x = { ...users }
                                x.phoneNumber = e.target.value
                                setUsers(x)
                              }}
                            />
                            {emptyValidation.phoneNumberEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Phone Number is required </p> : ""}
                          </div>
                          <div class="form-group col-md-6 select_forms">
                            <label>Email</label>
                            <input
                              class="form-control"
                              type="email"
                              id="email"
                              name="email"
                              placeholder="Email"
                              value={users.email}
                              onChange={(e) => {
                                const x = { ...users }
                                x.email = e.target.value
                                setUsers(x)
                              }}
                            />
                            {emptyValidation.emailEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Email is required </p> : ""}
                          </div>
                        </div>
                      </div>
                      <div class="formwithimageupload__column">
                        <div class="imgupload">
                          <div className="file-upload position-relative">
                            <div class="imagecontainer">
                              <div class="uploadedimages">
                                <img class="uploadedimage" src={picture ? imgData : imgData} alt="uploaded_image" />
                              </div>
                            </div>
                            <label for="upload-image" class="btn btn-primary btn_upload">
                              Upload Picture
                            </label>
                            <p className="picture_para">Photo should not exceed size of 5 MB.</p>
                            <input onChange={imagesPreview} id="upload-image" name="upload-image" hidden type="file" accept=".png, .jpg, .jpeg" />
                            {emptyValidation.imageEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Image is required </p> : ""}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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

export default EditUser
