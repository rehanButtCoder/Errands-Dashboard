import React from "react"

import { columnNames, pdfHeaders } from "../../TableColumns/UserData"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { columns } from "../../tabledata/VehiclesDataTable"
import ViewUserDataTable from "../Common/ViewUserDataTable"
import DataTable from "../Common/Datatable"
function Vehicles() {
  const [filteredPdfData, setFilteredPdfData] = useState([])
  const [loader, setLoader] = useState(true)
  const [vehicleData, setVehicleData] = useState([])

  return (
    <div>
      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="class-index">
                <h2>Vehicle Management</h2>
              </div>
              <div className="separator mb-5"></div>
            </div>
            <div className="col-sm-4"></div>
          </div>
          <div className="row mb-12">
            <div className="col-lg-12 col-md-12 mb-4">
              <div className="card">
                <div className="card-body">
                  <ViewUserDataTable
                    columnNames={columnNames}
                    pdfHeaders={pdfHeaders}
                    incomingFilteredData={filteredPdfData}
                    incomingData={vehicleData}
                    inComingName={"Vehicles"}
                  />
                  <DataTable incomingData={vehicleData} columns={columns(vehicleData, setLoader, setVehicleData)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Vehicles
