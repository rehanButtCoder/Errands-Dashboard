import ViewHeaderEdit from "../Common/ViewHeaderEdit"
import React, { useEffect, useState } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import Swal from "sweetalert2"
import "react-datepicker/dist/react-datepicker.css"
import ConstantService from "../../services/ConstantsService"
import Loader from "../../shared/Loader"
import { setDefaultLocale } from "react-datepicker"
function EditConstants() {
  const { id } = useParams()
  const history = useHistory()
  const [dataCount, setDataCount] = useState(0)
  const [loader, setLoader] = useState(true)
  const [data, setData] = useState({
    title: "",
    value: "",
  })

  const [btnLock, setBtnLock] = useState(false)
  const [emptyValidation, setEmptyValidation] = useState([
    {
      titleEmpty: false,
      valueEmpty: false,
    },
  ])
  // SERVICES
  const constantService = new ConstantService()

  //   UseEffect
  useEffect(() => {
    if (dataCount === 0) {
      getConstants()
      setDataCount(1)
    }
  }, [data]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (e) => {
    e.preventDefault()
    let validCount = 0
    const c = { ...emptyValidation }

    if (data[0].title === "") {
      c.titleEmpty = true
      validCount++
    } else {
      c.titleEmpty = false
    }

    if (data[0].value === "") {
      c.valueEmpty = true
      validCount++
    } else {
      c.valueEmpty = false
    }

    setEmptyValidation(c)

    if (validCount > 0) {
      return
    }
    setBtnLock(true)
    debugger
    const response = await constantService.update(data[0])
    if (response.data.code === 1) {
      setBtnLock(false)

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Constant has been updated",
        showConfirmButton: true,
        timer: 5000,
      })
      history.push("/ManageConstants")
    }
  }

  const getConstants = async () => {
    debugger
    const response = await constantService.getConstants()
    const constantId = response.data.data.filter((item) => {
      return Number(id) === item.constantId
    })
    setData(constantId)
  }

  return (
    <>
      <main>
        <div class="container-fluid">
          <ViewHeaderEdit name="Constant" link="/ManageConstants" />
          <form id="form" onSubmit={handleSubmit}>
            <div class="row mb-12">
              <div class="col-lg-12 col-md-12 mb-4">
                <div class="card">
                  {/* {loader ? (
                    Loader
                  ) : ( */}
                  <div class="card-bodyedit">
                    <div class="formwithimageupload">
                      <div class="formwithimageupload__column">
                        <div class="row">
                          <div class="form-group col-md-6 select_forms">
                            <label>Constant Type</label>
                            <input
                              class="form-control"
                              type="text"
                              id="fname"
                              name="firstName"
                              placeholder="Line Type"
                              value={data[0]?.title}
                              onChange={(e) => {
                                const x = [...data]
                                x[0].title = e.target.value
                                setData(x)
                              }}
                            />
                            {emptyValidation.titleEmpty ? <p style={{ marginTop: "5px", color: "red" }}>First Name is required </p> : ""}
                          </div>
                          <div class="form-group col-md-6 select_forms">
                            <label>Value</label>
                            <input
                              class="form-control"
                              type="number"
                              id="lname"
                              name="lastName"
                              placeholder="Price"
                              value={data[0]?.value}
                              onChange={(e) => {
                                const x = [...data]
                                x[0].value = e.target.value
                                setData(x)
                              }}
                            />
                            {emptyValidation.valueEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Last Name is required </p> : ""}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* )} */}
                </div>
                <div class="btnscontainer" style={{ paddingTop: "70px" }}>
                  <button type="submit" disabled={btnLock} className="btn btn-primary">
                    Update
                    {btnLock ? <div class="btnloader">{Loader}</div> : ""}
                  </button>
                  <Link to="/ManageConstants" className="btn_primary_outline cancelbtn">
                    Cancel
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}

export default EditConstants
