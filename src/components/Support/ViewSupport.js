import React from "react"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import SupportService from "../../services/SupportService"
import moment from "moment"

function ViewSupport() {
  const { supportQueryId } = useParams()
  const supportService = new SupportService()
  const [data, setData] = useState({
    userFirstName: "",
    userLastName: "",
    DriverFirstName: "",
    DriverLastName: "",
    orderFromAddresss: "",
    orderToAddress: "",
    queryStatusId: 1,
    queryStatusTitle: "",
    createdOn: "",
    supportQueryId: 0,
    orderId: 0,
    userId: "",
    description: "",
  })

  const [dataCount, setDataCount] = useState(0)
  const [loader, setLoader] = useState(true)
  //UseEffect
  useEffect(() => {
    if (dataCount === 0) {
      getSupport()
      setDataCount(1)
    }
  }, [data]) // eslint-disable-line react-hooks/exhaustive-deps

  //Functions
  const getSupport = async () => {
    try {
      const response = await supportService.getById(supportQueryId)
      debugger
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
              <div className="topheader">
                <Link className="btnscontainer__btn" to="/Support">
                  <h2 className="topheader__title">
                    <img src="./img/icon_back.svg" alt="" />
                    View Support
                  </h2>
                </Link>
              </div>
            </div>
          </div>
          <div className="row mb-12">
            <div className="col-lg-12 col-md-12 mb-4">
              <div className="card">
                <div className="card-body view_card_body">
                  <div className="formwithimageview">
                    <div className="formwithimageview__column">
                      <div className="imgupload" style={{ paddingBottom: "12px" }}>
                        <img id="output" src="./img/Profile_img.png" alt="" />
                      </div>
                      <div className="form-group col-md-4">
                        <label>time</label>
                        <p className="form-edit">2:50</p>
                      </div>
                    </div>

                    <div className="row">
                      <div className="form-group col-md-4 select_forms">
                        <label>User Name</label>
                        <p className="form-edit">{data.userFirstName + " " + data.userLastName}</p>
                      </div>
                      <div className="form-group col-md-4 select_forms">
                        <label>Driver Name</label>
                        <p className="form-edit">{data.DriverFirstName + " " + data.DriverLastName}</p>
                      </div>
                      <div className="form-group col-md-4 select_forms">
                        <label>Phone number</label>
                        <p className="form-edit">0326959989</p>
                      </div>
                      <div className="form-group col-md-4 select_forms">
                        <label>Password</label>
                        <p className="form-edit">******</p>
                      </div>
                      <div className="form-group col-md-4 select_forms">
                        <label>From</label>
                        <p className="form-edit">{data.orderFromAddresss}</p>
                        <p className="validate-error" id="error-password"></p>
                      </div>
                      <div className="form-group col-md-4 select_forms">
                        <label>to</label>
                        <p className="form-edit">{data.orderToAddress}</p>
                      </div>
                      <div className="form-group col-md-4 select_forms">
                        <label>Trucking duration</label>
                        <p className="form-edit">{"10 Hours"}</p>
                      </div>
                      <div className="form-group col-md-4 select_forms">
                        <label>Date</label>
                        <p className="form-edit">{moment(data.createdOn).format("L")}</p>
                      </div>
                      <div className="form-group col-md-4 select_forms">
                        <label>Base Fare</label>
                        <p className="form-edit">1,200.00</p>
                      </div>

                      <div className="form-group col-md-4  ">
                        <label>Distance</label>
                        <p className="form-edit">100Km</p>
                      </div>
                      <div className="form-group col-md-4 ">
                        <label>Service Type</label>
                        <p className="form-edit">Delivery</p>
                      </div>
                      <div className="form-group col-md-4 ">
                        <label>Pending</label>
                        <p className="form-edit">{data.queryStatusTitle}</p>
                      </div>
                    </div>
                    <div className="row"></div>
                  </div>
                  <div className="col-md-12">
                    <div className="row">
                      <div className="form-group col-md-12 select_forms">
                        <label>Note</label>
                        <input type="text" className="form-edit" value="Lorem ipsum" />
                      </div>
                      <div className="form-group col-md-12 select_forms">
                        <label>Description</label>
                        <p className="form-edit">{data.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ViewSupport
