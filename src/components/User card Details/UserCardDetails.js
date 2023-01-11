import React from "react"
import { Link } from "react-router-dom"
import deleteItem from "../../shared/DeleteItem"
import Datatable from "../Common/Datatable"
import DataTableHeader from "../Common/DataTableHeader"
import ViewHeader from "../Common/ViewHeaderAdd"
import { columnNames, pdfHeaders } from "../../TableColumns/UserData"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

function UserCardDetails() {
  const [data, setData] = useState([
    {
      nameOnCard: "Will Oliver",
      cardNo: "(955)227-3083",
      date: "MM / YY",
      CVV: "MM / YY",
      Transactions: "$100",
    },
  ])
  const [filteredPdfData, setFilteredPdfData] = useState([])
  const [loader, setLoader] = useState(true)

  const columns = [
    {
      name: "Sr#",
      cell: (row, index) => index + 1,
      sortable: true,
    },

    {
      name: "Name on card",
      selector: "nameOnCard",
      sortable: true,
    },

    {
      name: "Card No",
      selector: "cardNo",
      sortable: true,
    },
    {
      name: "Date",
      selector: "date",
      sortable: true,
    },
    {
      name: "CVV",
      selector: "CVV",
      sortable: true,
    },
    {
      name: "Transactions",
      selector: "Transactions",
      sortable: true,
    },
  ]

  return (
    <div>
      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="class-index">
                <h2>User Card Details</h2>
              </div>
              <div className="separator mb-5"></div>
            </div>
            <div className="col-sm-4"></div>
          </div>

          <div className="row mb-12">
            <div className="col-lg-12 col-md-12 mb-4">
              <div className="card">
                <div className="card-body">
                  {/* <div className="row">
                    <div className="col-sm-12 col-md-6">
                      <div className="export-to-main">
                        <div className="export-to-text">
                          <label>Export to:</label>
                        </div>
                        <div className="export-to-btns">
                          <button id="SubmitButton" className="btn btn-primary ">
                            PDF
                          </button>
                          <button id="SubmitButton" className="btn btn-primary ">
                            CSV
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                      <div id="myTable_filter" className="dataTables_filter">
                        <label>
                          <input type="search" className="form-control form-control-sm" placeholder="Search" aria-controls="myTable" />
                        </label>
                      </div>
                    </div>
                  </div> */}
                  {/* <table id="myTable" className=" datatable table meeting-table">
                    <thead>
                      <tr>
                        <th scope="col">Sr#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Name on Card</th>
                        <th scope="col">Card no</th>
                        <th scope="col">Date</th>
                        <th scope="col">CVV</th>
                        <th scope="col">Transaction</th>
                      </tr>
                    </thead>
                    <tbody id="tbody">
                      <tr>
                        <td>1</td>
                        <td>weber</td>
                        <td>weber1</td>
                        <td>123211</td>
                        <td>MM/YY</td>
                        <td>MM/YY</td>
                        <td>$100</td>
                      </tr>
                    </tbody>
                  </table> */}
                  <DataTableHeader
                    columnNames={columnNames}
                    pdfHeaders={pdfHeaders}
                    incomingFilteredData={filteredPdfData}
                    incomingData={data}
                    inComingName={"Users"}
                  />
                  <Datatable incomingData={data} columns={columns} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default UserCardDetails
