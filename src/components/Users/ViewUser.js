import React, { useEffect, useState } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import UsersService from "../../services/UsersService"
import OrderService from "../../services/OrderService"
import Loader from "../../shared/Loader"
import Swal from "sweetalert2"
import ViewHeaderView from "../Common/ViewHeaderView"
import Datatable from "../Common/Datatable"
import ViewUserDataTable from "../Common/ViewUserDataTable"
import { columnNames, pdfHeaders } from "../../TableColumns/OrdersData"
import { OrderCategoryTypes } from "../../Contants/OrderCategoryTypes"
function ViewUser() {
  // SERVICES
  const userService = new UsersService()
  const orderService = new OrderService()
  //State
  const [orders, setOrders] = useState([])
  const [orderCount, setOrderCount] = useState(0)
  const [filteredPdfData, setFilteredPdfData] = useState([])
  const columns = [
    {
      name: "Sr#",
      cell: (row, index) => index + 1,
      sortable: true,
      width: "100px",
    },
    {
      name: "Full Name",
      cell: (row) => row["userFirstName"] + " " + row["userLastName"],
      sortable: true,
      width: "150px",
    },

    {
      name: "From",
      selector: "fromAddresss",
      sortable: true,
    },
    {
      name: "To",
      selector: "toAddress",
      sortable: true,
    },
    {
      name: "Category",
      selector: "orderTypeTitle",
      sortable: true,
      width: "150px",
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <div className="tableactions">
          {OrderCategoryTypes.Delivery === row.orderTypeId ? (
            <Link to={`/Order/Delivery/${row["orderId"]}`} className="TableEdit">
              <img alt="table-action" className="tableactions_image" src="./img/icon_view_complete.svg" />
            </Link>
          ) : OrderCategoryTypes.Errand === row.orderTypeId ? (
            <Link to={`/Order/Errand/${row["orderId"]}`} className="TableEdit">
              <img alt="table-action" className="tableactions_image" src="./img/icon_view_complete.svg" />
            </Link>
          ) : OrderCategoryTypes.Trucking === row.orderTypeId ? (
            <Link to={`/Order/Trucking/${row["orderId"]}`} className="TableEdit">
              <img alt="table-action" className="tableactions_image" src="./img/icon_view_complete.svg" />
            </Link>
          ) : (
            <Link to={`/Order/Line/${row["orderId"]}`} className="TableEdit">
              <img alt="table-action" className="tableactions_image" src="./img/icon_view_complete.svg" />
            </Link>
          )}
        </div>
      ),
    },
  ]

  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    profilePicture: "",
    email: "",
  })
  const [userCount, setUserCount] = useState(0)
  const [loader, setLoader] = useState(true)
  const { userId } = useParams()
  const history = useHistory()
  //UseEffect
  useEffect(() => {
    if (userCount === 0) {
      getUser()
      setUserCount(1)
    }
  }, [user, userCount]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (orderCount === 0) {
      GetOrders()
      setOrderCount(1)
    }
  }, [orders]) // eslint-disable-line react-hooks/exhaustive-deps

  //Functions

  const GetOrders = async () => {
    try {
      const response = await orderService.getById(userId, OrderCategoryTypes.All)
      setOrders(response.data.data)
      filterPdfData(response.data.data)
      setLoader(false)
    } catch (error) {
      console.log(error)
    }
  }

  const filterPdfData = (data) => {
    const filteredData = data.map((elt) => {
      return [elt.userFirstName, elt.userLastName, elt.fromAddresss, elt.toAddress, elt.orderTypeTitle]
    })
    setFilteredPdfData(filteredData)
  }

  const getUser = async () => {
    try {
      const response = await userService.getById(userId)
      if (response.data.code === 1) {
        setUser(response.data.data)
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

  const GetAllOrders = async () => {
    try {
      const response = await orderService.getById(userId, OrderCategoryTypes.All)
      debugger
      setOrders(response.data.data)
      setLoader(false)
    } catch (error) {
      console.log(error)
    }
  }
  const getLineDrivers = async () => {
    try {
      const response = await orderService.getById(userId, OrderCategoryTypes.Line)
      debugger
      setOrders(response.data.data)
      setLoader(false)
    } catch (error) {
      console.log(error)
    }
  }

  const getTruckingDrivers = async () => {
    try {
      const response = await orderService.getById(userId, OrderCategoryTypes.Trucking)
      debugger
      setOrders(response.data.data)
      setLoader(false)
    } catch (error) {
      console.log(error)
    }
  }
  const getErrands = async () => {
    try {
      const response = await orderService.getById(userId, OrderCategoryTypes.Errand)
      debugger
      setOrders(response.data.data)
      setLoader(false)
    } catch (error) {
      console.log(error)
    }
  }
  const getExpress = async () => {
    try {
      const response = await orderService.getById(userId, OrderCategoryTypes.Delivery)
      debugger
      setOrders(response.data.data)
      setLoader(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main>
      <div class="container-fluid">
        <ViewHeaderView name="User" link="/Users" />
        <div class="row mb-12">
          <div class="col-lg-12 col-md-12 mb-4">
            <div class="card">
              <div class="card-body_view">
                {loader ? (
                  Loader
                ) : (
                  <div class="formwithimageview">
                    <div class="formwithimageview__column">
                      <div class="ViewImg">
                        <img id="output" className="ViewImg" src={user.profilePicture ? user.profilePicture : ""} alt="" />
                      </div>
                    </div>
                    <div class="formwithimageview__column">
                      <div class="row">
                        <div class="form-group col-md-6 select_forms">
                          <label>Name</label>
                          <input type="text" class="form-edit" value={user.firstName + user.lastName} style={{ pointerEvents: "none" }} />
                        </div>
                        <div class="form-group col-md-6 select_forms">
                          <label>Email</label>
                          <input type="text" class="form-edit" value={user.email} style={{ pointerEvents: "none" }} />
                          <p class="validate-error" id="error-last_name"></p>
                        </div>
                        <div class="form-group col-md-6 select_forms">
                          <label>Phone number</label>
                          <input type="text" class="form-edit" value={user.phoneNumber} style={{ pointerEvents: "none" }} />
                          <p class="validate-error" id="error-number"></p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div class="row mb-12">
          <div class="col-lg-12 col-md-12 mb-4">
            <div class="card">
              <div class="card-body">
                <div className="col-sm-12 col-md-6"></div>
                <div style={{ width: "100%" }}>
                  <div className="dropdown float-right dropdown-history">
                    <button
                      className="btn btn-primary_history dropdown-toggle "
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      history
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <div className="form-check dropdown-item" onClick={GetAllOrders}>
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                        <label className="form-check-label dropdown_label" for="flexRadioDefault1">
                          All
                        </label>
                      </div>
                      <div className="form-check dropdown-item" onClick={getLineDrivers}>
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                        <label className="form-check-label dropdown_label" for="flexRadioDefault2">
                          Line
                        </label>
                      </div>
                      <div className="form-check dropdown-item" onClick={getExpress}>
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                        <label className="form-check-label dropdown_label" for="flexRadioDefault3">
                          Express
                        </label>
                      </div>
                      <div className="form-check dropdown-item" onClick={getErrands}>
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" />
                        <label className="form-check-label dropdown_label" for="flexRadioDefault4">
                          Errands
                        </label>
                      </div>
                      <div className="form-check dropdown-item" onClick={getTruckingDrivers}>
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault5" />
                        <label className="form-check-label dropdown_label" for="flexRadioDefault5">
                          Trucking
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <ViewUserDataTable
                  columnNames={columnNames}
                  pdfHeaders={pdfHeaders}
                  incomingFilteredData={filteredPdfData}
                  incomingData={orders}
                  inComingName={"Orders"}
                  userId={userId}
                />
                <Datatable incomingData={orders} columns={columns} loader={loader} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ViewUser
