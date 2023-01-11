import React from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import Swal from "sweetalert2"
import DriverVehiclesService from "../../services/DriverVehiclesService"
import { useEffect, useState } from "react"
function ViewVehicleDetails() {
  const vehiclesService = new DriverVehiclesService()
  const [drvierCount, setDrvierCount] = useState(0)
  const { driverId } = useParams()
  const [vehicleData, setVehicleData] = useState([])
  useEffect(() => {
    if (drvierCount === 0) {
      getVehicles()
      setDrvierCount(1)
    }
  }, [vehicleData])
  const getVehicles = async () => {
    try {
      const response = await vehiclesService.getDriverVehicles(driverId)
      if (response.data.code === 1) {
        setVehicleData(response.data.data)
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something Went Wrong",
        showConfirmButton: true,
        timer: 5000,
      })
    }
  }
  return (
    <div>
      <div className="row mb-12">
        <div className="col-lg-12 col-md-12 mb-4">
          {vehicleData.map((item) => {
            return (
              <>
                <div className="card" style={{ marginBottom: "20px" }}>
                  <div className="card-body_view">
                    <div className="formwithimageview">
                      <div className="formwithimageview__column">
                        <div className="imgupload">
                          <img id="output" src={item.picture ? item.picture : "./img/truck_img.png"} alt="" />
                        </div>
                      </div>
                      <div className="formwithimageview__column" style={{ paddingTop: "30px" }}>
                        <div className="row">
                          <div className="form-group col-md-4 select_forms">
                            <label>Driver Type</label>
                            <p className="form_text">{item.vehicleTypeTitle}</p>
                          </div>
                          <div className="form-group col-md-4 select_forms">
                            <label>Model</label>
                            <p className="form_text">{item.model}</p>
                          </div>
                          <div className="form-group col-md-4 select_forms">
                            <label>Year </label>
                            <p className="form_text">{item.year}</p>
                          </div>
                          <div className="form-group col-md-4 select_forms">
                            <label>Color</label>
                            <p className="form_text">{item.color}</p>
                          </div>
                          {/* <div className="form-group col-md-3 select_forms">
                            <label>License Plate</label>
                            <p className="form_text">Company</p>
                          </div>
                          <div className="form-group col-md-3 select_forms">
                            <label>Total Delivery</label>
                            <p className="form_text">Company</p>
                          </div>
                          <div className="form-group col-md-3 select_forms">
                            <label>Base price</label>
                            <p className="form_text">Company</p>
                          </div>
                          <div className="form-group col-md-3 select_forms">
                            <label>Color</label>
                            <p className="form_text">Company</p>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ViewVehicleDetails
