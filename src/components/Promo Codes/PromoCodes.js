import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import UsersService from "../../services/UsersService"
import deleteItem from "../../shared/DeleteItem"
import Datatable from "../Common/Datatable"
import DataTableHeader from "../Common/DataTableHeader"
import ViewHeader from "../Common/ViewHeaderAdd"
import { columnNames, pdfHeaders } from "../../TableColumns/PromoData"
import Swal from "sweetalert2"
import PromoCodesService from "../../services/PromoCodesService"
import moment from "moment"
function PromoCodes() {
  const promoCodesService = new PromoCodesService()
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
    },

    {
      name: "Promo code",
      selector: "code",
      sortable: true,
    },

    {
      name: "Add Discount",
      selector: "discountPercentage",
      sortable: true,
    },
    {
      name: "Max Discount",
      selector: "maxDiscount",
      sortable: true,
    },
    {
      name: "Valid Till",
      cell: (row) => moment(row.expiryDate).format("L"),

      sortable: true,
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <div className="action-icons">
          <Link to="" className="TableEdit">
            <img className="tableactions_image" src="./img/icon_send_complete.svg" alt="table-action" />
          </Link>
          <button
            type="button"
            data-toggle="modal"
            class="tableactions_action"
            onClick={() => deleteItem(row["promoCodeId"], data, promoCodesService, row["code"], setLoader, "PromoCode")}
          >
            <img alt="table-action" class="tableactions_image" src="./img/icon_delete_complete.svg" />
          </button>
        </div>
      ),
    },
  ]

  const filterPdfData = (data) => {
    const filteredData = data.map((elt) => {
      return [elt.code, elt.discountPercentage, elt.maxDiscount, moment(elt.expiryDate).format("L")]
    })
    setFilteredPdfData(filteredData)
  }

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
      const response = await promoCodesService.get()
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
                <h2>Generate Promo Codes</h2>
                <Link style={{ paddingTop: "10px" }} to="/AddPromoCode">
                  <button className="btn btn-primary header_add_btn">Add</button>
                </Link>
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
                    inComingName={"Promo Codes"}
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

export default PromoCodes
