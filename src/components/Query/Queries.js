import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import deleteItem from "../../shared/DeleteItem"
import Datatable from "../Common/Datatable"
import DataTableHeader from "../Common/DataTableHeader"
import ViewHeader from "../Common/ViewHeaderAdd"
import { columnNames, pdfHeaders } from "../../TableColumns/UserData"
import Swal from "sweetalert2"

function Queries() {
  const [data, setData] = useState([
    {
      fullName: "Will Oliver",
      description: "Lorem ipsum dolor sit ametng",
      date: "05 June",
      status: "Pending",
    },
  ])
  const [dataCount, setDataCount] = useState(0)

  const [filteredPdfData, setFilteredPdfData] = useState([])
  const [loader, setLoader] = useState(true)
  const columns = [
    {
      name: "Sr#",
      cell: (row, index) => index + 1,
      sortable: true,
    },

    {
      name: "Full Name",
      cell: (row) => row["fullName"],
      sortable: true,
    },

    {
      name: "Description",
      selector: "description",
      sortable: true,
    },
    {
      name: "Date",
      selector: "date",
      sortable: true,
    },
    {
      name: "Status",
      selector: "status",
      sortable: true,
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <div className="action-icons">
          <Link to="/ViewQuery" className="TableEdit">
            <img className="tableactions_image" src="./img/icon_view_complete.svg" alt="" />
          </Link>

          <Link to="/ReplyQuery" className="TableEdit">
            <img className="tableactions_image" src="./img/icon_reply_complete.png" alt="" />
          </Link>

          <Link to="#" data-toggle="modal" data-target="#exampleModal" className="TableEdit">
            <img className="tableactions_image" src="./img/icon_delete_complete.svg" alt="" />
          </Link>
        </div>
      ),
    },
  ]

  return (
    <div>
      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="class-index">
                <h2>Query Management</h2>
              </div>
              <div className="separator mb-5"></div>
            </div>
            <div className="col-sm-4"></div>
          </div>

          <div className="row mb-12">
            <div className="col-lg-12 col-md-12 mb-4">
              <div className="card">
                <div className="card-body">
                  {/* <table id="myTable" className=" datatable table meeting-table">
                    <thead>
                      <tr>
                        <th scope="col">Sr#</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody id="tbody">
                      <tr>
                        <td>1</td>
                        <td>weber</td>
                        <td>Lorem ipsum</td>
                        <td>05 June</td>
                        <td>Pending</td>
                        <td className="wid-175">
                          <Link to="/ViewQuery">
                            <img className="action-icons" src="./img/icon_view_complete.svg" alt="" />
                          </Link>

                          <Link to="/ReplyQuery">
                            <img className="action-icons" src="./img/icon_reply_complete.png" alt="" />
                          </Link>

                          <Link to="#" data-toggle="modal" data-target="#exampleModal">
                            <img className="action-icons" src="./img/icon_delete_complete.svg" alt="" />
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
                    inComingName={"Users"}
                  />
                  <Datatable incomingData={data} columns={columns} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Are you Sure you want to Delete</p>
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
      </div>
    </div>
  )
}

export default Queries
