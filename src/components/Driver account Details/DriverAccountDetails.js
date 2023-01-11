import React from "react"
import { Link } from "react-router-dom"
import deleteItem from "../../shared/DeleteItem"
import Datatable from "../Common/Datatable"
import DataTableHeader from "../Common/DataTableHeader"
import ViewHeader from "../Common/ViewHeaderAdd"
import { columnNames, pdfHeaders } from "../../TableColumns/AccountsData"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import PromoCodesService from "../../services/PromoCodesService"

function DriverAccountDetails() {
  const accountsService = new PromoCodesService()
  const [data, setData] = useState([
    {
      accountName: "Will Oliver",
      bankName: "HBL Bank",
      accountNo: "(955)227-3083",
      BVN: "226644",
      payment: "$100",
      status: "Pending",
    },
  ])
  const [filteredPdfData, setFilteredPdfData] = useState([])
  const [dataCount, setDataCount] = useState(0)
  const [loader, setLoader] = useState(true)

  const filterPdfData = (data) => {
    const filteredData = data.map((elt) => {
      return [elt.firstName, elt.lastName, elt.bankName, elt.accountNumber, elt.balance]
    })
    setFilteredPdfData(filteredData)
  }

  const columns = [
    {
      name: "Sr#",
      cell: (row, index) => index + 1,
      sortable: true,
      width: "150px",
      maxWidth: "150px",
    },

    {
      name: "Account Name",
      cell: (row) => row["firstName"] + " " + row["lastName"],
      sortable: true,
    },

    {
      name: "Bank Name",
      selector: "bankName",
      sortable: true,
    },
    {
      name: "Account No",
      selector: "accountNumber",
      sortable: true,
    },

    {
      name: "Balance",
      selector: "balance",
      sortable: true,
    },
  ]

  //UseEffect
  useEffect(() => {
    if (dataCount === 0) {
      getAccountsDetails()
      setDataCount(1)
    }
  }, [data]) // eslint-disable-line react-hooks/exhaustive-deps

  //Functions
  const getAccountsDetails = async () => {
    try {
      const response = await accountsService.getAccountsDetails()
      setData(response.data.data)
      filterPdfData(response.data.data)
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
                <h2>Driver Account Detail</h2>
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
                        <th scope="col">Account Name</th>
                        <th scope="col">Bank Name</th>
                        <th scope="col">Account No.</th>
                        <th scope="col">BVN</th>
                        <th scope="col">Payment</th>
                        <th scope="col">status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody id="tbody">
                      <tr>
                        <td>1</td>
                        <td>weber</td>
                        <td>Weber@example.com</td>
                        <td>(111)-111111</td>
                        <td>22334</td>
                        <td>$100</td>
                        <td>Pending</td>
                        <td className="wid-175">
                          <Link to="#">
                            <img className="action-icons" src="./img/tick.svg" alt="" />
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </table> */}
                  <DataTableHeader
                    columnNames={columnNames}
                    pdfHeaders={pdfHeaders}
                    incomingFilteredData={filteredPdfData}
                    incomingData={data}
                    inComingName={"Accounts Detail"}
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

export default DriverAccountDetails
