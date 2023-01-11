import React from "react"
import { Link } from "react-router-dom"

import Datatable from "../../Common/Datatable"
import DataTableHeader from "../../Common/DataTableHeader"
import ViewHeader from "../../Common/ViewHeaderAdd"
import { columnNames, pdfHeaders } from "../../../TableColumns/UserData"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import Loader from "../../../shared/Loader"
import ConfigurationsService from "../../../services/ConfigurationsService"
import { VehicleName } from "../../../shared/VehicleName"
import deleteItem from "../../../shared/DeleteItem"

function VehiclesConfig() {
  const configurationService = new ConfigurationsService()
  const [data, setData] = useState([])
  const [filteredPdfData, setFilteredPdfData] = useState([])
  const [dataCount, setDataCount] = useState(0)
  const [loader, setLoader] = useState(true)
  //UseEffect
  useEffect(() => {
    if (dataCount === 0) {
      getConfiguration()
      setDataCount(1)
    }
  }, [data]) // eslint-disable-line react-hooks/exhaustive-deps

  const columns = [
    {
      name: "Sr#",
      cell: (row, index) => index + 1,
      sortable: true,
      width: "150px",
      maxWidth: "150px",
    },
    {
      name: "Sr#",
      cell: (row) => {
        return (
          <>
            <div>
              <img className="datatable_img" src={row.imagePath ? row.imagePath : ""} alt="" />
            </div>
          </>
        )
      },
      sortable: true,
    },

    {
      name: "Vehicle Name",
      selector: "title",
      sortable: true,
    },
    {
      name: "Vehicle Type",
      selector: "vehicleCategory",
      sortable: true,
    },
    {
      name: "Based Price",
      selector: "basePrice",
      sortable: true,
    },
    {
      name: "Capacity",
      selector: "capacity",
      sortable: true,
    },

    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <div className="tableactions">
          <Link to={`/EditVehicleConfig/${row["vehicleTypeId"]}/${row["vehicleCategory"]}`} className="TableEdit">
            <img src="./img/icon_edit_complete.svg" alt="table-action" />
          </Link>
          {/* <Link to={`Driver/${row["vehicleTypeId"]}`} className="TableEdit">
            <img alt="table-action" className="tableactions_image" src="./img/icon_view_complete.svg" />
          </Link> */}
          <button
            type="button"
            data-toggle="modal"
            class="tableactions_action"
            onClick={() => deleteItem(row["vehicleTypeId"], data, configurationService, "Vehicle", setLoader)}
          >
            <img alt="table-action" class="tableactions_image" src="./img/icon_delete_complete.svg" />
          </button>
        </div>
      ),
    },
  ]

  //Functions
  const getConfiguration = async () => {
    setLoader(true)
    try {
      const response = await configurationService.get()
      setData(response.data.data)
      setLoader(false)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="class-index">
                <h2>Vehicle Configuration</h2>
                <button
                  class="btn btn-primary header_add_btn dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Add
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ top: "10px" }}>
                  <Link class="dropdown-item" to={`/AddVehicleConfig/${VehicleName.Bike}`}>
                    Bike
                  </Link>
                  <Link class="dropdown-item" to={`/AddVehicleConfig/${VehicleName.Truck}`}>
                    Truck
                  </Link>
                  <Link class="dropdown-item" to={`/AddVehicleConfig/${VehicleName.SpecialTruck}`}>
                    Special Truck
                  </Link>
                </div>
              </div>
              <div className="separator mb-5"></div>
            </div>
            <div className="col-sm-4"></div>
          </div>

          <div className="row mb-12">
            <div className="col-lg-12 col-md-12 mb-4">
              <div className="card">
                <div className="card-body">
                  <DataTableHeader
                    columnNames={columnNames}
                    pdfHeaders={pdfHeaders}
                    incomingFilteredData={filteredPdfData}
                    incomingData={data}
                    inComingName={"Users"}
                  />

                  <Datatable incomingData={data} columns={columns} loader={loader} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default VehiclesConfig
