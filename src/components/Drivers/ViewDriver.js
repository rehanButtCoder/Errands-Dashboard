import React, { useEffect, useState } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import DriverService from "../../services/DriverService"
import Loader from "../../shared/Loader"
import Swal from "sweetalert2"
import ViewHeaderView from "../Common/ViewHeaderView"
import OrderService from "../../services/OrderService"
import ViewUserDataTable from "../Common/ViewUserDataTable"
import Datatable from "../Common/Datatable"
import { columnNames, pdfHeaders } from "../../TableColumns/OrdersData"
import { Datacolumns } from "../../tabledata/DocumentsDataTable"
import { Vehiclescolumns } from "../../tabledata/DriverVehiclesTable"
import DataTable from "../Common/Datatable"
import { OrderCategoryTypes } from "../../Contants/OrderCategoryTypes"
import Ratings from "react-ratings-declarative"
import DriverVehiclesService from "../../services/DriverVehiclesService"
import ViewVehicleDetails from "./ViewVehiclesDetails"

function ViewDriver() {
  // SERVICES
  const driverService = new DriverService()
  const orderService = new OrderService()
  const vehiclesService = new DriverVehiclesService()
  const [data, setData] = useState([])
  const [vehicleData, setVehicleData] = useState([])
  const [filteredPdfData, setFilteredPdfData] = useState([])
  const [btnLock, setBtnLock] = useState(false)
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
  const [orders, setOrders] = useState([])
  //State
  const [driver, setDrvier] = useState({
    id: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    profilePicture: "",
    email: "",
    address: "",
    rating: 0,
  })
  const [drvierCount, setDrvierCount] = useState(0)
  const [loader, setLoader] = useState(true)
  const { driverId } = useParams()
  const history = useHistory()
  //UseEffect
  useEffect(() => {
    if (drvierCount === 0) {
      getDrvier()
      GetAllOrders()
      getImages()
      // getVehicles()
      setDrvierCount(1)
    }
  }, [driver, drvierCount]) // eslint-disable-line react-hooks/exhaustive-deps

  //Functions

  const getDrvier = async () => {
    try {
      const response = await driverService.getById(driverId)
      debugger
      if (response.data.code === 1) {
        setDrvier(response.data.data)
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
      history.push("/Drivers")
    }
  }
  const approve = async () => {
    try {
      const response = await driverService.Approve(driverId)
      debugger
      if (response.data.code === 1) {
        setBtnLock(false)
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Driver has been approved",
          showConfirmButton: true,
          timer: 5000,
        })
        history.push("/Drivers")
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
        title: "Something Went Wrong",
        showConfirmButton: true,
        timer: 5000,
      })
    }
  }

  const getImages = async () => {
    try {
      const response = await driverService.getByDriverId(driverId)
      debugger
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
  const GetAllOrders = async () => {
    try {
      debugger
      const response = await orderService.getDriversOrders(driverId, OrderCategoryTypes.All)
      debugger
      setOrders(response.data.data)
      setLoader(false)
    } catch (error) {
      console.log(error)
    }
  }
  const getLineDrivers = async () => {
    try {
      const response = await orderService.getDriversOrders(driverId, OrderCategoryTypes.Line)
      debugger
      setOrders(response.data.data)
      setLoader(false)
    } catch (error) {
      console.log(error)
    }
  }

  const getTruckingDrivers = async () => {
    try {
      const response = await orderService.getDriversOrders(driverId, OrderCategoryTypes.Trucking)
      debugger
      setOrders(response.data.data)
      setLoader(false)
    } catch (error) {
      console.log(error)
    }
  }
  const getErrands = async () => {
    try {
      const response = await orderService.getDriversOrders(driverId, OrderCategoryTypes.Errand)
      debugger
      setOrders(response.data.data)
      setLoader(false)
    } catch (error) {
      console.log(error)
    }
  }
  const getExpress = async () => {
    try {
      const response = await orderService.getDriversOrders(driverId, OrderCategoryTypes.Delivery)
      debugger
      setOrders(response.data.data)
      setLoader(false)
    } catch (error) {
      console.log(error)
    }
  }
  // const getVehicles = async () => {
  //   try {
  //     const response = await vehiclesService.getDriverVehicles(driverId)
  //     if (response.data.code === 1) {
  //       setVehicleData(response.data.data)
  //     }
  //   } catch (error) {
  //     Swal.fire({
  //       position: "center",
  //       icon: "error",
  //       title: "Something Went Wrong",
  //       showConfirmButton: true,
  //       timer: 5000,
  //     })
  //   }
  // }

  return (
    <main>
      <div class="container-fluid">
        <ViewHeaderView name="Driver" link="/Drivers" />
        <div class="row mb-12">
          <div class="col-lg-12 col-md-12 mb-4">
            <div class="card">
              <div class="card-body">
                {loader ? (
                  Loader
                ) : (
                  <div class="formwithimageview">
                    <div class="formwithimageview__column">
                      <div className="ViewImg">
                        <img id="output" className="ViewImg" src={driver.profilePicture ? driver.profilePicture : "./img/Logo@2x.png"} alt="" />
                      </div>
                    </div>
                    <div class="formwithimageview__column">
                      <div class="row">
                        <div class="form-group col-md-4 select_forms">
                          <label>Name</label>
                          <input type="text" class="form-edit" value={driver.firstName + driver.lastName} style={{ pointerEvents: "none" }} />
                        </div>
                        <div class="form-group col-md-4 select_forms">
                          <label>Email</label>
                          <input type="text" class="form-edit" value={driver.email} style={{ pointerEvents: "none" }} />
                          <p class="validate-error" id="error-last_name"></p>
                        </div>
                        <div class="form-group col-md-4 select_forms">
                          <label>Rating</label>
                          <div className="rating_flex">
                            <Ratings rating={driver?.rating} widgetRatedColors="#FFC107" widgetDimensions="18px" widgetSpacings="5px">
                              <Ratings.Widget />
                              <Ratings.Widget />
                              <Ratings.Widget />
                              <Ratings.Widget />
                              <Ratings.Widget />
                            </Ratings>
                            <input type="text" class="form-edit" value={driver.rating} style={{ pointerEvents: "none" }} />
                          </div>
                          <p class="validate-error" id="error-last_name"></p>
                        </div>

                        <div class="form-group col-md-4 select_forms">
                          <label>Phone number</label>
                          <input type="text" class="form-edit" value={driver.phoneNumber} style={{ pointerEvents: "none" }} />
                          <p class="validate-error" id="error-number"></p>
                        </div>
                        <div class="form-group col-md-6 select_forms">
                          <label>Address</label>
                          <input type="text" class="form-edit" value={driver.address} style={{ pointerEvents: "none" }} />
                          <p class="validate-error" id="error-number"></p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {driver.isApproved ? (
              ""
            ) : (
              <div class="btnscontainer" style={{ paddingTop: "40px", paddingBottom: "10px" }}>
                <button disabled={btnLock} className="btn btn-primary" onClick={approve}>
                  Approve
                  {btnLock ? <div class="btnloader">{Loader}</div> : ""}
                </button>
                <Link to="/Drivers" className="btn_primary_outline cancelbtn">
                  Cancel
                </Link>
              </div>
            )}
          </div>
        </div>
        <div class="row mb-12">
          <div class="col-lg-12 col-md-12 mb-4">
            <div class="card">
              <div class="card-body">
                <ViewUserDataTable
                  columnNames={columnNames}
                  pdfHeaders={pdfHeaders}
                  incomingFilteredData={filteredPdfData}
                  incomingData={orders}
                  inComingName={"Orders"}
                  userId={driverId}
                />
                <DataTable incomingData={data} columns={Datacolumns(data, setLoader, setData)} />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="row mb-12">
          <div className="col-lg-12 col-md-12 mb-4">
            <div className="card" style={{ marginTop: "40px" }}>
              <div className="card-body">
                <h4 className="section_head_line">Vehicle Information</h4>
                <div class="card-body">
                  <DataTableHeader
                          columnNames={columnNames}
                          pdfHeaders={pdfHeaders}
                          incomingFilteredData={filteredPdfData}
                          incomingData={data}
                          inComingName={"Users"}
                        />
                  <DataTable incomingData={vehicleData} columns={Vehiclescolumns(vehicleData, setLoader)} />
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <ViewVehicleDetails />
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
                  userId={driverId}
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

export default ViewDriver
