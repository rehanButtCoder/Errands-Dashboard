import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import DriverService from "../../services/DriverService"
import deleteItem from "../../shared/DeleteItem"
import Datatable from "../Common/Datatable"
import DataTableHeader from "../Common/DataTableHeader"
import ViewHeader from "../Common/ViewHeaderAdd"
import { columnNames, pdfHeaders } from "../../TableColumns/DriverData"
import Swal from "sweetalert2"
function Drivers() {
  //State
  const [data, setData] = useState([])
  let [searchName, setSearchName] = useState({
    search: "",
  })
  const [dataCount, setDataCount] = useState(0)
  const [filteredPdfData, setFilteredPdfData] = useState([])
  const [loader, setLoader] = useState(true)
  const columns = [
    {
      name: "Sr#",
      cell: (row, index) => index + 1,
      sortable: true,
      width: "150px",
      maxWidth: "150px",
    },

    {
      name: "Full Name",
      cell: (row) => row["firstName"] + " " + row["lastName"],
      sortable: true,
    },

    {
      name: "Email",
      selector: "email",
      sortable: true,
    },
    {
      name: "phone",
      selector: "phoneNumber",
      sortable: true,
    },
    {
      name: "Residential Area",
      selector: "address",
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => <p>{row.isApproved ? <span style={{ color: "green" }}>Approved</span> : <span style={{ color: "red" }}>Pending</span>}</p>,
      sortable: true,
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <div className="tableactions">
          <Link to={`Driver/Edit/${row["id"]}`} className="TableEdit">
            <img src="./img/icon_edit_complete.svg" alt="table-action" />
          </Link>
          <Link to={`Driver/${row["id"]}`} className="TableEdit">
            <img alt="table-action" className="tableactions_image" src="./img/icon_view_complete.svg" />
          </Link>
          <button
            type="button"
            data-toggle="modal"
            class="tableactions_action"
            onClick={() => deleteItem(row["id"], data, driverService, row["firstName"] + " " + row["lastName"], setLoader)}
          >
            <img alt="table-action" class="tableactions_image" src="./img/icon_delete_complete.svg" />
          </button>
        </div>
      ),
    },
  ]

  //Services
  const driverService = new DriverService()

  //UseEffect
  useEffect(() => {
    if (dataCount === 0) {
      getUsers()
      setDataCount(1)
    }
  }, [data]) // eslint-disable-line react-hooks/exhaustive-deps

  //Functions
  const getUsers = async () => {
    try {
      const response = await driverService.get()
      setData(response.data.data)
      filterPdfData(response.data.data)
      setLoader(false)
    } catch (error) {
      console.log(error)
    }
  }
  const search = async () => {
    debugger
    setLoader(true)
    const response = await driverService.get(searchName.search)
    if (response.data.code === 1) {
      setData(response.data.data)
    }
    if (response.data.code === 0) {
      Swal.fire({
        position: "center",
        icon: "info",
        title: response.data.data.message,
        showConfirmButton: true,
        timer: 5000,
      })
    }

    setLoader(false)
  }

  const filterPdfData = (data) => {
    const filteredData = data.map((elt) => {
      return [elt.firstName, elt.lastName, elt.email, elt.phoneNumber, elt.address]
    })
    setFilteredPdfData(filteredData)
  }
  return (
    <div>
      <main>
        <div class="container-fluid">
          <ViewHeader showButton={false} name={"Driver"} />
          <div class="row mb-12">
            <div class="col-lg-12 col-md-12 mb-4">
              <div class="card">
                <div class="card-body">
                  <div style={{ paddingBottom: "30px" }}>
                    <h3 className="filter_heading">Filters</h3>
                    <div className="border_bottom"></div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <label>Name</label>
                      <input
                        type="text"
                        id="name-filter"
                        onChange={(e) => {
                          const x = { ...searchName }
                          x.search = e.target.value
                          setSearchName(x)
                        }}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-8 mt-4">
                      <button id="SubmitButton" onClick={() => search()} className="btn btn-primary" style={{ float: "right" }}>
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-12">
            <div class="col-lg-12 col-md-12 mb-4">
              <div class="card">
                <div class="card-body">
                  <DataTableHeader
                    columnNames={columnNames}
                    pdfHeaders={pdfHeaders}
                    incomingFilteredData={filteredPdfData}
                    incomingData={data}
                    inComingName={"Drivers"}
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

export default Drivers
