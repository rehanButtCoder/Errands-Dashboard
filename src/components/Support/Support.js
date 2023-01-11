import React from "react"
import { Link } from "react-router-dom"

import Datatable from "../Common/Datatable"
import DataTableHeader from "../Common/DataTableHeader"
import ViewHeader from "../Common/ViewHeaderAdd"
import { columnNames, pdfHeaders } from "../../TableColumns/UserData"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import SupportService from "../../services/SupportService"
import ResolvedQuery from "../../shared/ResolvedQuery"
import Loader from "../../shared/Loader"

function Support() {
  const supportService = new SupportService()
  const [data, setData] = useState([])
  const [filteredPdfData, setFilteredPdfData] = useState([])
  const [dataCount, setDataCount] = useState(0)
  const [loader, setLoader] = useState(true)
  //UseEffect
  useEffect(() => {
    if (dataCount === 0) {
      getSupport()
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
      name: "Driver Name",
      cell: (row) => row["DriverFirstName"] + " " + row["DriverLastName"],
      sortable: true,
      width: "250px",
      maxWidth: "250px",
    },
    {
      name: "User Name",
      cell: (row) => row["userFirstName"] + " " + row["userLastName"],
      sortable: true,
      width: "250px",
      maxWidth: "250px",
    },

    {
      name: "From",
      selector: "orderFromAddresss",
      sortable: true,
    },
    {
      name: "To",
      selector: "orderToAddress",
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <p>
          {row.queryStatusTitle === "Pending" ? (
            <span style={{ color: "red" }}> Pending</span>
          ) : row.queryStatusTitle === "Replied" ? (
            <span style={{ color: "green" }}>Resolved</span>
          ) : (
            ""
          )}
        </p>
      ),
      sortable: true,
      width: "150px",
    },

    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <div className="action-icons">
          <Link to={`/ViewSupport/${row.supportQueryId}`} className="TableEdit">
            <img alt="table-action" className="tableactions_image" src="./img/icon_view_complete.svg" />
          </Link>
          <Link
            className="TableEdit"
            onClick={() => ResolvedQuery(row["supportQueryId"], supportService, row["userFirstName"] + " " + row["userLastName"], setLoader)}
          >
            <img alt="table-action" className="tableactions_image" src="./img/resolveSupport.png" />
          </Link>
        </div>
      ),
    },
  ]

  //Functions
  const getSupport = async () => {
    setLoader(true)
    try {
      debugger
      const response = await supportService.get()
      setData(response.data.data)
      filterPdfData(response.data.data)
      setLoader(false)
    } catch (error) {
      console.log(error)
    }
  }

  const filterPdfData = (data) => {
    const filteredData = data.map((elt) => {
      return [
        elt.DriverFirstName,
        elt.DriverLastName,
        elt.userFirstName,
        elt.userLastName,
        elt.orderFromAddresss,
        elt.orderToAddress,
        elt.queryStatusTitle,
      ]
    })
    setFilteredPdfData(filteredData)
  }
  return (
    <div>
      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="class-index">
                <h2>Support</h2>
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
                    inComingName={"Support"}
                  />

                  <Datatable incomingData={data} columns={columns} loader={loader} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Are you Sure you want to Resolve Support</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default Support
