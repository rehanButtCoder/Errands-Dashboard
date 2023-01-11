import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import UsersService from "../../services/UsersService"
import deleteItem from "../../shared/DeleteItem"
import Datatable from "../Common/Datatable"
import DataTableHeader from "../Common/DataTableHeader"
import ViewHeader from "../Common/ViewHeaderAdd"
import { columnNames, pdfHeaders } from "../../TableColumns/UserData"
import Swal from "sweetalert2"

function Users() {
  //State
  const [data, setData] = useState([])
  const [dataCount, setDataCount] = useState(0)
  let [searchName, setSearchName] = useState({
    search: "",
  })
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
      name: "Actions",
      button: true,
      cell: (row) => (
        <div className="action-icons">
          <Link to={`User/Edit/${row["id"]}`} className="TableEdit">
            <img className="tableactions_image" src="./img/icon_edit_complete.svg" alt="table-action" />
          </Link>
          <Link to={`User/${row["id"]}`} className="TableEdit">
            <img alt="table-action" className="tableactions_image" src="./img/icon_view_complete.svg" />
          </Link>
          <button
            type="button"
            data-toggle="modal"
            className="tableactions_action"
            onClick={() => deleteItem(row["id"], data, userService, "Users", setLoader)}
          >
            <img alt="table-action" className="tableactions_image" src="./img/icon_delete_complete.svg" />
          </button>
        </div>
      ),
    },
  ]

  //Services
  const userService = new UsersService()

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
      const response = await userService.get("")
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
    const response = await userService.get(searchName.search)
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
      return [elt.firstName, elt.lastName, elt.email, elt.phoneNumber]
    })
    setFilteredPdfData(filteredData)
  }
  return (
    <div>
      <main>
        <div className="container-fluid">
          <ViewHeader showButton={false} name="User" />
          <div className="row mb-12">
            <div className="col-lg-12 col-md-12 mb-4">
              <div className="card">
                <div className="card-body">
                  {/* <div id="accordion">
                    <div class="accordion">
                      <div class="accordionheader">
                        <button
                          class="accordionheader__link collapsed"
                          data-toggle="collapse"
                          data-target="#collapseOne"
                          aria-expanded="false"
                          aria-controls="collapseOne"
                        >
                          Search filters
                          <svg xmlns="http://www.w3.org/2000/svg" width="8.643" height="5.5" viewBox="0 0 8.643 5.5">
                            <g id="icon_drop_down" transform="translate(0 0)">
                              <path
                                id="Path_26"
                                data-name="Path 26"
                                d="M6.921,10.1,2.6,5.732,3.72,4.6l3.2,3.235,3.2-3.235,1.12,1.132Z"
                                transform="translate(-2.6 -4.6)"
                                fill="#1c2826"
                              />
                            </g>
                          </svg>
                        </button>
                      </div>
                      <div id="collapseOne" class="collapse accordioncontent" aria-labelledby="headingOne" data-parent="#accordion">
                        <div class="accordioncontent__container">
                          <div class="row">
                            <div class="col-md-4">
                              <label>Name</label>
                              <input
                                type="text"
                                id="name-filter"
                                onChange={(e) => {
                                  const x = { ...searchName }
                                  x.search = e.target.value
                                  setSearchName(x)
                                }}
                                class="form-control"
                              />
                            </div>
                            <div class="col-md-12 mt-4">
                              <button id="SubmitButton" onClick={() => search()} class="btn btn-primary float-left">
                                Search
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
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

export default Users
