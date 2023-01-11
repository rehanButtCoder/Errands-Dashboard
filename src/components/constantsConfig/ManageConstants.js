import React from "react"
import { Link } from "react-router-dom"

import Datatable from "../Common/Datatable"
import DataTableHeader from "../Common/DataTableHeader"

import { columnNames, pdfHeaders } from "../../TableColumns/UserData"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import deleteItem from "../../shared/DeleteItem"
import ConstanstService from "../../services/ConstantsService"
import Loader from "../../shared/Loader"

function ManageConstants() {
  const constantsService = new ConstanstService()
  const [data, setData] = useState([])
  const [filteredPdfData, setFilteredPdfData] = useState([])
  const [dataCount, setDataCount] = useState(0)
  const [loader, setLoader] = useState(true)
  //UseEffect
  useEffect(() => {
    if (dataCount === 0) {
      getConstants()
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
      name: "Constant Types",
      selector: "title",
      sortable: true,
    },

    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <div className="tableactions">
          <Link to={`/EditConstant/${row["constantId"]}`} className="TableEdit">
            <img src="./img/icon_edit_complete.svg" alt="table-action" />
          </Link>
        </div>
      ),
    },
  ]

  //Functions
  const getConstants = async () => {
    setLoader(true)
    try {
      const response = await constantsService.getConstants()
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
                <h2>Constants Configuration</h2>
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

export default ManageConstants
