import React, { useEffect, useState } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import OrderService from "../../services/OrderService"
import Loader from "../../shared/Loader"
import Swal from "sweetalert2"
import ViewHeaderView from "../Common/ViewHeaderView"
import Datatable from "../Common/Datatable"
import DataTableHeader from "../Common/DataTableHeader"
import { columnNames, pdfHeaders } from "../../TableColumns/ErrandsData"
import { ErrandsTypes } from "../../Contants/ErrandsTypes"
function ErrandOrder() {
  // SERVICES
  const orderService = new OrderService()
  //State
  const [errands, setErrands] = useState([])
  const [filteredPdfData, setFilteredPdfData] = useState([])
  const [lineCount, setErrandCount] = useState(0)
  const [loader, setLoader] = useState(true)
  const { errandId } = useParams()
  const history = useHistory()
  const columns = [
    {
      name: "Sr#",
      cell: (row, index) => index + 1,
      sortable: true,
    },

    {
      name: "Name",
      cell: (row) => row["itemName"],
      sortable: true,
    },

    {
      name: "Amount",
      cell: (row) => "$" + row["amount"],
      sortable: true,
    },
    {
      name: "Quantity",
      cell: (row) => row["quantity"],
      sortable: true,
    },
  ]

  const [user, setUser] = useState({
    id: "",
    userFirstName: "",
    userLastName: "",
    userPhoneNumber: "",
    userProfilePicture: "",
    userEmail: "",
  })

  //UseEffect
  useEffect(() => {
    if (lineCount === 0) {
      getErrand()
      setErrandCount(1)
    }
  }, [user, lineCount, errands]) // eslint-disable-line react-hooks/exhaustive-deps

  //Functions

  const filterPdfData = (data) => {
    const filteredData = data.map((elt) => {
      return [elt.itemName, elt.amount, elt.quantity]
    })
    setFilteredPdfData(filteredData)
  }

  const getErrand = async () => {
    try {
      const response = await orderService.getErrand(errandId)
      debugger
      if (response.data.code === 1) {
        setUser(response.data.data)
        setErrands(response.data.data.errands)
        filterPdfData(response.data.data.errands[0].errandItems)
        setLoader(false)
        if (response.data.data.errands[0].errandTypeId === ErrandsTypes.serviceErrand) {
          document.getElementById("orderslist").style.display = "none"
        }
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
        <ViewHeaderView name="Order" link="/Users" />
        <div class="row mb-12">
          <div class="col-lg-12 col-md-12 mb-4">
            <div class="card">
              <div class="card-body">
                {loader ? (
                  Loader
                ) : (
                  <>
                    <div class="formwithimageview">
                      <div class="formwithimageview__column">
                        <div class="imgupload">
                          <img id="output" src="./img/Logo@2x.png" src={user.userProfilePicture ? user.userProfilePicture : ""} />
                        </div>
                      </div>
                      <div class="formwithimageview__column">
                        <div class="row">
                          <div class="form-group col-md-6 select_forms">
                            <label>Name</label>
                            <input type="text" class="form-edit" value={user.userFirstName + user.userLastName} style={{ pointerEvents: "none" }} />
                          </div>
                          <div class="form-group col-md-6 select_forms">
                            <label>Email</label>
                            <input type="text" class="form-edit" value={user.userEmail} style={{ pointerEvents: "none" }} />
                            <p class="validate-error" id="error-last_name"></p>
                          </div>
                          <div class="form-group col-md-6 select_forms">
                            <label>Phone number</label>
                            <input type="text" class="form-edit" value={user.userPhoneNumber} style={{ pointerEvents: "none" }} />
                            <p class="validate-error" id="error-number"></p>
                          </div>
                          <div class="form-group col-md-6 select_forms">
                            <label>To</label>
                            <input type="text" class="form-edit" value={user.toAddress} style={{ pointerEvents: "none" }} />
                            <p class="validate-error" id="error-number"></p>
                          </div>
                          <div class="form-group col-md-6 select_forms">
                            <label>From</label>
                            <input type="text" class="form-edit" value={user.fromAddresss} style={{ pointerEvents: "none" }} />
                            <p class="validate-error" id="error-number"></p>
                          </div>
                          <div class="form-group col-md-6 select_forms">
                            <label>Errand Duration</label>
                            <input
                              type="text"
                              class="form-edit"
                              value={Math.ceil(user.estimatedTime) + " Minutes"}
                              style={{ pointerEvents: "none" }}
                            />
                            <p class="validate-error" id="error-number"></p>
                          </div>
                          <div class="form-group col-md-6 select_forms">
                            <label>Delivery OTP</label>
                            <input type="text" class="form-edit" value={user?.deliveryOTP} style={{ pointerEvents: "none" }} />
                            <p class="validate-error" id="error-number"></p>
                          </div>
                          <div class="form-group col-md-6 select_forms">
                            <label>Pickup OTP</label>
                            <input type="text" class="form-edit" value={user?.pickupOTP} style={{ pointerEvents: "none" }} />
                            <p class="validate-error" id="error-number"></p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div class="form-group select_forms">
                        <label>Instructions</label>
                        <input type="text" class="form-edit" value={user.instructions} style={{ pointerEvents: "none" }} />
                        <p class="validate-error" id="error-number"></p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div id="orderslist" class="row mb-12">
          <div class="col-lg-12 col-md-12 mb-4">
            <div class="card">
              <div class="card-body">
                {loader ? (
                  Loader
                ) : (
                  <>
                    <DataTableHeader
                      columnNames={columnNames}
                      pdfHeaders={pdfHeaders}
                      incomingFilteredData={filteredPdfData}
                      incomingData={errands[0]?.errandItems}
                      inComingName={"Errands"}
                    />
                    <Datatable incomingData={errands[0]?.errandItems} columns={columns} loader={loader} />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ErrandOrder
