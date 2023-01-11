import downloadCSV from "../../shared/CSV"
import { ExportPDF } from "../../shared/ExportPDF"
import UsersService from "../../services/UsersService"
import { useState } from "react"
import { Link } from "react-router-dom"
import OrderService from "../../services/OrderService"
import { OrderCategoryTypes } from "../../Contants/OrderCategoryTypes"

function ViewUserDataTable({ incomingFilteredData, incomingData, inComingName, columnNames, pdfHeaders, userId }) {
  //State
  const [data, setData] = useState([])
  const [loader, setLoader] = useState(true)
  // SERVICES
  const userService = new UsersService()
  const orderService = new OrderService()
  const [orders, setOrders] = useState([])
  //Functions
  const search = async (date, BusinessId) => {
    setLoader(true)
    const response = await userService.get(date, BusinessId)
    setData(response.data.Data)
    setLoader(false)
  }

  return (
    <>
      <div className="datatableheading">Export to:</div>
      <div>
        <div className="export-to-btns">
          <button className="btn btn-primary" onClick={(e) => ExportPDF(pdfHeaders, incomingFilteredData, inComingName)}>
            PDF
          </button>
          <button className="btn btn-primary" onClick={(e) => downloadCSV(incomingData, columnNames, inComingName)}>
            CSV
          </button>
         
        </div>

        {/* <input
          className="tablesearchbox userTableSearch"
          type="text"
          placeholder="Search"
          aria-label="Search Input"
          onChange={(e) => search(e.target.value)}
        /> */}
      </div>
    </>
  )
}

export default ViewUserDataTable
