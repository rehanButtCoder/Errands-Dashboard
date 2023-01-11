import React from "react"
import { Link } from "react-router-dom"
import deleteItem from "../../shared/DeleteItem"
import Datatable from "../Common/Datatable"
import DataTableHeader from "../Common/DataTableHeader"
import ViewHeader from "../Common/ViewHeaderAdd"
import { columnNames, pdfHeaders } from "../../TableColumns/RefferalsData"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import PromoCodesService from "../../services/PromoCodesService"

function Referals() {
  const [data, setData] = useState([
    {
      referBy: "Will Oliver@gmail.com",
      referTo: "Danielle Chavez@gmail.com",
      code: "20669",
    },
  ])
  const referralsService = new PromoCodesService()
  const [dataCount, setDataCount] = useState(0)
  const [filteredPdfData, setFilteredPdfData] = useState([])
  const [loader, setLoader] = useState(true)

  const columns = [
    {
      name: "Sr#",
      cell: (row, index) => index + 1,
      sortable: true,
      width: "200px",
      maxWidth: "200px",
    },

    {
      name: "Refer By",
      cell: (row) => row["userFirstName"] + " " + row["userLastName"],
      sortable: true,
    },

    {
      name: "Refer To",
      selector: "referTo",
      sortable: true,
      width: "500px",
      maxWidth: "500px",
    },
    {
      name: "Code",
      selector: "code",
      sortable: true,
      width: "200px",
      maxWidth: "200px",
    },
  ]
  useEffect(() => {
    if (dataCount === 0) {
      getReferals()
      setDataCount(1)
    }
  }, [data]) // eslint-disable-line react-hooks/exhaustive-deps

  const getReferals = async () => {
    try {
      const response = await referralsService.getReferals()
      debugger
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
                <h2>Referrals Management</h2>
              </div>
              <div className="separator mb-5"></div>
            </div>
            <div className="col-sm-4"></div>
          </div>

          <div className="row mb-12">
            <div className="col-lg-12 col-md-12 mb-4">
              <div className="card">
                <div className="card-body">
                  <div class="card-body">
                    <DataTableHeader
                      columnNames={columnNames}
                      pdfHeaders={pdfHeaders}
                      incomingFilteredData={filteredPdfData}
                      incomingData={data}
                      inComingName={"Refferals"}
                    />
                    <Datatable incomingData={data} columns={columns} loader={loader} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Referals
