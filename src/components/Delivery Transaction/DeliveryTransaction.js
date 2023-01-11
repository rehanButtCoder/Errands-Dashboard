import React from "react"
import { Link } from "react-router-dom"
import deleteItem from "../../shared/DeleteItem"
import Datatable from "../Common/Datatable"
import DataTableHeader from "../Common/DataTableHeader"
import ViewHeader from "../Common/ViewHeaderAdd"
import { columnNames, pdfHeaders } from "../../TableColumns/DeliverTransactions"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import PromoCodesService from "../../services/PromoCodesService"
import moment from "moment"

function DeliveryTransaction() {
  const [data, setData] = useState([
    {
      userName: "Will Oliver",
      driverName: "Will Oliver",
      date: "05 June",
      category: "Errands",
      totalPayment: "$100",
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
      name: "User Name",
      cell: (row) => row["userFirstName"] + " " + row["userLastName"],
      sortable: true,
    },

    {
      name: "Driver Name",
      cell: (row) => row["driverFirstName"] + " " + row["driverLastName"],
      sortable: true,
    },
    {
      name: "Date",
      cell: (row) => moment(row.createdOn).format("L"),
      sortable: true,
    },
    {
      name: "User Price",
      selector: "userPrice",
      sortable: true,
    },
    {
      name: "Driver Price",
      selector: "driverPrice",
      sortable: true,
    },
  ]

  //Services
  const transactionService = new PromoCodesService()

  //UseEffect
  useEffect(() => {
    if (dataCount === 0) {
      getDeliveries()
      setDataCount(1)
    }
  }, [data]) // eslint-disable-line react-hooks/exhaustive-deps

  //Functions
  const getDeliveries = async () => {
    try {
      const response = await transactionService.getTransactions()
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
        elt.userFirstName,
        elt.userLastName,
        elt.driverFirstName,
        elt.driverLastName,
        moment(elt.createdOn).format("L"),
        elt.userPrice,
        elt.driverPrice,
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
                <h2>Delivery Transaction</h2>
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
                    inComingName={"Delivery Transaction"}
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

export default DeliveryTransaction
